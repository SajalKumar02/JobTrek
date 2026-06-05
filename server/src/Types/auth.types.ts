// Who is making the request
// How do we verify them

import { Types } from 'mongoose';
import { Request } from 'express';

export interface AuthRequest extends Request {
  user?: {
    userId: Types.ObjectId;
  };
  cookies: {
    accessToken?: string;
  };
}

export interface AuthServiceResponse {
  accessToken: string;
  isNewUser: boolean;
}

export interface ProtectedRequest<T = Record<string, any>> extends AuthRequest {
  user: {
    userId: Types.ObjectId;
  };
  body: T;
  params: {
    jobId?: string;
    userId?: string;
  };
}
