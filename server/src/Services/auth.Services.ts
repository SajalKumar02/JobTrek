import bcrypt from 'bcryptjs';

import UserModel, { IUser } from '../Model/user.Model';
import TokenModel, { IToken } from '../Model/token.Model';

import { ApiError } from '../Utils/api-error';
import { NODE_ENV } from '../Config/utils';

import { passwordHash } from '../Utils/password.Util';
import { generateUsernameFromEmail } from '../Utils/username.Util';
import {
  generateAccessToken,
  generateRefreshToken,
  verifyAccessToken,
  verifyRefreshToken,
} from '../Utils/token.Util';

import { Request, Response } from 'express';

interface UserResult {
  accessToken: string;
  refreshToken: string;
  user: IUser;
}

interface TokenPayload {
  email: string;
}

interface UserRequest extends Request {
  user?: {
    email: string;
  };
}

export const authService = {
  registerOrLoginUser: async (email: string, password: string): Promise<UserResult> => {
    if (!email || !password) {
      throw new ApiError({
        status: 400,
        message: 'Email and password are required',
      });
    }

    // Check if user already exists
    let user: IUser | null = await UserModel.findOne({ email });

    if (user) {
      // LOGIN
      const isPasswordValid: boolean = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        throw new ApiError({
          status: 401,
          message: 'Invalid email or password',
        });
      }
      // Remove previous refresh tokens
      await TokenModel.deleteMany({ userId: user._id });
      ``;
    } else {
      // REGISTER
      const hashPassword: string = await passwordHash(password);
      const newUsername: string = await generateUsernameFromEmail(email);
      user = await UserModel.create({
        email,
        password: hashPassword,
        username: newUsername,
      });
    }

    // Generate tokens
    const accessToken = generateAccessToken(user._id);
    const refreshToken = generateRefreshToken(user._id);

    // Store new refresh token
    await TokenModel.create({
      userId: user._id,
      refreshToken,
      expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    });

    return { accessToken, refreshToken, user };
  },

  // refreshTokenForUser:
  // Access token is expired, so now we will check shared refresh token in DB
  // If found, then accessToken will be shared, else re-login
  refreshTokenForUser: async (refreshToken: string) => {
    // Validate refreshToken
    let decoded: TokenPayload;
    try {
      decoded = verifyRefreshToken(refreshToken);
    } catch (error) {
      throw new ApiError({ status: 400, message: 'Invalid or RefreshTokenExpired' });
    }

    // Verify Refresh Token in DB
    const TokenDoc: IToken = await TokenModel.findOne({
      refreshToken,
      expiresAt: { $gt: new Date() },
    });

    if (!TokenDoc) {
      throw new ApiError({ status: 400, message: 'Refresh Token Expired' });
    }

    const user: IUser = await UserModel.findOne({
      email: decoded.email,
    });

    if (!user) {
      throw new ApiError({ status: 400, message: 'User Not Found' });
    }

    // Generate Access Token
    const accessToken = generateAccessToken(user.email);

    return { accessToken, refreshToken, user };
  },

  // logoutUser: accepts (req, res) and performs idempotent logout
  // - clears auth cookies
  // - revokes refresh token in DB if provided
  logoutUser: async (req: UserRequest) => {
    const email = req.user;

    const user: IUser = await UserModel.findOne(email);

    await TokenModel.deleteMany({ userId: user._id });
  },

  // accepting no parameter
  // passing nothing
  deleteAll: async () => {
    if (NODE_ENV === 'Development') {
      await UserModel.deleteMany({});
      await TokenModel.deleteMany({});
      return;
    } else {
      throw new ApiError({ status: 403, message: 'Only For Development Usage' });
    }
  },
};
