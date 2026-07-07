export const employementTypeOptions = [
  { label: 'Full Time', value: 'full time' },
  { label: 'Internship', value: 'internship' },
  { label: 'Contract', value: 'contract' },
  { label: 'Freelancing', value: 'freelancing' },
  { label: 'Part Time', value: 'part time' },
];

export const workModeOptions = [
  { label: 'Remote', value: 'remote' },
  { label: 'On Site', value: 'onSite' },
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

export const filterOptions = [{ label: 'All', value: 'all' }, ...employementTypeOptions];

export const initialStateJob = {
  // About Company
  companyName: '',
  officeAddress: '',
  // About Job
  jobTitle: '',
  description: '',
  employementType: 'full time',
  workMode: 'onSite',
  // Miscellaneous
  annualCTC: 0,
  basePay: 0,
  monthlySalary: 0,
  hasBonus: false,
  bonusDescription: '',

  hasBenefits: false,
  benefitsDetails: [],

  isListingActive: true,

  importantDates: [],

  // User Setting
  status: 'wishlist',
  statusHistory: [],

  notes: '',
};
