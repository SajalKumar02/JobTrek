import { NextFunction } from 'express';
import { BaseResponse } from '../Types';

export const asyncHander = (fn: (req: Request, res: BaseResponse, next: NextFunction) => Promise<any>) => async (req: Request, res: BaseResponse, next: NextFunction) => {
  try {
    await fn(req, res, next);
  } catch (error) {
    const status = (error as { status?: number }).status || 500;
    const message = (error as Error).message || 'Internal server error';

    res.status(status).json({
      success: false,
      message: message,
    });
  }
};
