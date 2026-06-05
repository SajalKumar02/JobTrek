import { AuthRequest } from './auth.types';

export interface JobRequest<T = Record<string, any>> extends AuthRequest {
  body: T;
  params: {
    jobId: string;
    userId: string;
  };
}

export interface UserRequest<T = Record<string, any>> extends AuthRequest {
  body: T;
  params: {
    userId: string;
  };
}
