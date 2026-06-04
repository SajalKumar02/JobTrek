import { Response } from 'express';
import { Types } from 'mongoose';

import { jobService } from '../Services/job.Services';

import { IJob, IStatusHistoryItem, ProtectedRequest } from '../Types';
import { JobDocument } from '../Model/job.Model';

import { JobStatusType } from '../Constants/job.Constants';
import { asyncHander } from '../Utils/asyncHandler';
import { ApiError } from '../Utils/ApiError.Util';

export const addAJob = asyncHander(async (req: ProtectedRequest, res: Response) => {
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

export const getAJob = asyncHander(async (req: ProtectedRequest, res: Response) => {
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

export const getAllJob = asyncHander(async (req: ProtectedRequest, res: Response) => {
  const userId = new Types.ObjectId(req.user.userId);
  const jobs = await jobService.getAllJob(userId);

  res.status(200).json({
    success: true,
    message: 'Jobs fetched successfully',
    jobs,
  });
});

export const editAJob = asyncHander(async (req: ProtectedRequest, res: Response) => {
  const jobId = new Types.ObjectId(req.params.jobId);
  const userId = new Types.ObjectId(req.user.userId);

  const { userId: _omit, ...restUpdates } = req.body;
  const updates: Partial<IJob> = restUpdates;

  const job: JobDocument | null = await jobService.editJob(jobId, userId, updates);

  if (!job) {
    throw new ApiError('Job Not Found', 404);
  }

  res.status(200).json({
    success: true,
    message: 'Job Updated Successfully',
    job,
  });
});

export const changeJobStatus = asyncHander(async (req: ProtectedRequest, res: Response) => {
  const jobId = new Types.ObjectId(req.params.jobId);
  const userId = new Types.ObjectId(req.user.userId);

  const { status } = req.body;

  if (!status) {
    throw new ApiError('Status is required', 400);
  }

  if (!JobStatusType.includes(status)) {
    throw new ApiError('Invalid status value', 400);
  }

  const updates: Pick<IJob, 'status'> = { status };

  const job: JobDocument | null = await jobService.changeJobStatus(jobId, userId, updates);

  res.status(200).json({
    success: true,
    message: 'Job Status Updated Successfully',
    job,
  });
});

export const deleteAJob = asyncHander(async (req: ProtectedRequest, res: Response) => {
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
