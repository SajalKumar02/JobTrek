export const employmentTypeOptions = [
  { label: 'Full Time', value: 'fullTime' },
  { label: 'Internship', value: 'internship' },
  { label: 'Contract', value: 'contract' },
  { label: 'Freelancing', value: 'freelancing' },
  { label: 'Part Time', value: 'partTime' },
];

export const workModeOptions = [
  { label: 'On Site', value: 'onSite' },
  { label: 'Remote', value: 'remote' },
  { label: 'Hybrid', value: 'hybrid' },
];

export const statusOptions = [
  { order: 1, label: 'Wishlist', value: 'wishlist' },
  { order: 2, label: 'Applied', value: 'applied' },
  { order: 3, label: 'OA', value: 'oa' },
  { order: 4, label: 'Interview', value: 'interview' },
  { order: 5, label: 'Offer', value: 'offer' },
  { order: 6, label: 'Rejected', value: 'rejected' },
];

export const jobSourceOptions = [
  { label: 'LinkedIn', value: 'linkedIn' },
  { label: 'Unstop', value: 'unstop' },
  { label: 'Internshala', value: 'internshala' },
  { label: 'Naukri', value: 'naukri' },
  { label: 'Other', value: 'other' },
];

export const filterOptions = [
  { label: 'All', value: 'all' },
  ...employmentTypeOptions,
];

export const initialJobState = {
  companyName: '',
  jobTitle: '',

  officeAddress: '',
  description: '',
  internshipDuration: '',

  annualCTC: 0,
  basePay: 0,
  monthlySalary: 0,
  compensationRange: {
    min: 0,
    max: 0,
    period: 'annual',
  },

  isListingActive: true,
  hasBonus: false,
  hasBenefits: false,

  numberOfOpenings: 0,
  applicationDeadline: '',

  jobPostingURL: '',
  notes: '',

  employmentType: employmentTypeOptions[0].value,
  workMode: workModeOptions[0].value,
  jobSource: '',
  status: 'wishlist',

  requiredSkills: [],
  programHighlights: [],
  bonusDescription: [],
  benefitDetails: [],
  perks: [],

  importantDates: [],
  statusHistory: [],
};
