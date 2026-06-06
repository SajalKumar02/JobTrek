import { Types } from 'mongoose';

import UserModel from '../Model/user.Model';

import { IUser, UserDocument } from '../Types';

export const userService = {
  getUserByID: async (userId: Types.ObjectId) => {
    const user = (await UserModel.findById(userId)) as UserDocument | null;

    return user;
  },

  editUserViaId: async (userId: Types.ObjectId, updates: Pick<IUser, 'username'>) => {
    const user = (await UserModel.findOneAndUpdate({ _id: userId }, updates, { returnDocument: 'after' })) as UserDocument | null;

    return user;
  },
};
