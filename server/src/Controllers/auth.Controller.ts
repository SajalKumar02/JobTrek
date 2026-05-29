import { authService } from '../Services/auth.Services';
import { asyncHander } from '../Utils/asyncHandler';
import { AppError } from '../Utils/error.Util';

import { mountTokenToResponse } from '../Utils/token.Util';

export const registerOrLogin = asyncHander(async (req, res) => {
  const { email, password } = req.body;

  const result = await authService.registerOrLoginUser(email, password);

  mountTokenToResponse(res, result.accessToken);

  res.status(result.isNewUser ? 201 : 200).json({
    success: true,
    message: result.isNewUser ? "User Registered" : "User Logged In"
  });
})

export const changePassword = asyncHander(async (req, res) => {
  const { userId } = req.user;
  const { oldPassword, newPassword } = req.body;

  await authService.changeUserPassword(userId, oldPassword, newPassword);

  res.status(200).json({
    success: true,
    message: "USER PASSWORD CHANGED"
  });
})

export const logout = asyncHander(async (req, res) => {
  res.clearCookie('accessToken');
  res.json({ success: true, message: 'Logged out' });
})
