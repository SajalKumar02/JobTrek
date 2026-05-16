import { Request, Response, NextFunction } from 'express';
import { verifyAccessToken } from '../Utils/token.Util';
import { Types } from 'mongoose';

interface AuthRequest extends Request {
  user?: {
    userId: Types.ObjectId;
  };
}

export const authMiddleware = (req: AuthRequest, res: Response, next: NextFunction) => {
  const { accessToken } = req.cookies;

  if (!accessToken) {
    return res.send({
      message: 'ACCESS TOKEN EXPIRED',
      success: false,
    });
  }

  const decoded = verifyAccessToken(accessToken);

  if (!decoded) {
    return res.send({
      message: "ACCESS TOKEN EXPIRED",
      success: false
    })
  }

  req.user = { userId: decoded.id };

  next();
};
