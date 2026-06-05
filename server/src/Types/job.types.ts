import { HydratedDocument, Types } from 'mongoose';

// Base Values
export type IJobType = 'full time' | 'internship' | 'contract' | 'freelancing' | 'part time';

export type IJobLocation = 'remote' | 'onSite' | 'hybrid';

export type IJobStatusTypes = 'wishlist' | 'applied' | 'oa' | 'interview' | 'offer' | 'rejected';

export type IImportantDate = {
  label: string;
  date: Date;
};

export type IStatusHistoryItem = {
  label: IJobStatusTypes;
  date: Date;
};

// Complete Structure
export type IJob = {
  companyName: string;
  officeAddress?: string;
  jobRole: string;
  description?: string;
  jobType: IJobType;
  location: IJobLocation;
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
  status: IJobStatusTypes;
  statusHistory: IStatusHistoryItem[];
  notes: string;
  createdAt: Date;
  updatedAt: Date;
};

// Updates
export type IJobUpdateBody = Partial<IJob>;

// Mongoose Hydrated Document
export type JobDocument = HydratedDocument<IJob>;

export type JobSummaryDocument = HydratedDocument<Pick<IJob, 'companyName' | 'jobType' | 'jobRole' | 'importantDates' | 'status'>>;
