import * as z from 'zod';
import { WorkMode, JobStatusType, EmployementType } from '../Constants/job.Constants';

export const JobValidator = z.object({
  // About Company
  companyName: z.string(),
  officeAddress: z.string().optional(),

  // About Job
  jobTitle: z.string(),
  description: z.string().optional(),
  employementType: z.enum(EmployementType),
  workMode: z.enum(WorkMode),

  // Compensation Details
  annualCTC: z.number(),
  basePay: z.number(),
  monthlySalary: z.number(),

  // Compensation Extras
  hasBonus: z.boolean(),
  bonusDescription: z.string().optional(),
  hasBenefits: z.boolean(),
  benefitsDetails: z.array(z.string()).optional(),

  isListingOpen: z.boolean().optional(),

  importantDates: z
    .array(
      z.object({
        label: z.string(),
        date: z.coerce.date(),
      })
    )
    .optional(),

  // User Settings
  userId: z.uuid(),
  status: z.enum(JobStatusType),
  statusHistory: z.array(
    z.object({
      label: z.enum(JobStatusType),
      date: z.coerce.date(),
    })
  ),
  notes: z.string().optional(),
});

export const addJobValidator = z.object({
  // About Company
  companyName: z.string(),
  officeAddress: z.string().optional(),

  // About Job
  jobTitle: z.string(),
  description: z.string().optional(),
  employementType: z.enum(EmployementType),
  workMode: z.enum(WorkMode).optional(),

  // Compensation Details
  annualCTC: z.number().optional(),
  basePay: z.number().optional(),
  monthlySalary: z.number().optional(),

  // Compensation Extras
  hasBonus: z.boolean().optional(),
  bonusDescription: z.string().optional(),
  hasBenefits: z.boolean().optional(),
  benefitsDetails: z.array(z.string()).optional(),

  // Listing Status
  isListingOpen: z.boolean().optional(),

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
export const editJobValidator = z.object({
    // About Company
    companyName: z
      .string()
      .trim()
      .regex(/^[a-zA-Z0-9][a-zA-Z0-9\s\-&.',()]*$/, 'Company name contains invalid characters')
      .optional(),
    officeAddress: z.string().optional(),

    // About Job
    jobTitle: z.string().optional(),
    description: z.string().optional(),
    employementType: z.enum(EmployementType).optional(),
    workMode: z.enum(WorkMode).optional(),

    // Compensation Details
    annualCTC: z.number().optional(),
    basePay: z.number().optional(),
    monthlySalary: z.number().optional(),

    // Compensation Extras
    hasBonus: z.boolean().optional(),
    bonusDescription: z.string().optional(),
    hasBenefits: z.boolean().optional(),
    benefitsDetails: z.array(z.string()).optional(),

    // Listing Status
    isListingOpen: z.boolean().optional(),

    // Important Dates
    importantDates: z
      .array(
        z.object({
          label: z.string(),
          date: z.coerce.date(),
        }),
      )
      .optional(),

    // User Settings
    status: z.enum(JobStatusType).optional(),
    statusHistory: z
      .array(
        z.object({
          label: z.enum(JobStatusType),
          date: z.coerce.date(),
        }),
      )
      .optional(),
    notes: z.string().optional(),
  }).refine((data) => Object.keys(data).length > 0, {
    message: 'At least one field must be provided to update the job.',
    path: [],
  });
