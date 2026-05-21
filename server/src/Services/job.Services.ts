import JobModel, { IJob } from "../Model/job.Model"

export const jobService = {
    addJob: async (req) => {

        const reqBody = {
            ...req.body,
            userId: req.user.userId
        };

        const job = new JobModel(reqBody);

        await job.save();

        return { job };
    },

    getJob: async (req) => {
        const result = await JobModel.findById(req.params.jobId);
        return { result };
    },

    getAllJob: async (req) => {
        const result = await JobModel.find({ userId: req.user.userId })
        return { result };
    },

    editJob: async (req) => {
        const result = await JobModel.findByIdAndUpdate(req.params.jobId, req.body, { returnDocument: 'after' });
        return { result };
    },

    changeJobStatus: async (req) => {

    },

    deleteJob: async (req) => {
        await JobModel.findByIdAndDelete(req.params.jobId);
        return;
    },
}