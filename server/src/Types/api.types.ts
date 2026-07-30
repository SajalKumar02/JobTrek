import { Response } from 'express';
import { AuthenticatedRequest } from './auth.types';
import { CreateJobInput, JobDocument } from './job.types';
import { AIJobParsedDraft } from './ai.types';

// REQUESTS
export interface UserRequest<
  T = Record<string, any>,
> extends AuthenticatedRequest {
  body: T;
  params: {
    userId: string;
  };
}

export interface JobRequest<T = CreateJobInput> extends AuthenticatedRequest {
  body: T;
  params: {
    jobId?: string;
    userId: string;
  };
}

export interface AIRequest extends AuthenticatedRequest {
  body: {
    jdUserInput: string;
  };
}

// --------------------------------------
// STRUCTURES
export interface ResponseStructure {
  success: boolean;
  message: string;
}

// JOB
interface JobResponseStructure extends ResponseStructure {
  jobs: JobDocument;
}

interface AIResponseStructure extends ResponseStructure {
  aiJsonResponse: AIJobParsedDraft;
}

// This is default Base Response which has success and message at all times.
// If we need to add more data inside json({})
// we could use BaseResponse and ResponseStructure Generic.
export interface BaseResponse<T = ResponseStructure> extends Response {
  json: (body: T) => this;
}

// JOB Response
export interface JobResponse extends BaseResponse<JobResponseStructure> {}

// AI Response
export interface AIResponse extends BaseResponse<AIResponseStructure> {}
