import { Response } from 'express';

import { userService } from '../Services/user.Services';

import { ProtectedRequest } from '../Types';
import { UserDocument } from '../Model/user.Model';
import { AppError } from '../Utils/error.Util';

export const getUser = async (req: ProtectedRequest, res: Response) => {
  try {
    const { userId } = req.user;

    const user: UserDocument | null = await userService.getUserByID(userId);
    if (!user) throw new AppError("User Not Found", 404);

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

export const editUser = async (req: ProtectedRequest, res: Response) => {
  try {
    const { userId } = req.user;
    const updates = req.body;

    const user: UserDocument | null = await userService.editUserViaId(userId, updates);
    if (!user) throw new AppError("User Not Found", 404);

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
