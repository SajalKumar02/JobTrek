import { JwtPayload } from 'jsonwebtoken';

export interface TokenPayload extends JwtPayload {
  id: string;
}

export interface DecodedToken extends TokenPayload {
  iat: number;
  exp: number;
}
