import { Types } from 'mongoose';
import { authService } from '../Services/auth.Services';
import { asyncHandler } from '../Utils/asyncHandler';

import { mountTokenToResponse } from '../Utils/token.Util';
import { AccessTokenRequest, BaseResponse, LoginRequest, UserUpdateRequest } from '../Types';

export const registerOrLogin = asyncHandler(async (req: LoginRequest, res: BaseResponse) => {
  const { email, password } = req.body;

  const result = await authService.registerOrLoginUser(email, password);

  mountTokenToResponse(res, result.accessToken);

  res.status(result.isNewUser ? 201 : 200).json({
    success: true,
    message: result.isNewUser ? 'User Registered' : 'User Logged In',
  });
});

export const changePassword = asyncHandler(async (req: UserUpdateRequest, res: BaseResponse) => {
  const userId = new Types.ObjectId(req.user.userId);
  const { oldPassword, newPassword } = req.body;

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
