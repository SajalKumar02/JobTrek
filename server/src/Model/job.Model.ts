import mongoose, { Document, Types } from 'mongoose';

export interface IImportantDate {
    label: string,
    date: Date,
}

export interface IJob extends Document {
    companyName: string;
    jobRole: string;
    description?: string;
    ctc: number;
    basePay: number;
    monthlySalary: number;
    jobType: "Full Time" | "Internship" | "Contract" | "Freelancing" | "Part Time";
    bonusIncluded: boolean;
    bonusDescription?: string;
    benefits: boolean;
    benefitsDetails?: string[];
    location: "remote" | "onSite" | "hybrid";
    OfficeAddress?: string;
    isActive?: boolean;
    status: "Wishlist" | "Applied" | "OA" | "Interview" | "Offer" | "Rejected";
    createdAt: Date;
    updatedAt: Date;
    importantDates: IImportantDate[];
    notes: string,
    userId: Types.ObjectId
}

const jobSchema = new mongoose.Schema(
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
        userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
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

const JobModel = mongoose.model<IJob>("Job", jobSchema);

export default JobModel;