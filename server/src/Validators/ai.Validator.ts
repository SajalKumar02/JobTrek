import z from 'zod';

export const aiJDInputValidator = z.object({
  jdUserInput: z
    .string()
    .min(1, { message: 'Job Description input is required.' }),
});
