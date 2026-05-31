export const jobTypeOptions = [
    { label: 'Full Time', value: 'full time' },
    { label: 'Internship', value: 'internship' },
    { label: 'Contract', value: 'contract' },
    { label: 'Freelancing', value: 'freelancing' },
    { label: 'Part Time', value: 'part time' },
];

export const locationOptions = [
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

export const filterOptions = [
    { label: 'All', value: 'all' },
    ...jobTypeOptions
];

export const initialStateJob = {
    // About Company
    companyName: '',
    officeAddress: '',
    // About Job
    jobRole: '',
    description: '',
    jobType: 'full time',
    location: 'onSite',

    // Miscellaneous
    ctc: '',
    basePay: '',
    monthlySalary: '',
    bonusIncluded: false,
    bonusDescription: '',
    benefits: false,
    benefitsDetails: [],
    isActive: true,
    importantDates: [],

    // User Setting
    status: 'wishlist',
    notes: '',
};