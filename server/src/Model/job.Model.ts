import { Schema, model } from 'mongoose';

import { IJob } from '../Types/index';

import {
  WorkMode,
  JobStatusType,
  EmploymentType,
  JobSource,
} from '../Constants/job.Constants';

const jobSchema = new Schema<IJob>(
  {
    // About Company
    companyName: {
      type: String,
      required: true,
    },
    officeAddress: {
      type: String,
      required: false,
    },

    // About Job
    jobTitle: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: false,
    },
    requiredSkills: {
      type: [String],
      required: false,
    },

    employmentType: {
      type: String,
      enum: EmploymentType,
      default: 'fullTime',
      required: true,
    },
    workMode: {
      type: String,
      enum: WorkMode,
      default: 'onSite',
      required: true,
    },

    // Internship Options
    internshipDuration: {
      type: String,
      required: false,
    },

    // ---------------------------------------------------------

    // Compensation Details
    annualCTC: { type: Number, default: 0 },
    basePay: { type: Number, default: 0 },
    monthlySalary: { type: Number, default: 0 },
    compensationRange: {
      type: {
        min: { type: Number, min: 0 },
        max: { type: Number, min: 0 },
        period: { type: String, enum: ['monthly', 'annual'] },
      },
    },

    // Program Information
    programHighlights: [{ type: String }],

    // Compensation Extras
    hasBonus: { type: Boolean, default: false },
    bonusDescription: [{ type: String }],
    hasBenefits: { type: Boolean, default: false },
    benefitDetails: [{ type: String }],

    perks: [{ type: String }],

    // numberOfOpenings: {
    //   type: Number,
    //   default: 0,
    // },

    // applicationDeadline: {
    //   type: Date,
    // },

    // Listing Status
    isListingActive: { type: Boolean, default: true },
    jobPostingURL: { type: String, required: true },
    jobSource: { type: String, enum: JobSource },

    // Important Dates
    importantDates: [
      {
        label: { type: String },
        date: { type: Date },
      },
    ],

    // User Setting
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    notes: {
      type: String,
    },

    // Job Status
    status: {
      type: String,
      enum: JobStatusType,
      default: 'wishlist',
      lowercase: true,
      required: true,
    },
    statusHistory: [
      {
        label: { type: String, enum: JobStatusType, required: true },
        date: { type: Date },
      },
    ],
  },
  {
    timestamps: true,
  }
);

const JobModel = model<IJob>('Job', jobSchema);

export default JobModel;
