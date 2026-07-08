import { Schema, model } from 'mongoose';

import { IJob } from '../Types/index';

import { WorkMode, JobStatusType, EmployementType, JobSource } from '../Constants/job.Constants';

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
    },
    workMode: {
      type: String,
      enum: WorkMode,
      default: 'onSite',
      required: true,
    },

    // Internship Options
    internshipDuration: { type: String },

    // Compensation Details
    annualCTC: { type: Number, min: 0 },
    basePay: { type: Number, min: 0 },
    monthlySalary: { type: Number, min: 0 },

    // Program Information
    programHighlights: { type: String },

    // Compensation Extras
    hasBonus: { type: Boolean, default: false },
    bonusDescription: { type: String },
    hasBenefits: { type: Boolean, default: false },
    benefitsDetails: { type: [String], default: [] },

    // Listing Status
    isListingOpen: { type: Boolean, default: true },
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
