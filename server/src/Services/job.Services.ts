import { Types } from "mongoose";

import JobModel, { JobDocument } from "../Model/job.Model"

import { IJob, JobSummary } from "../Types";

export const jobService = {
    addJob: async (newJob: Partial<IJob>, userId: Types.ObjectId): Promise<JobDocument | null> => {
        const reqBody = {
            ...newJob,
            userId: userId
        };

        const job = await JobModel.create(reqBody);
        return job;
    },

    getJob: async (jobId: Types.ObjectId, userId: Types.ObjectId): Promise<JobDocument | null> => {
        const result = await JobModel.findOne({ _id: jobId, userId: userId });

        return result;
    },

    getAllJob: async (userId: Types.ObjectId): Promise<JobSummary[]> => {
        const result = await JobModel.find({ userId: userId }).select("companyName jobType jobRole importantDates status");

        return result;
    },

    editJob: async (jobId: Types.ObjectId, userId: Types.ObjectId, updates: Partial<IJob>): Promise<JobDocument | null> => {
        const result = await JobModel.findOneAndUpdate({ _id: jobId, userId: userId }, updates, { returnDocument: 'after' });
        return result;
    },

    changeJobStatus: async (jobId: Types.ObjectId, userId: Types.ObjectId, updates: Partial<IJob>): Promise<JobDocument | null> => {
        const result = await JobModel.findOneAndUpdate({ _id: jobId, userId: userId }, updates, { returnDocument: 'after' });
        return result;
    },

    deleteJob: async (jobId: Types.ObjectId, userId: Types.ObjectId) => {
        await JobModel.findOneAndDelete({ _id: jobId, userId: userId });
        return;
    },
}