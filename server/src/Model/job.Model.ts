import { Schema, model, HydratedDocument } from "mongoose";

import { IJob } from "../Types/index";

const jobSchema = new Schema<IJob>(
    {
        // About Company
        companyName: { type: String, required: true },
        officeAddress: { type: String },
        // About Job
        jobRole: { type: String, required: true },
        description: { type: String },
        jobType: {
            type: String,
            enum: ["full time", "internship", "contract", "freelancing", "part time"],
            lowercase: true,
            required: true
        },
        location: {
            type: String,
            enum: ["remote", "onSite", "hybrid"],
            default: "onSite",
            required: true,
        },
        // Miscellaneous
        ctc: { type: Number, min: 0 },
        basePay: { type: Number, min: 0 },
        monthlySalary: { type: Number, min: 0 },
        bonusIncluded: { type: Boolean, default: false },
        bonusDescription: { type: String },
        benefits: { type: Boolean, default: false },
        benefitsDetails: { type: [String] },
        isActive: { type: Boolean, default: true },
        importantDates: [{
            label: { type: String },
            date: { type: Date }
        }],
        // User Setting
        userId: {
            type:
                Schema.Types.ObjectId,
            ref: "User",
            required: true
        },
        status: {
            type: String,
            enum: ["wishlist", "applied", "oa", "interview", "offer", "rejected"],
            default: "wishlist",
            lowercase: true,
            required: true
        },
        notes: {
            type: String
        }
    },
    {
        timestamps: true
    }
);

const JobModel = model<IJob>("Job", jobSchema);

export type JobDocument = HydratedDocument<IJob>
export default JobModel;