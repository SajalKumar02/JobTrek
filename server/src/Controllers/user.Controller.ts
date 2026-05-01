import { Request, Response } from 'express';
import { asyncHandler } from '../Utils/async-handler';

import { userService } from '../Services/user.Services';
import { Types } from 'mongoose';

interface AuthRequest extends Request {
  user?: {
    userId: Types.ObjectId;
  };
}

export const getUser = asyncHandler(async (req: AuthRequest, res: Response) => {
  const { userId } = req.user;

  const result = await userService.getUserByID(userId);

  res.status(200).json({
    success: true,
    user: result,
  });
});

export const editUser = asyncHandler(async (req: AuthRequest, res: Response) => {
  const { userId } = req.user;
  const reqBody = req.body;

  const result = await userService.editUserViaId(userId, reqBody);

  res.status(200).json({
    success: true,
    user: result
  })
});

