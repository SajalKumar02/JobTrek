import UserModel, { IUser } from '../Model/user.Model';
import TokenModel, { IToken } from '../Model/token.Model';

import { ApiError } from '../Utils/api-error';
import { NODE_ENV } from '../Config/utils';

import { comparePassword, passwordHash } from '../Utils/password.Util';
import { generateUsernameFromEmail } from '../Utils/username.Util';
import {
  generateAccessToken,
  generateRefreshToken,
  verifyRefreshToken,
} from '../Utils/token.Util';

import { Request } from 'express';
import { Types } from 'mongoose';
import JobModel from '../Model/job.Model';

interface UserResult {
  accessToken: string;
  refreshToken: string;
  user: IUser;
}

interface TokenPayload {
  id: Types.ObjectId;
}

interface UserRequest extends Request {
  user?: {
    userId: Types.ObjectId;
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
    let user: IUser | null = await UserModel.findOne({ email }).select('+password');

    if (user) {
      // LOGIN
      const isPasswordValid: boolean = await comparePassword(user.password, password);
      if (!isPasswordValid) {
        throw new ApiError({
          status: 401,
          message: 'Invalid email or password',
        });
      }
      // Remove previous refresh tokens
      await TokenModel.deleteMany({ userId: user._id });

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

    user.password = undefined;

    return { accessToken, refreshToken, user };
  },

  // change Password
  changeUserPassword: async (userId: Types.ObjectId, oldPassword: string, newPassword: string) => {
    let user: IUser | null = await UserModel.findById(userId).select('+password');
    if (!await comparePassword(user.password, oldPassword)) {
      throw new ApiError({
        status: 401,
        message: "Incorrect old Password"
      });
    }

    const newHashPassword = await passwordHash(newPassword);

    user.password = newHashPassword;
    await user.save();

    return { user };
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

    const user: IUser = await UserModel.findById(decoded.id);

    if (!user) {
      throw new ApiError({ status: 400, message: 'User Not Found' });
    }

    // Generate Access Token
    const accessToken = generateAccessToken(user._id);

    return { accessToken, refreshToken, user };
  },

  // logoutUser: accepts (req, res) and performs idempotent logout
  // - clears auth cookies
  // - revokes refresh token in DB if provided
  logoutUser: async (req: UserRequest) => {
    const user: IUser = await UserModel.findById(req.user.userId);
    await TokenModel.deleteMany({ userId: user._id });
  },

  // accepting no parameter
  // passing nothing
  deleteAll: async () => {
    if (NODE_ENV === 'Development') {
      await UserModel.deleteMany({});
      await TokenModel.deleteMany({});
      await JobModel.deleteMany({})
      return;
    } else {
      throw new ApiError({ status: 403, message: 'Only For Development Usage' });
    }
  },
};
