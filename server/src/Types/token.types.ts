export interface TokenPayload {
  id: string;
}

export interface DecodedToken extends TokenPayload {
  iat: number;
  exp: number;
}
