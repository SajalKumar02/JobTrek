import jwt from 'jsonwebtoken';
import { Types } from 'mongoose';
import { BaseResponse, DecodedToken } from '../Types';

export const generateAccessToken = (id: Types.ObjectId) => {
  const accessToken = jwt.sign({ id: id }, process.env.JWT_ACCESS_SECRET, {
    expiresIn: '15d',
  });
  return accessToken;
};

export const verifyAccessToken = (token: string) => {
  try {
    const decoded = jwt.verify(token, process.env.JWT_ACCESS_SECRET) as DecodedToken;
    return decoded;
  } catch (error) {
    return null;
  }
};

export const mountTokenToResponse = (res: BaseResponse, accessToken: string) => {
  const accessMaxAge = 15 * 24 * 60 * 60 * 1000;

  res.cookie('accessToken', accessToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    maxAge: accessMaxAge,
  });

  return res;
};
