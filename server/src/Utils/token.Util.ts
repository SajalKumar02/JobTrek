import { Response } from "express";

// generateAccessToken(payload) - creates short-lived JWT
// generateRefreshToken(payload) - creates long-lived JWT
// verifyAccessToken(token) - validates and decodes
// verifyRefreshToken(token) - validates refresh token
// Uses jsonwebtoken library
// No database operations here
import jwt from "jsonwebtoken";

interface TokenPayload {
    email: string;
}

// accepting email
// return access token
export const generateAccessToken = (email: string): string => {
    const payload: TokenPayload = { email };
    const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET, {
        expiresIn: "15m",
    });
    return accessToken;
};
export const generateRefreshToken = (email: string): string => {
    const payload: TokenPayload = { email };
    const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, {
        expiresIn: "7d",
    });
    return refreshToken;
};

// accepting token
// return decode payload
export const verifyAccessToken = (token: string) => {
    try {
        const decoded = jwt.verify(token, process.env.JWT_ACCESS_SECRET) as TokenPayload;
        return decoded;
    } catch (error) {
        return null;
    }
};
export const verifyRefreshToken = (token: string) => {
    try {
        const decoded = jwt.verify(token, process.env.JWT_REFRESH_SECRET) as TokenPayload;
        return decoded;
    } catch (error) {
        return null;
    }
};

export const mountTokenToResponse = (res: Response, accessToken: string, refreshToken: string): Response => {
    const accessMaxAge: number = 15 * 60 * 1000; // 15 minutes
    const refreshMaxAge: number = 7 * 24 * 60 * 60 * 1000; // 7 days

    // Use consistent cookie names
    res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: refreshMaxAge,
    });

    res.cookie("accessToken", accessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: accessMaxAge,
    });

    return res;
};
