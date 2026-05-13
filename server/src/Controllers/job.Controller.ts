import { Request, Response } from "express"

import { jobService } from "../Services/job.Services";
import { Types } from "mongoose";

interface AuthRequest extends Request {
    params: {
        id: string;
    };
    user?: {
        userId: Types.ObjectId;
    };
}

export const addAJob = async (req: AuthRequest, res: Response) => {
    try {
        const result = await jobService.addJob(req);

        res.status(200).json({
            success: true,
            job: result.job
        });
    } catch (error) {
        res.status(500).json({ success: false, message: (error as Error).message || 'Internal server error' });
    }
};

export const getAJob = async (req: AuthRequest, res: Response) => {
    try {
        const result = await jobService.getJob(req);

        res.status(200).json({
            success: true,
            job: result
        });
    } catch (error) {
        res.status(500).json({ success: false, message: (error as Error).message || 'Internal server error' });
    }
};

export const getAllJob = async (req: AuthRequest, res: Response) => {
    try {
        const result = await jobService.getAllJob(req);

        res.status(200).json({
            success: true,
            job: result
        });
    } catch (error) {
        res.status(500).json({ success: false, message: (error as Error).message || 'Internal server error' });
    }
};

export const editAJob = async (req: AuthRequest, res: Response) => {
    try {
        const result = await jobService.editJob(req);

        res.status(200).json({
            success: true,
            job: result
        });
    } catch (error) {
        res.status(500).json({ success: false, message: (error as Error).message || 'Internal server error' });
    }
};

export const deleteAJob = async (req: AuthRequest, res: Response) => {
    try {
        await jobService.deleteJob(req);

        res.status(200).json({
            success: true
        });
    } catch (error) {
        res.status(500).json({ success: false, message: (error as Error).message || 'Internal server error' });
    }
};
