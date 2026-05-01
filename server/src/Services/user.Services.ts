import { Types } from 'mongoose';

import UserModel, { IUser } from '../Model/user.Model';

export const userService = {
  getUserByID: async (userId: Types.ObjectId) => {
    let user: IUser | null = await UserModel.findById(userId);

    return user;
  },
};
