import { Types } from "mongoose";

import JobModel, { JobDocument } from "../Model/job.Model"

import { IJob } from "../Types";

export const jobService = {
    addJob: async (newJob: Partial<IJob>, userId: Types.ObjectId): Promise<JobDocument | null> => {
        const reqBody = {
            ...newJob,
            userId: userId
        };

        const job: JobDocument | null = await JobModel.create(reqBody);
        return job;
    },

    getJob: async (jobId: Types.ObjectId): Promise<JobDocument | null> => {
        const result: JobDocument | null = await JobModel.findById(jobId);

        return result;
    },

    getAllJob: async (userId: Types.ObjectId): Promise<Partial<JobDocument[]>> => {
        const result: Partial<JobDocument[]> | [] = await JobModel.find({ userId: userId }).select("companyName jobType jobRole importantDates status");
        return result;
    },

    editJob: async (jobId: Types.ObjectId, updates: Partial<IJob>): Promise<JobDocument | null> => {
        const result: JobDocument | null = await JobModel.findByIdAndUpdate(jobId, updates, { returnDocument: 'after' });
        return result;
    },

    changeJobStatus: async (jobId: Types.ObjectId, updates: Partial<IJob>): Promise<JobDocument | null> => {
        const result: JobDocument | null = await JobModel.findByIdAndUpdate(jobId, updates, { returnDocument: 'after' });
        return result;
    },

    deleteJob: async (jobId: Types.ObjectId) => {
        await JobModel.findByIdAndDelete(jobId);
        return;
    },
}