import * as z from 'zod';
import { WorkMode, JobStatusType, EmployementType, JobSource } from '../Constants/job.Constants';

export const addJobValidator = z.object({
  // About Company
  companyName: z
    .string()
    .trim()
    .regex(/^[a-zA-Z0-9][a-zA-Z0-9\s\-&.',()]*$/, 'Company name contains invalid characters'),
  officeAddress: z.string().optional(),

  // About Job
  jobTitle: z.string(),
  description: z.string().optional(),
  employementType: z.enum(EmployementType).optional(),
  workMode: z.enum(WorkMode),

  // Internship Options
  internshipDuration: z.string().optional(),

  // Compensation Details
  annualCTC: z.number().optional(),
  basePay: z.number().optional(),
  monthlySalary: z.number().optional(),

  // Program Highlights
  programHighlights: z.string().optional(),

  // Compensation Extras
  hasBonus: z.boolean().optional(),
  bonusDescription: z.string().optional(),
  hasBenefits: z.boolean().optional(),
  benefitsDetails: z.array(z.string()).optional(),

  // Listing Status
  isListingOpen: z.boolean().optional(),
  jobPostingURL: z.string(),
  JobSource: z.string().optional(),

  // Important Dates
  importantDates: z
    .array(
      z.object({
        label: z.string(),
        date: z.coerce.date(),
      })
    )
    .optional(),

  // User Settings
  notes: z.string().optional(),

  // More on Job Details
  status: z.enum(JobStatusType),
  statusHistory: z.array(
    z.object({
      label: z.enum(JobStatusType),
      date: z.coerce.date(),
    })
  ),
});

export const changeJobStatusValidator = z.object({
  status: z.enum(JobStatusType),
});

// prettier-ignore
export const editJobValidator = addJobValidator
  .partial()
  .refine((data) => Object.keys(data).length > 0, {
    message: 'At least one field must be provided to update the job.',
    path: [],
  });
