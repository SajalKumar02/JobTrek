import { CreateJobInput } from './job.types';

export interface AIJobParsed extends Omit<
  CreateJobInput,
  | 'status'
  | 'statusHistory'
  | 'notes'
  | 'jobSource'
  | 'jobPostingURL'
  | 'isListingActive'
> {}

export interface AIJobParsedDraft extends Partial<AIJobParsed> {}
