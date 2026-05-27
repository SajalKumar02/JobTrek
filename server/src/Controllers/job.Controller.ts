import { Response } from "express"

import { jobService } from "../Services/job.Services";

import { JobRequest } from "../Types";

export const addAJob = async (req: JobRequest, res: Response) => {
    try {
        const job = await jobService.addJob(req.body, req.user.userId);

        res.status(200).json({
            success: true,
            job
        });
    } catch (error) {
        res.status(500).json({ success: false, message: (error as Error).message || 'Internal server error' });
    }
};

export const getAJob = async (req: JobRequest, res: Response) => {
    try {
        const job = await jobService.getJob(req.params.jobId);

        res.status(200).json({
            success: true,
            job
        });
    } catch (error) {
        res.status(500).json({ success: false, message: (error as Error).message || 'Internal server error' });
    }
};

export const getAllJob = async (req: JobRequest, res: Response) => {
    try {
        const jobs = await jobService.getAllJob(req.user.userId);

        res.status(200).json({
            success: true,
            jobs
        });
    } catch (error) {
        res.status(500).json({ success: false, message: (error as Error).message || 'Internal server error' });
    }
};

export const editAJob = async (req: JobRequest, res: Response) => {
    try {
        const job = await jobService.editJob(req.params.jobId, req.body);

        res.status(200).json({
            success: true,
            job
        });
    } catch (error) {
        res.status(500).json({ success: false, message: (error as Error).message || 'Internal server error' });
    }
};

export const changeJobStatus = async (req: JobRequest, res: Response) => {
    try {
        const job = await jobService.changeJobStatus(req.params.jobId, req.body);

        res.status(200).json({
            success: true,
            job
        });
    } catch (error) {
        res.status(500).json({ success: false, message: (error as Error).message || 'Internal server error' });
    }
}

export const deleteAJob = async (req: JobRequest, res: Response) => {
    try {
        await jobService.deleteJob(req.params.jobId);

        res.status(200).json({
            success: true
        });
    } catch (error) {
        res.status(500).json({ success: false, message: (error as Error).message || 'Internal server error' });
    }
};
