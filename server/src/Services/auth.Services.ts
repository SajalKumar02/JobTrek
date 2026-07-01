import { Types } from 'mongoose';

import { comparePassword, passwordHash } from '../Utils/password.Util';
import { generateUsernameForUser } from '../Utils/username.Util';
import { generateAccessToken } from '../Utils/token.Util';

import UserModel from '../Model/user.Model';

import { ApiError } from '../Utils/ApiError.Util';

export const authService = {
  registerOrLoginUser: async (email: string, password: string) => {
    if (!email || !password) {
      throw new ApiError('Email and Password are required', 400);
    }

    let isNewUser: boolean;
    let user = await UserModel.findOne({ email }).select('+password');

    if (user) {
      const hashedPassword = user.password;
      const comparingPassword = password;
      isNewUser = false;

      const isPasswordValid = await comparePassword(hashedPassword, comparingPassword);

      if (!isPasswordValid) {
        throw new ApiError('Incorrect password', 401);
      }
    } else {
      const hashPassword = await passwordHash(password);
      const newUsername = generateUsernameForUser();
      isNewUser = true;

      user = await UserModel.create({
        email,
        password: hashPassword,
        username: newUsername,
      });
    }

    const accessToken = generateAccessToken(user._id);

    return {
      accessToken,
      isNewUser,
      user,
    };
  },

  changeUserPassword: async (userId: Types.ObjectId, oldPassword: string, newPassword: string) => {
    let user = await UserModel.findById(userId).select('+password');
    if (!user) {
      throw new ApiError('User not found', 404);
    }
    if (!(await comparePassword(user.password, oldPassword))) {
      throw new ApiError('Incorrect old Password', 401);
    }

    const newHashPassword = await passwordHash(newPassword);

    user.password = newHashPassword;
    await user.save();

    return { user };
  },
};
