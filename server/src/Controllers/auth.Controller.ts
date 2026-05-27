import { authService } from '../Services/auth.Services';

import { mountTokenToResponse } from '../Utils/token.Util';

import { AuthRequest } from '../Types/index';
import { Response } from 'express';

export const registerOrLogin = async (req: AuthRequest, res: Response) => {
  try {
    const { email, password } = req.body;

    const result = await authService.registerOrLoginUser(email, password);

    mountTokenToResponse(res, result.accessToken, result.refreshToken);

    res.status(result.isNewUser ? 201 : 200).json({
      success: true,
      message: result.isNewUser ? "User Registered" : "User Logged In"
    });
  } catch (error) {
    res.status(500).json({ success: false, message: (error as Error).message || 'Internal server error' });
  }
};

export const changePassword = async (req: AuthRequest, res: Response) => {
  try {
    const { userId } = req.user;
    const { oldPassword, newPassword } = req.body;

    const result = await authService.changeUserPassword(userId, oldPassword, newPassword);

    res.status(200).json({
      success: true,
      message: "User Password Changed"
    });
  } catch (error) {
    res.status(500).json({ success: false, message: (error as Error).message || 'Internal server error' });
  }
};

export const refreshAccessToken = async (req: AuthRequest, res: Response) => {
  try {
    const { refreshToken } = req.cookies;

    if (!refreshToken) {
      return res.status(401).send({
        success: false,
        message: 'REFRESH TOKEN EXPIRED',
      });
    }

    const result = await authService.refreshTokenForUser(refreshToken);

    mountTokenToResponse(res, result.accessToken, refreshToken);

    res.status(200).json({
      success: true,
      message: "Access token refreshed"
    });
  } catch (error) {
    res.status(500).json({ success: false, message: (error as Error).message || 'Internal server error' });
  }
};

export const logout = async (req: AuthRequest, res: Response) => {
  try {
    await authService.logoutUser(req.user.userId);
    res.clearCookie('accessToken');
    res.clearCookie('refreshToken');
    res.json({ success: true, message: 'Logged out' });
  } catch (error) {
    res.status(500).json({ success: false, message: (error as Error).message || 'Internal server error' });
  }
};
