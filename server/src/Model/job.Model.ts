import { Schema, model } from 'mongoose';

import { IJob } from '../Types/index';

import { WorkMode, JobStatusType, EmployementType } from '../Constants/job.Constants';

const jobSchema = new Schema<IJob>(
  {
    // About Company
    companyName: { type: String, required: true },
    officeAddress: { type: String },

    // About Job
    jobTitle: { type: String, required: true },
    description: { type: String },
    employementType: {
      type: String,
      enum: EmployementType,
      lowercase: true,
      required: true,
    },
    workMode: {
      type: String,
      enum: WorkMode,
      default: 'onSite',
      required: true,
    },

    // Compensation Details
    annualCTC: { type: Number, min: 0 },
    basePay: { type: Number, min: 0 },
    monthlySalary: { type: Number, min: 0 },

    // Compensation Extras
    hasBonus: { type: Boolean, default: false },
    bonusDescription: { type: String },
    hasBenefits: { type: Boolean, default: false },
    benefitsDetails: { type: [String] },

    // Listing Status
    isListingOpen: { type: Boolean, default: true },

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
