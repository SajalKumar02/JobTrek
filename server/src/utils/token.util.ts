// generateAccessToken(payload) - creates short-lived JWT
// generateRefreshToken(payload) - creates long-lived JWT
// verifyAccessToken(token) - validates and decodes
// verifyRefreshToken(token) - validates refresh token
// Uses jsonwebtoken library
// No database operations here
import jwt from "jsonwebtoken";

// accepting email
// return access token
export const generateAccessToken = ({ email }) => {
  const accessToken = jwt.sign({ email }, process.env.JWT_ACCESS_SECRET, {
    expiresIn: process.env.ACCESS_TOKEN_EXPIRY || "15m",
  });
  return accessToken;
};

// accepting email
// return refresh token
export const generateRefreshToken = ({ email }) => {
  const refreshToken = jwt.sign({ email }, process.env.JWT_REFRESH_SECRET, {
    expiresIn: process.env.REFRESH_TOKEN_EXPIRY || "7d",
  });
  return refreshToken;
};

// accepting token
// return decode payload
export const verifyAccessToken = (token) => {
  try {
    const decoded = jwt.verify(token, process.env.JWT_ACCESS_SECRET);
    return decoded;
  } catch (error) {
    return null;
  }
};

// small helper to convert expiry strings like "15m" or "7d" to milliseconds
const parseExpiryToMs = (value) => {
  if (!value) return undefined;
  // already numeric (ms)
  if (/^\d+$/.test(value)) return Number(value);
  const num = Number(value.slice(0, -1));
  const unit = value.slice(-1).toLowerCase();
  if (Number.isNaN(num)) return undefined;
  switch (unit) {
    case "s":
      return num * 1000;
    case "m":
      return num * 60 * 1000;
    case "h":
      return num * 60 * 60 * 1000;
    case "d":
      return num * 24 * 60 * 60 * 1000;
    default:
      return undefined;
  }
};

// accepting response object (res) and tokens
// mounts cookies and returns the response
export const mountTokenToResponse = (res, accessToken, refreshToken) => {
  // prefer env values, fallback to sensible defaults
  const accessMaxAge = parseExpiryToMs(process.env.ACCESS_TOKEN_EXPIRY) || 15 * 60 * 1000; // 15 minutes
  const refreshMaxAge = parseExpiryToMs(process.env.REFRESH_TOKEN_EXPIRY) || 7 * 24 * 60 * 60 * 1000; // 7 days

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
