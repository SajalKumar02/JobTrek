import jwt from 'jsonwebtoken';

export const generateAccessToken = (id) => {
  const accessToken = jwt.sign({ id: id }, process.env.JWT_ACCESS_SECRET, {
    expiresIn: '15d',
  });
  return accessToken;
};

export const verifyAccessToken = (token) => {
  try {
    const decoded = jwt.verify(token, process.env.JWT_ACCESS_SECRET);
    return decoded;
  } catch (error) {
    return null;
  }
};

export const mountTokenToResponse = (res, accessToken) => {
  const accessMaxAge = 15 * 60 * 1000;

  res.cookie('accessToken', accessToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: accessMaxAge,
  });

  return res;
};
