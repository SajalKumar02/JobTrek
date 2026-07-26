import { CreateJobInput } from './job.types';

export type AIJobParsed = Omit<
  CreateJobInput,
  | 'status'
  | 'statusHistory'
  | 'notes'
  | 'jobSource'
  | 'jobPostingURL'
  | 'isListingActive'
>;

export type AIJobParsedDraft = Partial<AIJobParsed>;
