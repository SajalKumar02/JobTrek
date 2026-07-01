import { Response } from 'express';
import { Types } from 'mongoose';

import { jobService } from '../Services/job.Services';

import { IJob, IJobStatusTypes, IJobUpdateBody, IStatusHistoryItem, JobDocument, JobRequest } from '../Types';

import { ApiError } from '../Utils/ApiError.Util';
import { asyncHandler } from '../Utils/asyncHandler';
import { addJobValidator, changeJobStatusValidator, editJobValidator } from '../Validators/job.Validator';

export const addAJob = asyncHandler(async (req: JobRequest, res: Response) => {
  const { userId: _omit, ...restUpdates } = req.body;

  const userId = new Types.ObjectId(req.user.userId);

  const statusHistory: IStatusHistoryItem[] = [
    {
      label: restUpdates.status,
      date: new Date(),
    },
  ];

  const updates: Partial<IJob> = {
    ...restUpdates,
    statusHistory: [...statusHistory],
  };

  const validatorResult = addJobValidator.safeParse(updates);
  if (!validatorResult.success) {
    console.log(validatorResult.error);
    throw new ApiError(validatorResult.error.issues[0].message, 400);
  }

  const job = await jobService.addJob(updates, userId);

  if (!job) {
    throw new ApiError('Failed to add job', 400);
  }

  res.status(200).json({
    success: true,
    message: 'Job Created Successfully',
    job,
  });
});

export const getAJob = asyncHandler(async (req: JobRequest, res: Response) => {
  const jobId = new Types.ObjectId(req.params.jobId);
  const userId = new Types.ObjectId(req.user.userId);

  const job = await jobService.getJob(jobId, userId);

  if (!job) {
    throw new ApiError('Job Not Found', 404);
  }

  res.status(200).json({
    success: true,
    message: 'Job fetched successfully',
    job,
  });
});

export const getAllJob = asyncHandler(async (req: JobRequest, res: Response) => {
  const userId = new Types.ObjectId(req.user.userId);
  const jobs = await jobService.getAllJob(userId);

  res.status(200).json({
    success: true,
    message: 'Jobs fetched successfully',
    jobs,
  });
});

export const editAJob = asyncHandler(async (req: JobRequest, res: Response) => {
  const jobId = new Types.ObjectId(req.params.jobId);
  const userId = new Types.ObjectId(req.user.userId);

  const { userId: _omit, ...restUpdates } = req.body;
  const jobUpdates: IJobUpdateBody = restUpdates;

  const validatorResult = editJobValidator.safeParse(jobUpdates);
  if (!validatorResult.success) {
    throw new ApiError(validatorResult.error.issues[0].message, 400);
  }

  const job: JobDocument | null = await jobService.editJob(jobId, userId, jobUpdates);

  if (!job) {
    throw new ApiError('Job Not Found', 404);
  }

  res.status(200).json({
    success: true,
    message: 'Job Updated Successfully',
    job,
  });
});

export const changeJobStatus = asyncHandler(async (req: JobRequest, res: Response) => {
  const jobId = new Types.ObjectId(req.params.jobId);
  const userId = new Types.ObjectId(req.user.userId);

  const status = req.body.status as IJobStatusTypes;

  if (!status) {
    throw new ApiError('Status is required', 400);
  }

  const jobUpdates = {
    status: status,
  };

  const validatorResult = changeJobStatusValidator.safeParse(jobUpdates);
  if (!validatorResult.success) {
    throw new ApiError(validatorResult.error.issues[0].message, 400);
  }

  const job: JobDocument | null = await jobService.changeJobStatus(jobId, userId, jobUpdates);

  res.status(200).json({
    success: true,
    message: 'Job Status Updated Successfully',
    job,
  });
});

export const deleteAJob = asyncHandler(async (req: JobRequest, res: Response) => {
  const jobId = new Types.ObjectId(req.params.jobId);
  const userId = new Types.ObjectId(req.user.userId);

  const isJob: boolean = await jobService.deleteJob(jobId, userId);

  if (!isJob) {
    throw new ApiError('Job not found', 404);
  }

  res.status(200).json({
    success: isJob,
    message: 'Job deleted successfully',
  });
});
