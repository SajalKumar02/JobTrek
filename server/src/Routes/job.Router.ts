import { Router } from "express";

import {
    addAJob,
    getAJob,
    getAllJob,
    editAJob,
    deleteAJob
} from "../Controllers/job.Controller";

import { authMiddleware } from "../Middleware/auth.Middleware";

const JobRouter = Router();

JobRouter.use(authMiddleware)
    .post("/", addAJob)
    .get("/", getAllJob)
    .get("/:jobId", getAJob)
    .patch("/:jobId", editAJob)
    .delete("/:jobId", deleteAJob)

export default JobRouter;