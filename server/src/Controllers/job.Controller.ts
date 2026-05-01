import { Request, Response } from "express"
import { asyncHandler } from "../Utils/async-handler"

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

export const addAJob = asyncHandler(async (req: AuthRequest, res: Response) => {
    const result = await jobService.addJob(req);

    res.status(200).json({
        success: true,
        job: result.job
    })
})

export const getAJob = asyncHandler(async (req: AuthRequest, res: Response) => {
    const result = await jobService.getJob(req);

    res.status(200).json({
        success: true,
        job: result
    })
})

export const getAllJob = asyncHandler(async (req: AuthRequest, res: Response) => {
    const result = await jobService.getAllJob(req);

    res.status(200).json({
        success: true,
        job: result
    })
})


export const editAJob = asyncHandler(async (req: AuthRequest, res: Response) => {
    const result = await jobService.editJob(req);

    res.status(200).json({
        success: true,
        job: result
    })
})

export const deleteAJob = asyncHandler(async (req: AuthRequest, res: Response) => {
    await jobService.deleteJob(req);

    res.status(200).json({
        success: true
    })
})
