import { IEmploymentType, IImportantDate, IWorkMode } from './job.types';

export type IAIJobParsed = {
  // About Company
  companyName: string;
  officeAddress?: string;

  // About Job
  jobTitle: string;
  description?: string;
  employementType: IEmploymentType;
  workMode: IWorkMode;

  // Internship Options
  internshipDuration?: string;

  // Compensation Details
  annualCTC?: number;
  basePay?: number;
  monthlySalary?: number;

  // Program Highlights
  programHighlights: string;

  // Compensation Extras
  hasBonus: boolean;
  bonusDescription?: string;
  hasBenefits: boolean;
  benefitsDetails?: string[];

  importantDates: IImportantDate[];
};

export type IAIJobParsedDraft = Partial<IAIJobParsed>;
