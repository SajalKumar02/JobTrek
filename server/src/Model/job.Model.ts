import mongoose, { Document } from 'mongoose';

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
            enum: ["Full Time", "Internship", "Contract", "Freelancing", "Part Time"],
            required: true
        },
        location: {
            type: String,
            enum: ["remote", "onSite", "hybrid"],
            default: "onSite"
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
            label: { type: String },   // e.g. "OA Deadline", "Interview Round 1"
            date: { type: Date }
        }],
        // User Setting
        usedId: { type: mongoose.Schema.Types.ObjectId, require: true, },
        status: {
            type: String,
            enum: ["Wishlist", "Applied", "OA", "Interview", "Offer", "Rejected"],
            default: "Wishlist",
            required: true
        }
    },
    {
        timestamps: true
    }
);

const JobModel = mongoose.model<IJob>("Job", jobSchema);

export default JobModel;