export const JOB_JD_PARSER_INPUT_STRUCTURE = {
  // About Company
  companyName: { type: 'string', required: true },
  officeAddress: { type: 'string', required: false },

  // About Job
  jobTitle: { type: 'string', required: true },
  description: { type: 'string', required: false },
  requiredSkills: { type: 'array', items: { type: 'string' }, required: false },

  employmentType: {
    type: 'string',
    enum: ['fullTime', 'internship', 'contract', 'freelancing', 'partTime'],
    default: 'fullTime',
    required: true,
  },
  workMode: {
    type: 'string',
    enum: ['onSite', 'remote', 'hybrid'],
    default: 'onSite',
    required: true,
  },

  // Internship Options
  internshipDuration: { type: 'string', required: false },

  // Compensation Details
  annualCTC: { type: 'number', default: 0 },
  basePay: { type: 'number', default: 0 },
  monthlySalary: { type: 'number', default: 0 },
  // compensationRange: {
  //   type: 'object',
  //   properties: {
  //     min: { type: 'number', min: 0 },
  //     max: { type: 'number', min: 0 },
  //     period: { type: 'string', enum: ['monthly', 'annual'] },
  //   },
  //   required: false,
  // },

  // Program Information
  programHighlights: {
    type: 'array',
    items: { type: 'string' },
    required: false,
  },

  // Compensation Extras
  hasBonus: { type: 'boolean', default: false },
  bonusDescription: {
    type: 'array',
    items: { type: 'string' },
    required: false,
  },
  hasBenefits: { type: 'boolean', default: false },
  benefitDetails: { type: 'array', items: { type: 'string' }, required: false },

  perks: { type: 'array', items: { type: 'string' }, required: false },

  // numberOfOpenings: { type: 'number', default: 0 },

  // applicationDeadline: { type: 'string', format: 'date-time', required: false },

  // Listing Status
  isListingActive: { type: 'boolean', default: true },
  // jobPostingURL: { type: 'string', required: true },
  // jobSource: {
  //   type: 'string',
  //   enum: ['linkedin', 'naukri', 'companyWebsite', 'referral', 'user', 'other'],
  //   required: false,
  // },

  // Important Dates
  importantDates: {
    type: 'array',
    items: {
      type: 'object',
      properties: {
        label: { type: 'string' },
        date: { type: 'string', format: 'date-time' },
      },
    },
    required: false,
  },

  // User Setting
  // userId: { type: 'string', required: true }, // MongoDB ObjectId as string
  notes: { type: 'string', required: false },

  // Job Status
  status: {
    type: 'string',
    enum: ['wishlist', 'applied', 'oa', 'interview', 'offer', 'rejected'],
    default: 'wishlist',
    required: true,
  },
};
