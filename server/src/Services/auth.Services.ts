import { Types } from 'mongoose';

import { comparePassword, passwordHash } from '../Utils/password.Util';
import { generateUsernameFromEmail } from '../Utils/username.Util';
import {
  generateAccessToken,
} from '../Utils/token.Util';

import UserModel from '../Model/user.Model';

import { AppError } from '../Utils/error.Util';

export const authService = {
  registerOrLoginUser: async (email, password) => {
    if (!email || !password) {
      throw new AppError('Email and Password are required', 400);
    }

    let isNewUser;
    let user = await UserModel.findOne({ email }).select('+password');

    if (user) {
      const hashedPassword = user.password;
      const comparingPassword = password;
      isNewUser = false;

      const isPasswordValid = await comparePassword(hashedPassword, comparingPassword);

      if (!isPasswordValid) {
        throw new AppError('Invalid email or password', 401);
      }

    } else {
      const hashPassword = await passwordHash(password);
      const newUsername = generateUsernameFromEmail(email);
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
      isNewUser
    };
  },
  changeUserPassword: async (userId, oldPassword, newPassword) => {
    let user = await UserModel.findById(userId).select('+password');
    if (!user) {
      throw new AppError("User not found", 404)
    }
    if (!await comparePassword(user.password, oldPassword)) {
      throw new AppError("Incorrect old Password", 401);
    }

    const newHashPassword = await passwordHash(newPassword);

    user.password = newHashPassword;
    await user.save();

    return { user };
  },
};
