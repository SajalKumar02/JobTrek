import { Router } from 'express';

import {
  registerOrLogin,
  changePassword,
  refreshAccessToken,
  logout,
} from '../Controllers/auth.Controller';

import { authMiddleware } from '../Middleware/auth.Middleware';

import rateLimit from 'express-rate-limit';

const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  message: 'Too many login attempts, try again in 15 minutes'
});

const AuthRouter = Router();

AuthRouter
  // User login or registration
  .post('/login', loginLimiter, registerOrLogin)
  // Refreshes access token
  .post('/token/refresh', refreshAccessToken)
  // Change user's password; protected route
  .put('/password', authMiddleware, changePassword)
  // Logs out the user; protected route
  .post('/logout', authMiddleware, logout)

export default AuthRouter;
