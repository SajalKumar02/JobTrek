import { HydratedDocument, Types } from 'mongoose';

// Base Values
export type IEmploymentType = 'full time' | 'internship' | 'contract' | 'freelancing' | 'part time';

export type IWorkMode = 'remote' | 'onSite' | 'hybrid';

export type IJobStatusTypes = 'wishlist' | 'applied' | 'oa' | 'interview' | 'offer' | 'rejected';

export type IImportantDate = {
  label: string;
  date: Date;
};

export type IStatusHistoryItem = {
  label: IJobStatusTypes;
  date: Date;
};

export type IJobSource = 'linkedIn' | 'unstop' | 'internshala' | 'naukri' | 'others';

// Complete Structure
export type IJob = {
  // About Company
  companyName: string;
  officeAddress?: string;

  // About Job
  jobTitle: string;
  description?: string;
  employementType: IEmploymentType;
  workMode: IWorkMode;

  // Internship Options
  internshipDuration: string;

  // Compensation Details
  annualCTC: number;
  basePay: number;
  monthlySalary: number;

  // Program Highlights
  programHighlights: string;

  // Compensation Extras
  hasBonus: boolean;
  bonusDescription?: string;
  hasBenefits: boolean;
  benefitsDetails?: string[];

  // Listing Status
  isListingOpen: boolean;
  jobPostingURL: string;
  jobSource: IJobSource;

  // Important Dates
  importantDates: IImportantDate[];

  // User Settings
  userId: Types.ObjectId;
  notes?: string;

  // Job Status
  status: IJobStatusTypes;
  statusHistory: IStatusHistoryItem[];

  // Timestamps
  createdAt: Date;
  updatedAt: Date;
};

// Updates
export type IJobUpdateBody = Partial<IJob>;

// Mongoose Hydrated Document
export type JobDocument = HydratedDocument<IJob>;

// Job Analytics Data
export type JobSummaryDocument = HydratedDocument<
  Pick<
    IJob,
    'companyName' | 'employementType' | 'jobTitle' | 'importantDates' | 'status' | 'updatedAt'
  >
>;
