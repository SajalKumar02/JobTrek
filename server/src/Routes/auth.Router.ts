import { Router } from 'express';

import { registerOrLogin, changePassword, logout } from '../Controllers/auth.Controller';

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
  .post('/login', loginLimiter, registerOrLogin)
  // Change user's password; protected route
  .put('/password', authMiddleware, changePassword)
  // Logs out the user; protected route
  .post('/logout', logout)
  .get('/access/check', authMiddleware, (req, res) => {
    res.status(200).json({
      success: true,
    });
  });

export default AuthRouter;
