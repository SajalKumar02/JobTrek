import { Request, Response } from 'express';

import { authService } from '../Services/auth.Services';

import { mountTokenToResponse } from '../Utils/token.Util';
import { asyncHandler } from '../Utils/async-handler';

export const registerOrLogin = asyncHandler(async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const result = await authService.registerOrLoginUser(email, password);

  mountTokenToResponse(res, result.accessToken, result.refreshToken);

  res.status(200).json({
    success: true,
    user: result.user,
  });
});

export const refreshAccessToken = asyncHandler(async (req: Request, res: Response) => {
  const { refreshToken } = req.cookies;

  if (!refreshToken) {
    return res.status(401).send({
      message: 'Refresh token not found',
      success: false,
    });
  }

  const result = await authService.refreshTokenForUser(refreshToken);

  mountTokenToResponse(res, result.accessToken, refreshToken);

  res.status(200).json({
    success: true,
    data: { user: result.user },
  });
});

export const logout = asyncHandler(async (req: Request, res: Response) => {
  await authService.logoutUser(req);
  res.clearCookie('accessToken');
  res.clearCookie('refreshToken');
  res.json({ success: true, message: 'Logged out' });
});

// Developer Mode
export const deleteAllData = asyncHandler(async (req: Request, res: Response) => {
  await authService.deleteAll();

  res.status(200).json({
    success: true,
  });
});
