import { asyncHander } from '../Utils/asyncHandler';
import { ApiError } from '../Utils/ApiError.Util';
import { verifyAccessToken } from '../Utils/token.Util';

export const authMiddleware = asyncHander((req, res, next) => {
  const { accessToken } = req.cookies;

  if (!accessToken) {
    throw new ApiError('ACCESS TOKEN NOT FOUND', 401);
  }

  const decoded = verifyAccessToken(accessToken);

  if (!decoded) {
    throw new ApiError('ACCESS TOKEN EXPIRED', 401);
  }

  req.user = { userId: decoded.id };

  next();
});
