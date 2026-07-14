import * as z from 'zod';
import {
  WorkMode,
  JobStatusType,
  EmploymentType,
  JobSource,
} from '../Constants/job.Constants';

export const addJobValidator = z.object({
  // About Company
  companyName: z
    .string()
    .trim()
    .regex(
      /^[a-zA-Z0-9][a-zA-Z0-9\s\-&.',()]*$/,
      'Company name contains invalid characters'
    ),
  officeAddress: z.string().optional(),

  // About Job
  jobTitle: z.string(),
  description: z.string().optional(),
  requiredSkills: z.array(z.string()).optional(),
  employmentType: z.enum(EmploymentType),
  workMode: z.enum(WorkMode),

  // Internship Options
  internshipDuration: z.string().optional(),

  // Compensation Details
  annualCTC: z.number().optional(),
  basePay: z.number().optional(),
  monthlySalary: z.number().optional(),
  compensationRange: z
    .object({
      min: z.number().optional(),
      max: z.number().optional(),
      period: z.enum(['monthly', 'annual']).optional(),
    })
    .optional(),

  // Program Highlights
  programHighlights: z.array(z.string()).optional(),
  notes: z.string().optional(),

  // Compensation Extras
  hasBonus: z.boolean().optional(),
  bonusDescription: z.string().optional(),
  hasBenefits: z.boolean().optional(),
  benefitDetails: z
    .array(
      z.object({
        benefit: z.string(),
      })
    )
    .optional(),
  perks: z.array(z.string()).optional(),

  numberOfOpenings: z.number().optional(),

  // Important Dates
  importantDates: z
    .array(
      z.object({
        label: z.string(),
        date: z.coerce.date(),
      })
    )
    .optional(),
  applicationDeadline: z.coerce.date().optional(),

  // Listing Status
  isListingActive: z.boolean().optional(),
  jobPostingURL: z.string(),
  jobSource: z.enum(JobSource),

  // More on Job Details
  status: z.enum(JobStatusType),
  statusHistory: z.array(
    z.object({
      label: z.enum(JobStatusType),
      date: z.coerce.date(),
    })
  ),
});

export const editJobValidator = addJobValidator.partial();

export const switchJobValidator = z.object({
  status: z.enum(JobStatusType),
});
