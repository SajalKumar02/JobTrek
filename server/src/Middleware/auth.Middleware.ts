import { asyncHandler } from '../Utils/asyncHandler.Util';
import { verifyAccessToken } from '../Utils/token.Util';
import { NextFunction } from 'express';
import { AuthMiddlewareRequest } from '../Types';

export const authMiddleware = asyncHandler(
  (req: AuthMiddlewareRequest, res, next: NextFunction) => {
    const authHeader = req.headers['authorization'];
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({
        success: false,
        message: 'No token provided',
      });
    }

    const token = authHeader.split(' ')[1];
    const decoded = verifyAccessToken(token);

    if (!decoded) {
      return res.status(401).json({
        success: false,
        message: 'Unauthorized',
      });
    }

    req.user = { userId: decoded.id };

    next();
  }
);
