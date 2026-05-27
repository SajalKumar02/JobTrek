import { Types } from "mongoose";

export interface IImportantDate {
    label: string,
    date: Date,
}

export interface IJob {
    companyName: string;
    officeAddress?: string;
    jobRole: string;
    description?: string;
    jobType: "full time" | "internship" | "contract" | "freelancing" | "part time";
    location: "remote" | "onSite" | "hybrid";
    ctc: number;
    basePay: number;
    monthlySalary: number;
    bonusIncluded: boolean;
    bonusDescription?: string;
    benefits: boolean;
    benefitsDetails?: string[];
    isActive: boolean;
    importantDates: IImportantDate[];
    userId: Types.ObjectId;
    status: "wishlist" | "applied" | "oa" | "interview" | "offer" | "rejected";
    notes: string,
}
