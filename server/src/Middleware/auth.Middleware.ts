import { NextFunction, Response } from "express";

import { AuthRequest } from "../Types";
import { verifyAccessToken } from "../Utils/token.Util";
import { Types } from "mongoose";

export const authMiddleware = (req: AuthRequest, res: Response, next: NextFunction) => {
  const { accessToken } = req.cookies;

  if (!accessToken) {
    return res.status(401).send({
      message: "ACCESS TOKEN EXPIRED",
      success: false
    });
  }

  const decoded = verifyAccessToken(accessToken);

  if (!decoded) {
    return res.status(401).send({
      message: "ACCESS TOKEN EXPIRED",
      success: false
    });
  }

  req.user = { userId: new Types.ObjectId(decoded.id) };

  next();
};
