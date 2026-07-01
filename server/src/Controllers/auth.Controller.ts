import { Types } from 'mongoose';
import { authService } from '../Services/auth.Services';
import { asyncHandler } from '../Utils/asyncHandler';

import { mountTokenToResponse } from '../Utils/token.Util';
import { AccessTokenRequest, BaseResponse, LoginRequest, UserUpdateRequest } from '../Types';
import { ChangePasswordValidator, RegisterOrLoginValidator } from '../Validators/auth.Validator';
import { ApiError } from '../Utils/ApiError.Util';

export const registerOrLogin = asyncHandler(async (req: LoginRequest, res: BaseResponse) => {
  const { email, password } = req.body;

  const validatorResult = RegisterOrLoginValidator.safeParse({ email, password });
  if (!validatorResult.success) {
    throw new ApiError(validatorResult.error.issues[0].message, 400);
  }

  const result = await authService.registerOrLoginUser(email, password);

  mountTokenToResponse(res, result.accessToken);

  res.status(result.isNewUser ? 201 : 200).json({
    success: true,
    message: result.isNewUser ? 'User Registered' : 'User Logged In',
    user: result.user,
  });
});

export const changePassword = asyncHandler(async (req: UserUpdateRequest, res: BaseResponse) => {
  const userId = new Types.ObjectId(req.user.userId);
  const { oldPassword, newPassword } = req.body;

  const validatorResult = ChangePasswordValidator.safeParse({ oldPassword, newPassword });
  if (!validatorResult.success) {
    throw new ApiError(validatorResult.error.issues[0].message, 400);
  }

  await authService.changeUserPassword(userId, oldPassword, newPassword);

  res.status(200).json({
    success: true,
    message: 'USER PASSWORD CHANGED',
  });
});

export const logout = asyncHandler(async (req: AccessTokenRequest, res: BaseResponse) => {
  res.clearCookie('accessToken');
  res.json({ success: true, message: 'Logged out' });
});
