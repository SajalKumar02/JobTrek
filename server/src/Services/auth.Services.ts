import { Types } from 'mongoose';

import { comparePassword, passwordHash } from '../Utils/password.Util';
import { generateUsernameFromEmail } from '../Utils/username.Util';
import {
  generateAccessToken,
  generateRefreshToken,
  verifyRefreshToken,
} from '../Utils/token.Util';

import UserModel, { UserDocument } from '../Model/user.Model';
import TokenModel, { TokenDocument } from '../Model/token.Model';

import { DecodedToken } from '../Types';

import { AppError } from '../Utils/error.Util';

export const authService = {
  registerOrLoginUser: async (email: string, password: string) => {
    if (!email || !password) {
      throw new AppError('Email and Password are required', 400);
    }

    let isNewUser: boolean;
    let user: UserDocument | null = await UserModel.findOne({ email }).select('+password');

    if (user) {
      const hashedPassword = user.password;
      const comparingPassword = password;
      isNewUser = false;

      const isPasswordValid: boolean = await comparePassword(hashedPassword, comparingPassword);

      if (!isPasswordValid) {
        throw new AppError('Invalid email or password', 401);
      }
      await TokenModel.deleteMany({ userId: user._id });

    } else {
      const hashPassword: string = await passwordHash(password);
      const newUsername: string = generateUsernameFromEmail(email);
      isNewUser = true;

      user = await UserModel.create({
        email,
        password: hashPassword,
        username: newUsername,
      });
    }

    const accessToken = generateAccessToken(user._id);
    const refreshToken = generateRefreshToken(user._id);

    await TokenModel.create({
      userId: user._id,
      refreshToken,
      expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    });

    return { accessToken, refreshToken, isNewUser };
  },
  changeUserPassword: async (userId: Types.ObjectId, oldPassword: string, newPassword: string) => {
    let user: UserDocument | null = await UserModel.findById(userId).select('+password');
    if (!await comparePassword(user.password, oldPassword)) {
      throw new AppError("Incorrect old Password", 401);
    }

    const newHashPassword = await passwordHash(newPassword);

    user.password = newHashPassword;
    await user.save();

    return { user };
  },
  refreshTokenForUser: async (refreshToken: string): Promise<{ accessToken: string, refreshToken: string, user: UserDocument }> => {
    const decoded: DecodedToken = verifyRefreshToken(refreshToken);
    if (!decoded) {
      throw new AppError('Refresh token expired', 401);
    }

    const TokenDoc: TokenDocument | null = await TokenModel.findOne({
      refreshToken,
      expiresAt: { $gt: new Date() },
    });

    if (!TokenDoc) {
      throw new AppError("Refresh Token Expired", 400);
    }

    const user: UserDocument | null = await UserModel.findById(decoded.id);

    if (!user) {
      throw new AppError("User Not Found", 400);
    }

    // Generate Access Token
    const accessToken = generateAccessToken(user._id);

    return { accessToken, refreshToken, user };
  },
  logoutUser: async (userId: Types.ObjectId) => {
    const user: UserDocument | null = await UserModel.findById(userId);
    await TokenModel.deleteMany({ userId: user._id });
  },
};
