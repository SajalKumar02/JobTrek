import { comparePassword, passwordHash } from '../Utils/password.Util';
import {
  generateAccessToken,
  generateRefreshToken,
  verifyRefreshToken,
} from '../Utils/token.Util';

import UserModel from '../Model/user.Model';

import { ApiError } from '../Utils/ApiError.Util';
import {
  AuthenticatedRequest,
  RequestWithRefreshToken,
  UserDocument,
} from '../Types';

export const authService = {
  authUser: async (
    email: string,
    password: string
  ): Promise<{
    accessToken: string;
    refreshToken: string;
    isNewUser: boolean;
    user: UserDocument;
  }> => {
    if (!email || !password) {
      throw new ApiError('Email and Password are required', 400);
    }

    let isNewUser: boolean;
    let user: UserDocument | null = await UserModel.findOne({ email }).select(
      '+password'
    );

    if (user) {
      const hashedPassword = user.password;
      const comparingPassword = password;
      isNewUser = false;

      const isPasswordValid = await comparePassword(
        hashedPassword,
        comparingPassword
      );

      if (!isPasswordValid) {
        throw new ApiError('Incorrect password', 401);
      }
    } else {
      const hashPassword = await passwordHash(password);
      const newUsername = email.split('@')[0];

      isNewUser = true;

      user = await UserModel.create({
        email,
        password: hashPassword,
        username: newUsername,
      });
    }

    if (!user) {
      throw new ApiError('User creation or retrieval failed', 500);
    }

    const accessToken = generateAccessToken(user._id);
    const refreshToken = generateRefreshToken(user._id);

    return {
      accessToken,
      refreshToken,
      isNewUser,
      user,
    };
  },

  issueNewAuthTokens: async (req: RequestWithRefreshToken) => {
    const refreshToken = req.cookies.refreshToken;

    if (!refreshToken) {
      throw new ApiError('No refresh token provided', 401);
    }

    // Verify the refresh token
    const decoded = verifyRefreshToken(refreshToken);

    if (!decoded) {
      throw new ApiError('Unauthorized', 401);
    }

    // Generate new access token and refresh token
    const newAccessToken = generateAccessToken(decoded.id);
    const newRefreshToken = generateRefreshToken(decoded.id);

    return {
      newAccessToken,
      newRefreshToken,
    };
  },

  getCurrentUser: async (req: AuthenticatedRequest) => {
    const { userId } = req.user;

    if (!userId) {
      throw new ApiError('Unauthorized', 401);
    }

    // Find the user and exclude sensitive info
    const user: UserDocument | null =
      await UserModel.findById(userId).select('-password');

    if (!user) {
      throw new ApiError('User not found', 404);
    }

    const accessToken = generateAccessToken(user._id);

    return {
      user,
      accessToken,
    };
  },
};
