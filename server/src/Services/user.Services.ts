import mongoose, { Types } from 'mongoose';

import UserModel, { IUser } from '../Model/user.Model';

interface CustomRequest extends mongoose.Document {
  email: string;
  username: string;
}

export const userService = {
  getUserByID: async (userId: Types.ObjectId) => {
    let user: IUser | null = await UserModel.findById(userId);

    return user;
  },

  editUserViaId: async (userId: Types.ObjectId, reqBody: CustomRequest) => {

  },

  changeUserPassword: async () => { },

  deleteUserAccount: async () => { },
};
