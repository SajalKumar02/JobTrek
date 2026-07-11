export const JOB_JD_PARSER_INPUT_STRUCTURE = {
  // About Company
  companyName: 'string',
  officeAddress: 'string',

  // About Job
  jobTitle: 'string',
  description: 'string',
  employementType: {
    type: 'string',
    enum: ['full time', 'internship', 'contract', 'freelancing', 'part time'],
  },
  workMode: { type: 'string', enum: ['remote', 'onSite', 'hybrid'] },

  // Internship Options
  internshipDuration: 'string',

  // Compensation Details
  annualCTC: 'number',
  basePay: 'number',
  monthlySalary: 'number',

  // Program Highlights
  programHighlights: 'string',

  // Compensation Extras
  hasBonus: 'boolean',
  bonusDescription: 'string',
  hasBenefits: 'boolean',
  benefitsDetails: 'string',

  // Listing Status
  isListingOpen: 'boolean',
  // jobPostingURL: "string",
  // jobSource: IJobSource,

  // Important Dates
  importantDates: [
    {
      label: 'string',
      date: 'Date',
    },
  ],

  // User Settings
  notes: 'string',

  // Job Status
  status: 'wishlist',
};
