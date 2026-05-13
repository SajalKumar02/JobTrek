import { Request, Response } from 'express';

import { authService } from '../Services/auth.Services';

import { mountTokenToResponse } from '../Utils/token.Util';
import { Types } from 'mongoose';

export const registerOrLogin = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const result = await authService.registerOrLoginUser(email, password);

    mountTokenToResponse(res, result.accessToken, result.refreshToken);

    res.status(200).json({
      success: true,
      user: result.user,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: (error as Error).message || 'Internal server error' });
  }
};

interface AuthRequest extends Request {
  user?: {
    userId: Types.ObjectId;
  };
}

export const changePassword = async (req: AuthRequest, res: Response) => {
  try {
    const { userId } = req.user;
    const { oldPassword, newPassword } = req.body;

    const result = await authService.changeUserPassword(userId, oldPassword, newPassword);

    res.status(200).json({
      success: true,
      user: result.user,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: (error as Error).message || 'Internal server error' });
  }
};

export const refreshAccessToken = async (req: Request, res: Response) => {
  try {
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
  } catch (error) {
    res.status(500).json({ success: false, message: (error as Error).message || 'Internal server error' });
  }
};

export const logout = async (req: Request, res: Response) => {
  try {
    await authService.logoutUser(req);
    res.clearCookie('accessToken');
    res.clearCookie('refreshToken');
    res.json({ success: true, message: 'Logged out' });
  } catch (error) {
    res.status(500).json({ success: false, message: (error as Error).message || 'Internal server error' });
  }
};

// Developer Mode
export const deleteAllData = async (req: Request, res: Response) => {
  try {
    await authService.deleteAll();

    res.status(200).json({
      success: true,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: (error as Error).message || 'Internal server error' });
  }
};
