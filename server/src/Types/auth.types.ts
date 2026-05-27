import { Types } from 'mongoose';
import { Request } from 'express';

export interface AuthRequest<T = Record<string, any>> extends Request {
    user?: {
        userId: Types.ObjectId;
    };
    body: T;
    cookies: {
        refreshToken?: string;
        accessToken?: string;
    };
}

export interface AuthServiceResponse {
    accessToken: string;
    refreshToken: string;
    isNewUser: boolean;
}

export interface ProtectedRequest<T = Record<string, unknown>> extends AuthRequest<T> {
    user: {
        userId: Types.ObjectId;
    };
}

export interface TokenPayload {
    id: string;
}

export interface DecodedToken extends TokenPayload {
    iat: number;
    exp: number;
}
