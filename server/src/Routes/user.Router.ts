import { Router } from 'express';

import { getUser, editUserUsername } from '../Controllers/user.Controller';

import { authMiddleware } from '../Middleware/auth.Middleware';

const UserRouter = Router();

UserRouter.use(authMiddleware).get('/me', getUser).patch('/username', editUserUsername);

// Resume/Application Related
// POST   /api/user/resume            // Upload resume
// GET    /api/user/resume            // Get resume details
// DELETE /api/user/resume            // Delete resume

export default UserRouter;
