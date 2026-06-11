import * as z from 'zod';
import { JobLocation, JobStatusType, JobType } from '../Constants/job.Constants';

export const JobValidator = z.object({
  // About Company
  companyName: z.string(),
  officeAddress: z.string().optional(),

  // About Job
  jobRole: z.string(),
  description: z.string().optional(),
  jobType: z.enum(JobType),
  location: z.enum(JobLocation),

  // Miscellaneous
  ctc: z.number(),
  basePay: z.number(),
  monthlySalary: z.number(),
  bonusIncluded: z.boolean(),
  bonusDescription: z.string().optional(),
  benefits: z.boolean(),
  benefitsDetails: z.array(z.string()).optional(),
  isActive: z.boolean(),
  importantDates: z.array(
    z.object({
      label: z.string(),
      date: z.coerce.date(),
    }),
  ),
  // User Settings
  userId: z.uuid(),
  status: z.enum(JobStatusType),
  statusHistory: z.array(
    z.object({
      label: z.enum(JobStatusType),
      date: z.coerce.date(),
    }),
  ),
  notes: z.string().optional(),
});

export const addJobValidator = z.object({
  // About Company
  companyName: z.string(),
  officeAddress: z.string().optional(),

  // About Job
  jobRole: z.string(),
  description: z.string().optional(),
  jobType: z.enum(JobType),
  location: z.enum(JobLocation),

  // Miscellaneous
  ctc: z.number(),
  basePay: z.number(),
  monthlySalary: z.number(),
  bonusIncluded: z.boolean(),
  bonusDescription: z.string().optional(),
  benefits: z.boolean(),
  benefitsDetails: z.array(z.string()).optional(),
  isActive: z.boolean(),
  importantDates: z.array(
    z.object({
      label: z.string(),
      date: z.coerce.date(),
    }),
  ),
  // User Settings
  userId: z.uuid(),
  status: z.enum(JobStatusType),
  statusHistory: z.array(
    z.object({
      label: z.enum(JobStatusType),
      date: z.coerce.date(),
    }),
  ),
  notes: z.string().optional(),
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
    jobRole: z.string().optional(),
    description: z.string().optional(),
    jobType: z.enum(JobType).optional(),
    location: z.enum(JobLocation).optional(),

    // Miscellaneous
    ctc: z.number().optional(),
    basePay: z.number().optional(),
    monthlySalary: z.number().optional(),
    bonusIncluded: z.boolean().optional(),
    bonusDescription: z.string().optional(),
    benefits: z.boolean().optional(),
    benefitsDetails: z.array(z.string()).optional(),
    isActive: z.boolean().optional(),
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
