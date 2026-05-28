import { Response } from 'express';
import { Types } from 'mongoose';

import { UserDocument } from '../Model/user.Model';

import { userService } from '../Services/user.Services';

import { IUserUpdatePayload, ProtectedRequest } from '../Types';

export const getUser = async (req: ProtectedRequest, res: Response) => {
  try {
    const userId = new Types.ObjectId(req.user.userId);

    const user = await userService.getUserByID(userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User Not Found"
      })
    }

    res.status(200).json({
      success: true,
      user
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to get user",
      error: error?.message || error,
    });
  }
};

export const editUserUsername = async (req: ProtectedRequest, res: Response) => {
  try {
    const userId = new Types.ObjectId(req.user.userId);

    const updates: IUserUpdatePayload = {
      username: req.body.username
    };

    const user: UserDocument | null = await userService.editUserViaId(userId, updates);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User Not Found"
      })
    }

    res.status(200).json({
      success: true,
      user
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to edit user",
      error: error?.message || error,
    });
  }
};

export const editUserEmail = async (req: ProtectedRequest, res: Response) => { }