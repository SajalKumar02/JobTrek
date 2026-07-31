import { Router } from 'express';

import {
  AuthController,
  LogOutController,
  RefreshTokenController,
  GetCurrentUserController,
} from '../Controllers/auth.Controller';

import { authMiddleware } from '../Middleware/auth.Middleware';

import rateLimit from 'express-rate-limit';

const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 15,
  message: 'Too many login attempts, try again in 15 minutes',
});

const AuthRouter = Router();

// prettier-ignore
AuthRouter
  // User login or registration
  .post('/', loginLimiter, AuthController)
  .post('/logout', authMiddleware, LogOutController)
  
  // Issue new access and refresh tokens using a valid refresh token
  .get('/refreshToken', RefreshTokenController)
  // to check user has access token or not and then return user information
  .get('/me', authMiddleware, GetCurrentUserController)

export default AuthRouter;
