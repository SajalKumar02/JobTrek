import { Router } from 'express';

import AuthRouter from './auth.Router';
import UserRouter from './user.Router';

const IndexRouter = Router();

IndexRouter.use('/auth', AuthRouter);
IndexRouter.use('/user', UserRouter);

export default IndexRouter;
