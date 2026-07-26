import { HydratedDocument, Types } from 'mongoose';

// -------------------------------------------------------
// Constant Values
export type IEmploymentType =
  | 'fullTime'
  | 'internship'
  | 'contract'
  | 'freelancing'
  | 'partTime';

export type IWorkMode = 'remote' | 'onSite' | 'hybrid';

export type IJobStatusTypes =
  | 'wishlist'
  | 'applied'
  | 'oa'
  | 'interview'
  | 'offer'
  | 'rejected';

export type IJobSource =
  | 'linkedIn'
  | 'unstop'
  | 'internshala'
  | 'naukri'
  | 'other';

// -------------------------------------------------------
// Heirarichal Structure
export type IImportantDate = {
  label?: string;
  date?: Date;
};

export type IStatusHistoryItem = {
  label: IJobStatusTypes;
  date: Date;
};

// -------------------------------------------------------
// Complete Structure
export type IJob = {
  _id: Types.ObjectId;
  // About Company
  companyName: string;
  officeAddress?: string;

  // About Job
  jobTitle: string;
  description?: string;
  requiredSkills?: string[];
  employmentType: IEmploymentType;
  workMode: IWorkMode;

  // Internship Options
  internshipDuration?: string;

  // Compensation Details
  annualCTC?: number;
  basePay?: number;
  monthlySalary?: number;
  compensationRange?: {
    min?: number;
    max?: number;
    period?: 'monthly' | 'annual';
  };

  // Program Information
  programHighlights?: string[];
  notes?: string;

  // Compensation Extras
  hasBonus: boolean;
  bonusDescription?: string[];
  hasBenefits: boolean;
  benefitDetails?: string[];
  perks?: string[];

  // numberOfOpenings?: number;

  // Important Dates
  importantDates?: IImportantDate[];
  // applicationDeadline?: Date;

  // Listing Status
  isListingActive: boolean;
  jobPostingURL: string;
  jobSource: IJobSource;

  // Job Status
  status: IJobStatusTypes;
  statusHistory: IStatusHistoryItem[];

  // User Settings
  userId: Types.ObjectId;
  // Timestamps
  createdAt: Date;
  updatedAt: Date;
};

// JOB CREATION
export type CreateJobInput = Omit<
  IJob,
  '_id' | 'userId' | 'createdAt' | 'updatedAt'
>;

// Job Input after adding status
export type JobCreatePayload = CreateJobInput & {
  statusHistory: IStatusHistoryItem[];
};

// JOB UPDATION
export type UpdateJobInput = Partial<CreateJobInput>;

// JOB SWITCH STATUS
export type JobStatusSwitchInput = Pick<IJob, 'status'>;

export type JobStatusSwitchPayload = Pick<IJob, 'status' | 'statusHistory'>;

// Mongoose Hydrated Document (includes methods)
export type JobDocument = HydratedDocument<IJob>;

// JOB GET ALL JOBS DOCUMENT
export type JobSummaryDocument = Pick<
  JobDocument,
  | '_id'
  | 'companyName'
  | 'jobTitle'
  | 'employmentType'
  | 'workMode'
  | 'importantDates'
  // | 'applicationDeadline'
  | 'isListingActive'
  | 'jobSource'
  | 'status'
  | 'statusHistory'
  | 'updatedAt'
>;
