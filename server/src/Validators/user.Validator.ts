import * as z from 'zod';

export const UpdateUserEmailValidator = z.object({
  username: z
    .string()
    .min(3, 'Username too short')
    .max(30, 'Username too long')
    .regex(/^[a-zA-Z][a-zA-Z0-9_]+$/, 'Must start with a letter, no spaces'),
});
