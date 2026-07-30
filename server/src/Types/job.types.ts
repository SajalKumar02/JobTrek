import { HydratedDocument, Types } from 'mongoose';

// -------------------------------------------------------
// Constant Values
export interface IEmploymentTypeMap {
  fullTime: 'fullTime';
  internship: 'internship';
  contract: 'contract';
  freelancing: 'freelancing';
  partTime: 'partTime';
}
export type IEmploymentType =
  | IEmploymentTypeMap['fullTime']
  | IEmploymentTypeMap['internship']
  | IEmploymentTypeMap['contract']
  | IEmploymentTypeMap['freelancing']
  | IEmploymentTypeMap['partTime'];

export interface IWorkModeMap {
  remote: 'remote';
  onSite: 'onSite';
  hybrid: 'hybrid';
}
export type IWorkMode =
  | IWorkModeMap['remote']
  | IWorkModeMap['onSite']
  | IWorkModeMap['hybrid'];

export interface IJobStatusTypesMap {
  wishlist: 'wishlist';
  applied: 'applied';
  oa: 'oa';
  interview: 'interview';
  offer: 'offer';
  rejected: 'rejected';
}
export type IJobStatusTypes =
  | IJobStatusTypesMap['wishlist']
  | IJobStatusTypesMap['applied']
  | IJobStatusTypesMap['oa']
  | IJobStatusTypesMap['interview']
  | IJobStatusTypesMap['offer']
  | IJobStatusTypesMap['rejected'];

export interface IJobSourceMap {
  linkedIn: 'linkedIn';
  unstop: 'unstop';
  internshala: 'internshala';
  naukri: 'naukri';
  other: 'other';
}
export type IJobSource =
  | IJobSourceMap['linkedIn']
  | IJobSourceMap['unstop']
  | IJobSourceMap['internshala']
  | IJobSourceMap['naukri']
  | IJobSourceMap['other'];

// -------------------------------------------------------
// Heirarichal Structure
export interface IImportantDate {
  label?: string;
  date?: Date;
}

export interface IStatusHistoryItem {
  label: IJobStatusTypes;
  date: Date;
}

// -------------------------------------------------------
// Complete Structure
export interface ICompensationRange {
  min?: number;
  max?: number;
  period?: 'monthly' | 'annual';
}

export interface IJob {
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
  compensationRange?: ICompensationRange;

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
}

// JOB CREATION
export interface CreateJobInput extends Omit<
  IJob,
  '_id' | 'userId' | 'createdAt' | 'updatedAt'
> {}

// Job Input after adding status
export interface JobCreatePayload extends CreateJobInput {
  statusHistory: IStatusHistoryItem[];
}

// JOB UPDATION
export interface UpdateJobInput extends Partial<CreateJobInput> {}

// JOB SWITCH STATUS
export interface JobStatusSwitchInput extends Pick<IJob, 'status'> {}

export interface JobStatusSwitchPayload extends Pick<
  IJob,
  'status' | 'statusHistory'
> {}

// Mongoose Hydrated Document (includes methods)
export interface JobDocument extends HydratedDocument<IJob> {}

// JOB GET ALL JOBS DOCUMENT
export interface JobSummaryDocument extends Pick<
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
> {}
