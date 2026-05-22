export type ImportantDate = {
    label: string;
    date: Date;
};

export type JobType = 'full time' | 'internship' | 'contract' | 'freelancing' | 'part time';
export type Location = 'remote' | 'onSite' | 'hybrid';
export type Status = 'wishlist' | 'applied' | 'oa' | 'interview' | 'offer' | 'rejected';

export type Job = {
    companyName: string;
    jobRole: string;
    description?: string;
    ctc: number;
    basePay: number;
    monthlySalary: number;
    jobType: JobType;
    bonusIncluded: boolean;
    bonusDescription?: string;
    benefits: boolean;
    benefitsDetails?: string[];
    location: Location;
    officeAddress?: string;
    isActive?: boolean;
    status: Status;
    createdAt: Date;
    updatedAt: Date;
    importantDates: ImportantDate[];
    notes: string;
    userId: string; // Typically a string ObjectId from server
};