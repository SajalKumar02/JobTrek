import { Types } from 'mongoose';

import JobModel from '../Model/job.Model';

import { IJob, IJobUpdateBody, JobDocument, JobSummaryDocument } from '../Types';

export const jobService = {
  addJob: async (newJob: Partial<IJob>, userId: Types.ObjectId) => {
    const reqBody = {
      ...newJob,
      userId: userId,
    };

    const job: JobDocument | null = await JobModel.create(reqBody);
    return job;
  },

  getJob: async (jobId: Types.ObjectId, userId: Types.ObjectId) => {
    const result: JobDocument | null = await JobModel.findOne({ _id: jobId, userId: userId });

    return result;
  },

  getAllJob: async (userId: Types.ObjectId) => {
    const result: JobSummaryDocument[] | null = await JobModel.find({ userId: userId }).select(
      'companyName jobType jobRole importantDates status statusHistory updatedAt'
    );

    return result;
  },

  editJob: async (jobId: Types.ObjectId, userId: Types.ObjectId, updates: IJobUpdateBody) => {
    const updatedJob: JobDocument | null = await JobModel.findOneAndUpdate(
      { _id: jobId, userId: userId },
      updates,
      {
        returnDocument: 'after',
      }
    );

    if (!updatedJob) return null;

    return updatedJob;
  },

  changeJobStatus: async (
    jobId: Types.ObjectId,
    userId: Types.ObjectId,
    jobUpdates: IJobUpdateBody
  ) => {
    const result: JobDocument | null = await JobModel.findOne({ _id: jobId, userId: userId });

    if (!result) return null;

    const updates = {
      ...jobUpdates,
      statusHistory: [
        ...result.statusHistory,
        {
          label: jobUpdates.status,
          date: new Date(),
        },
      ],
    };

    const updatedJob = await JobModel.findOneAndUpdate({ _id: jobId, userId: userId }, updates, {
      after: true,
    }).select('companyName jobType jobRole importantDates status statusHistory updatedAt');

    return updatedJob as JobDocument;
  },

  deleteJob: async (jobId: Types.ObjectId, userId: Types.ObjectId) => {
    const job: JobDocument | null = await JobModel.findOneAndDelete({ _id: jobId, userId: userId });
    if (job) {
      return true;
    }
    return false;
  },
};
