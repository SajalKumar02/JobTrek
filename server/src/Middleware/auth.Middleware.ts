// verifyToken(req, res, next) function
// Extracts token from Authorization header
// Verifies token using token utils
// Attaches decoded user data to req.user
// Called before protected route handlers

import { Request, Response, NextFunction } from "express";
import { verifyAccessToken } from "../Utils/token.Util";

interface AuthRequest extends Request {
    user?: {
        email: string;
    };
}

export const authMiddleware = (req: AuthRequest, res: Response, next: NextFunction) => {
    const { accessToken } = req.cookies;

    if (!accessToken) {
        return res.status(401).send({
            message: "Access token required",
            success: false
        })
    }

    const decoded = verifyAccessToken(accessToken);

    req.user = { email: decoded.email };

    next();
}