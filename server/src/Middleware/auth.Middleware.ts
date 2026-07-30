import { asyncHandler } from '../Utils/asyncHandler.Util';
import { ApiError } from '../Utils/ApiError.Util';
import { verifyAccessToken } from '../Utils/token.Util';
import { NextFunction } from 'express';
import { AuthMiddlewareRequest } from '../Types';

export const authMiddleware = asyncHandler(
  (req: AuthMiddlewareRequest, res, next: NextFunction) => {
    const authHeader = req.headers['authorization'];
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new ApiError('No token provided', 401);
    }

    const token = authHeader.split(' ')[1];
    const decoded = verifyAccessToken(token);

    if (!decoded) {
      throw new ApiError('Unauthorized', 401);
    }

    req.user = { userId: decoded.id };

    next();
  }
);
