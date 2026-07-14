import z from 'zod';
import { addJobValidator } from './job.Validator';

export const AIJDJobInput = z.object({
  jdUserInput: z
    .string()
    .min(1, { message: 'Job Description input is required.' }),
});

export const AIResponseJobValidator = addJobValidator
  .omit({
    status: true,
    statusHistory: true,
    notes: true,
    jobSource: true,
    jobPostingURL: true,
    isListingActive: true,
  })
  .partial();
