import { Request, Response } from 'express';

import { userService } from '../Services/user.Services';
import { Types } from 'mongoose';

interface AuthRequest extends Request {
  user?: {
    userId: Types.ObjectId;
  };
}

export const getUser = async (req: AuthRequest, res: Response) => {
  try {
    const { userId } = req.user;

    const result = await userService.getUserByID(userId);

    res.status(200).json({
      success: true,
      user: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to get user",
      error: error?.message || error,
    });
  }
};

export const editUser = async (req: AuthRequest, res: Response) => {
  try {
    const { userId } = req.user;
    const reqBody = req.body;

    const result = await userService.editUserViaId(userId, reqBody);

    res.status(200).json({
      success: true,
      user: result
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to edit user",
      error: error?.message || error,
    });
  }
};
