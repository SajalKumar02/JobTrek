import { Response } from 'express';
import { AuthenticatedRequest } from './auth.types';
import { UserDocument } from './user.types';
import { JobDocument } from './job.types';
import { IAIJobParsedDraft } from './ai.types';

// REQUESTS
export interface UserRequest<
  T = Record<string, any>,
> extends AuthenticatedRequest {
  body: T;
  params: {
    userId: string;
  };
}

export interface JobRequest<
  T = Record<string, any>,
> extends AuthenticatedRequest {
  body: T;
  params: {
    jobId: string;
    userId: string;
  };
}

export interface AIRequest extends AuthenticatedRequest {
  body: {
    jdUserInput: string;
  };
}

// --------------------------------------
// RESPONSES
export interface BaseResponse extends Response {
  json: (body: {
    success: boolean;
    message: string;
    user?: UserDocument;
  }) => this;
}

export interface UserResponse extends Response {
  json: (body: {
    success: boolean;
    message: string;
    user: UserDocument;
  }) => this;
}

export interface JobResponse extends Response {
  json: (body: {
    success: boolean;
    message: string;
    jobs: JobDocument;
  }) => this;
}

export interface AIResponse extends Response {
  json: (body: {
    success: boolean;
    message: string;
    jsonResponse: IAIJobParsedDraft;
  }) => this;
}
