import { asyncHandler } from '../Utils/asyncHandler';
import { ApiError } from '../Utils/ApiError.Util';
import { verifyAccessToken } from '../Utils/token.Util';
import { AuthenticatedRequest } from '../Types';
import { NextFunction } from 'express';

export const authMiddleware = asyncHandler(
  (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    const accessToken = req.cookies.accessToken as string;

    if (!accessToken) {
      throw new ApiError('ACCESS TOKEN NOT FOUND', 401);
    }

    const decoded = verifyAccessToken(accessToken);

    if (!decoded) {
      throw new ApiError('ACCESS TOKEN EXPIRED', 401);
    }

    req.user = { userId: decoded.id };

    next();
  }
);
