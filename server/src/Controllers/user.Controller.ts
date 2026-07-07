import { Types } from 'mongoose';

import { userService } from '../Services/user.Services';

import { IUserUpdatePayload, UserDocument, UserRequest, UserResponse } from '../Types';

import { asyncHandler } from '../Utils/asyncHandler';
import { ApiError } from '../Utils/ApiError.Util';
import { UpdateUserEmailValidator } from '../Validators/user.Validator';

export const getUser = asyncHandler(async (req: UserRequest, res: UserResponse) => {
  const userId = new Types.ObjectId(req.user.userId);

  const user = await userService.getUserByID(userId);

  if (!user) {
    throw new ApiError('User Not Found', 404);
  }

  res.status(200).json({
    success: true,
    message: 'User Fetched Successfully',
    user,
  });
});

export const editUserUsername = asyncHandler(async (req: UserRequest, res: UserResponse) => {
  const userId = new Types.ObjectId(req.user.userId);

  const updates: IUserUpdatePayload = {
    username: req.body.username,
  };

  const validatorResult = UpdateUserEmailValidator.safeParse(updates);
  if (!validatorResult.success) {
    throw new ApiError(validatorResult.error.issues[0].message, 400);
  }

  const user: UserDocument | null = await userService.editUserViaId(userId, updates);

  if (!user) {
    throw new ApiError('User Not Found', 404);
  }

  res.status(200).json({
    success: true,
    message: 'Username Updated Successfully',
    user,
  });
});
