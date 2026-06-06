import { Request, Response } from 'express';

// Request interface with optional access token cookie
export interface AccessTokenRequest extends Request {
  cookies: {
    accessToken?: string;
  };
}

// Authenticated request with user information attached
export interface AuthenticatedRequest extends AccessTokenRequest {
  user: {
    userId: string;
  };
}

// Standard authenticated request type for user update operations (e.g., password, username change)
export interface UserUpdateRequest<T = Record<string, string>> extends AuthenticatedRequest {
  body: T;
}

// Request interface for login operations
export interface LoginRequest<T = Record<string, string>> extends Request {
  body: T;
}

// -----------------------
// Responses
