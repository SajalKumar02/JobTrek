import { Request } from 'express';
import { Types } from 'mongoose';
import { UserDocument } from './user.types';
import { BaseResponse, ResponseStructure } from './api.types';

// --------------------------------------------------------------------------------------------------------------------------------------------
// LOGIN AND REGISTER - AUTH
// REQUESTS✅
export interface AuthRequestStructure {
  email: string;
  password: string;
}
export interface AuthRequestBody extends Request {
  body: AuthRequestStructure;
}

// RESPONSE✅
// In this -> adding fields of ResponseStructure with new ones and creating a new structure.
export interface AuthResponseStructure extends ResponseStructure {
  user?: UserDocument;
  accessToken: string;
}
// Using the BaseResponse which is already extends Response is making single source of truth.
export interface AuthResponse extends BaseResponse<AuthResponseStructure> {}

// --------------------------------------------------------------------------------------------------------------------------------------------
// AuthMiddleware
// Request ✅
export interface AuthMiddlewareRequest extends Request {
  user?: {
    userId: Types.ObjectId;
  };
}

// --------------------------------------------------------------------------------------------------------------------------------------------
// LOG OUT
// Request ✅
// Responses ✅

// --------------------------------------------------------------------------------------------------------------------------------------------
// Refresh Token
export interface RequestWithRefreshToken extends Request {
  cookies: {
    refreshToken: string;
  };
}

// After Middleware
// Use it in Base requests where userId is needed
// Add fields to it and use this.
export interface AuthenticatedRequest extends Request {
  user: {
    userId: Types.ObjectId;
  };
}
