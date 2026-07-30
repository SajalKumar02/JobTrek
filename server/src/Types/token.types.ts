import { JwtPayload } from 'jsonwebtoken';
import { Types } from 'mongoose';

// Represents the payload contained in a JWT for user identification
export interface TokenPayload extends JwtPayload {
  id: Types.ObjectId;
}

// Represents a fully decoded JWT, including its issued-at and expiry times
export interface DecodedToken extends TokenPayload {
  iat: number;
  exp: number;
}
// ✅
