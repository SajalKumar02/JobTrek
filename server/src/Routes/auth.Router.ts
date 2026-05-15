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

AuthRouter.post('/login', registerOrLogin)
  .get('/me', authMiddleware, (req, res) => res.json({ success: true }))
  .post('/token/refresh', refreshAccessToken)
  .put('/password', authMiddleware, changePassword)
  .post('/logout', authMiddleware, logout)
  .delete('/all', deleteAllData);

export default AuthRouter;
