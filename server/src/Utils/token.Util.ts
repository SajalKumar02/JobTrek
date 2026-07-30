import jwt from 'jsonwebtoken';
import { Types } from 'mongoose';

import {
  JWT_ACCESS_SECRET,
  JWT_ACCESS_MAX_AGE,
  JWT_REFRESH_SECRET,
  JWT_REFRESH_MAX_AGE,
} from '../Constants/constants';

import { AuthResponse, BaseResponse, DecodedToken } from '../Types';

export const generateAccessToken = (id: Types.ObjectId): string => {
  return jwt.sign({ id: id }, JWT_ACCESS_SECRET, {
    expiresIn: JWT_ACCESS_MAX_AGE,
  });
};

export const generateRefreshToken = (id: Types.ObjectId): string => {
  return jwt.sign({ id: id }, JWT_REFRESH_SECRET, {
    expiresIn: JWT_REFRESH_MAX_AGE,
  });
};

export const verifyAccessToken = (token: string): DecodedToken => {
  return jwt.verify(token, JWT_ACCESS_SECRET) as DecodedToken;
};

export const verifyRefreshToken = (token: string): DecodedToken => {
  return jwt.verify(token, JWT_REFRESH_SECRET) as DecodedToken;
};

export const mountRefreshTokenToResponse = (
  res: AuthResponse,
  refreshToken: string
) => {
  res.cookie('refreshToken', refreshToken, {
    httpOnly: true,
    secure: true,
    sameSite: 'none',
    maxAge: JWT_REFRESH_MAX_AGE,
  });

  return res;
};

export const clearRefreshToken = (res: BaseResponse) => {
  res.clearCookie('refreshToken', {
    httpOnly: true,
    secure: true,
    sameSite: 'none',
  });

  return res;
};
