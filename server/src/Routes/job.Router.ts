import { Router } from 'express';

import {
  addAJob,
  getAJob,
  getAllJob,
  editAJob,
  changeJobStatus,
  deleteAJob,
} from '../Controllers/job.Controller';

import { authMiddleware } from '../Middleware/auth.Middleware';

const JobRouter = Router();

// prettier-ignore
JobRouter
  .use(authMiddleware)
  .post('/', addAJob)
  .get('/', getAllJob)
  .get('/:jobId', getAJob)
  .patch('/status/:jobId', changeJobStatus)
  .patch('/:jobId', editAJob)
  .delete('/:jobId', deleteAJob);

export default JobRouter;
