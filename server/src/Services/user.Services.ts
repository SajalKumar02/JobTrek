import { Types } from 'mongoose';

import UserModel, { UserDocument } from '../Model/user.Model';

import { IUser } from '../Types';

export const userService = {
  getUserByID: async (userId: Types.ObjectId): Promise<UserDocument | null> => {
    const user: UserDocument | null = await UserModel.findById(userId);

    return user;
  },

  editUserViaId: async (userId: Types.ObjectId, updates: Partial<IUser>): Promise<UserDocument | null> => {
    const user: UserDocument | null = await UserModel.findByIdAndUpdate(userId, updates, { returnDocument: 'after' });

    return user;
  },
};
