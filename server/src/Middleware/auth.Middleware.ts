import { asyncHander } from "../Utils/asyncHandler";
import { AppError } from "../Utils/error.Util";
import { verifyAccessToken } from "../Utils/token.Util";

export const authMiddleware = asyncHander((req, res, next) => {
  const { accessToken } = req.cookies;

  if (!accessToken) {
    throw new AppError("ACCESS TOKEN NOT FOUND", 401)
  }

  const decoded = verifyAccessToken(accessToken);

  if (!decoded) {
    throw new AppError("ACCESS TOKEN EXPIRED", 401);
  }

  req.user = { userId: decoded.id };

  next();
})
