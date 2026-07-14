export const JOB_JD_PARSER_INPUT_STRUCTURE = {
  // About Company
  companyName: { type: String },
  officeAddress: { type: String },

  // About Job
  jobTitle: { type: String },
  description: { type: String },
  requiredSkills: { type: [String] },
  employmentType: {
    type: String,
    enum: ['fullTime', 'internship', 'contract', 'freelancing', 'partTime'],
  },
  workMode: { type: String, enum: ['remote', 'onSite', 'hybrid'] },

  // Internship Options
  internshipDuration: { type: String, example: '5 months' },

  // Compenstation Details
  annualCTC: { type: Number, example: 1200000 },
  basePay: { type: Number, example: 100000 },
  monthlySalary: { type: Number, example: 80000 },
  compensationRange: {
    type: 'object',
    properties: {
      min: { type: Number, example: 10000 },
      max: { type: Number, example: 20000 },
      period: { type: String, enum: ['monthly', 'annual'], example: 'monthly' },
    },
  },

  // Compensation Extras
  hasBonus: { type: Boolean, default: false },
  bonusDescription: { type: [String] },
  hasBenefits: { type: Boolean, default: false },
  benefitDetails: { type: [String] },
  perks: { type: [String] },

  numberOfOpenings: { type: Number },

  // Important Dates
  importantDates: {
    type: [
      {
        label: { type: String },
        date: { type: Date },
      },
    ],
  },
  applicationDeadline: { type: Date },
};
