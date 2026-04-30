import { Error as MongooseError } from 'mongoose';

interface ApiErrorParams {
  status: number;
  message?: string;
  errors?: any[];
  stack?: string;
}

class ApiError extends MongooseError {
  public status: number;
  public data: null;
  public success: boolean;
  public errors: any[];
  constructor({
    status,
    message = 'Something went wrong',
    errors = [],
    stack = '',
  }: ApiErrorParams) {
    super(message);
    this.status = status;
    this.data = null;
    this.message = message;
    this.errors = errors;
    this.success = false;

    if (stack) {
      this.stack = stack;
    } else {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}

export { ApiError };
