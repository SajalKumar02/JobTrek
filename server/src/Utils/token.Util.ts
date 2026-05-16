import { Response } from 'express';

import jwt from 'jsonwebtoken';
import { Types } from 'mongoose';

interface TokenPayload {
  id: Types.ObjectId;
}

// accepting email
// return access token
export const generateAccessToken = (id: Types.ObjectId): string => {
  const payload: TokenPayload = { id };
  const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET, {
    expiresIn: '15m',
  });
  return accessToken;
};

export const generateRefreshToken = (id: Types.ObjectId): string => {
  const payload: TokenPayload = { id };
  const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, {
    expiresIn: '7d',
  });
  return refreshToken;
};

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

export const mountTokenToResponse = (
  res: Response,
  accessToken: string,
  refreshToken: string,
): Response => {
  const accessMaxAge: number = 15 * 60 * 1000;
  const refreshMaxAge: number = 7 * 24 * 60 * 60 * 1000;

  // Use consistent cookie names
  res.cookie('refreshToken', refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: refreshMaxAge,
  });

  res.cookie('accessToken', accessToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: accessMaxAge,
  });

  return res;
};
