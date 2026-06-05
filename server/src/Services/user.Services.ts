import { Types } from 'mongoose';

import UserModel from '../Model/user.Model';

import { IUser, UserDocument } from '../Types';

export const userService = {
  getUserByID: async (userId: Types.ObjectId) => {
    const user: UserDocument = await UserModel.findById(userId);

    return user;
  },

  editUserViaId: async (userId: Types.ObjectId, updates: Pick<IUser, 'username'>) => {
    const user: UserDocument = await UserModel.findOneAndUpdate({ _id: userId }, updates, { returnDocument: 'after' });

    return user;
  },
};
