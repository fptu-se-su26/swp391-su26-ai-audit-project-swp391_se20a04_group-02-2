import { Request, Response, NextFunction, RequestHandler } from 'express';
import { AuthRequest } from '../types';

export class AppError extends Error {
  statusCode: number;
  status: string;

  constructor(message: string, statusCode: number) {
    super(message);
    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';
    Error.captureStackTrace(this, this.constructor);
  }
}

type AsyncRequestHandler = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => Promise<void | Response>;

export const asyncHandler =
  (fn: AsyncRequestHandler): RequestHandler =>
  (req, res, next) => {
    Promise.resolve(fn(req as AuthRequest, res, next)).catch(next);
  };

export const notFoundHandler = (req: Request, res: Response) => {
  res.status(404).json({
    success: false,
    status: 'fail',
    message: `Route not found: ${req.originalUrl}`,
  });
};

export const errorHandler = (
  err: AppError | Error,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  console.error('Error:', err);

  if (err.message?.includes('Connection timeout')) {
    return res.status(503).json({
      success: false,
      status: 'error',
      message: 'Database connection error',
    });
  }

  const statusCode = err instanceof AppError ? err.statusCode : 500;
  const message = err.message || 'Internal server error';

  if (statusCode === 400 && message.includes('|')) {
    const errors = message.split('|');
    return res.status(400).json({
      success: false,
      status: 'fail',
      errors,
    });
  }

  return res.status(statusCode).json({
    success: false,
    status: err instanceof AppError ? err.status : 'error',
    message,
  });
};
