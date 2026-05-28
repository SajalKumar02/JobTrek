import { Response } from "express"
import { Types } from "mongoose";

import { jobService } from "../Services/job.Services";

import { IJob, ProtectedRequest } from "../Types";
import { JobDocument } from "../Model/job.Model";

import { JobStatusType } from "../Constants/job.Constants";

export const addAJob = async (req: ProtectedRequest, res: Response) => {
    try {
        const { userId: _omit, ...restUpdates } = req.body;

        const userId = new Types.ObjectId(req.user.userId);
        const updates: Partial<IJob> = restUpdates;

        const job = await jobService.addJob(updates, userId);

        if (!job) {
            return res.status(400).json({
                success: false,
                message: "Failed to add job"
            });
        }

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
        const jobId = new Types.ObjectId(req.params.jobId);
        const userId = new Types.ObjectId(req.user.userId);

        const job = await jobService.getJob(jobId, userId);

        if (!job) {
            return res.status(404).json({
                success: false,
                message: "Job Not Found"
            })
        }

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
        const userId = new Types.ObjectId(req.user.userId);
        const jobs = await jobService.getAllJob(userId);

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
        const jobId = new Types.ObjectId(req.params.jobId);
        const userId = new Types.ObjectId(req.user.userId);

        const { userId: _omit, ...restUpdates } = req.body;
        const updates: Partial<IJob> = restUpdates;

        const job: JobDocument | null = await jobService.editJob(jobId, userId, updates);

        if (!job) {
            return res.status(404).json({
                success: false,
                message: "Job Not Found"
            })
        }

        res.status(200).json({
            success: true,
            job
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: (error as Error).message || 'Internal server error'
        });
    }
};

export const changeJobStatus = async (req: ProtectedRequest, res: Response) => {
    try {
        const jobId = new Types.ObjectId(req.params.jobId);
        const userId = new Types.ObjectId(req.user.userId);

        const { status } = req.body;

        if (!status) {
            return res.status(400).json({ success: false, message: "Status is required" })
        }

        if (!JobStatusType.includes(status)) {
            return res.status(400).json({
                success: false,
                message: "Invalid status value"
            })
        }

        const updates: Pick<IJob, "status"> = { status }

        const job: JobDocument | null = await jobService.changeJobStatus(jobId, userId, updates);

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
        const jobId = new Types.ObjectId(req.params.jobId);
        const userId = new Types.ObjectId(req.user.userId);

        const isJob: boolean = await jobService.deleteJob(jobId, userId);

        res.status(200).json({
            success: isJob
        });
    } catch (error) {
        res.status(500).json({ success: false, message: (error as Error).message || 'Internal server error' });
    }
};
