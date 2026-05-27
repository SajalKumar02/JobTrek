import { Response } from "express"

import { jobService } from "../Services/job.Services";

import { IJob, ProtectedRequest } from "../Types";
import { Types } from "mongoose";
import { JobDocument } from "../Model/job.Model";

export const addAJob = async (req: ProtectedRequest, res: Response) => {
    try {
        const updates = req.body;
        const userId: Types.ObjectId = new Types.ObjectId(req.user.userId);

        const job: JobDocument | null = await jobService.addJob(updates, userId);

        res.status(200).json({
            success: true,
            job
        });
    } catch (error) {
        res.status(500).json({ success: false, message: (error as Error).message || 'Internal server error' });
    }
};

export const getAJob = async (req: ProtectedRequest, res: Response) => {
    try {
        const jobId: Types.ObjectId = new Types.ObjectId(req.params.jobId);
        const job: JobDocument = await jobService.getJob(jobId);

        res.status(200).json({
            success: true,
            job
        });
    } catch (error) {
        res.status(500).json({ success: false, message: (error as Error).message || 'Internal server error' });
    }
};

export const getAllJob = async (req: ProtectedRequest, res: Response) => {
    try {
        const userId: Types.ObjectId = new Types.ObjectId(req.user.userId);
        const jobs: Partial<JobDocument[]> | [] = await jobService.getAllJob(userId);

        res.status(200).json({
            success: true,
            jobs
        });
    } catch (error) {
        res.status(500).json({ success: false, message: (error as Error).message || 'Internal server error' });
    }
};

export const editAJob = async (req: ProtectedRequest, res: Response) => {
    try {
        const jobId: Types.ObjectId = new Types.ObjectId(req.params.jobId);
        const updates: Partial<IJob> = req.body;

        const job: JobDocument | null = await jobService.editJob(jobId, updates);

        res.status(200).json({
            success: true,
            job
        });
    } catch (error) {
        res.status(500).json({ success: false, message: (error as Error).message || 'Internal server error' });
    }
};

export const changeJobStatus = async (req: ProtectedRequest, res: Response) => {
    try {
        const jobId: Types.ObjectId = new Types.ObjectId(req.params.jobId);
        const updates: Partial<IJob> = req.body;

        const job: JobDocument | null = await jobService.changeJobStatus(jobId, updates);

        res.status(200).json({
            success: true,
            job
        });
    } catch (error) {
        res.status(500).json({ success: false, message: (error as Error).message || 'Internal server error' });
    }
}

export const deleteAJob = async (req: ProtectedRequest, res: Response) => {
    try {
        const jobId: Types.ObjectId = new Types.ObjectId(req.params.jobId);
        const job: JobDocument | null = await jobService.deleteJob(jobId);

        res.status(200).json({
            success: true
        });
    } catch (error) {
        res.status(500).json({ success: false, message: (error as Error).message || 'Internal server error' });
    }
};
