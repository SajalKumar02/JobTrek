import { Request, Response, NextFunction } from 'express';

type AsyncHandlerFn<T extends Request = Request> = (
  req: T,
  res: any,
  next: NextFunction
) => Promise<void | any> | void | any;

export const asyncHandler =
  <T extends Request = Request>(fn: AsyncHandlerFn<T>) =>
  (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req as T, res, next)).catch((error) => {
      const status = (error as { status?: number }).status || 500;
      const message = (error as Error).message || 'Internal server error';
      console.log(error);

      res.status(status).json({
        success: false,
        message,
      });
    });
  };
