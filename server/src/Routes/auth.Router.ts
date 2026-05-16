import { Router } from 'express';

import {
  registerOrLogin,
  changePassword,
  refreshAccessToken,
  logout,
  deleteAllData,
} from '../Controllers/auth.Controller';

import { authMiddleware } from '../Middleware/auth.Middleware';

const AuthRouter = Router();

AuthRouter
  // User login or registration
  .post('/login', registerOrLogin)
  // Refreshes access token
  .post('/token/refresh', refreshAccessToken)
  // Change user's password; protected route
  .put('/password', authMiddleware, changePassword)
  // Logs out the user; protected route
  .post('/logout', authMiddleware, logout)
  // Deletes all user data; usually for dev/admin
  .delete('/all', deleteAllData);

export default AuthRouter;
