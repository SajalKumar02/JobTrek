import { useEffect, useState } from 'react';
import { useParams } from 'react-router';

import { ArrowLeft, Pencil, Save, Plus } from 'lucide-react';

import {
  employmentTypeOptions,
  workModeOptions,
  statusOptions,
  initialStateJob,
} from '@/features/jobs';

import { useJobs } from '@/features/jobs';
import { useToast } from '@/features/toast';
import { jobSourceOptions } from '@/features/jobs/constants';

// Reusable input component with label, error, helpText support, all styles
function FormField({
  label,
  children,
  helpText,
  error = '',
  className = '',
  required = false,
  ...props
}) {
  return (
    <div className={`flex flex-col gap-1 ${className}`} {...props}>
      {label && (
        <label className="text-sm font-medium text-slate-700 mb-1">
          {label}
          {required && <span className="ml-1 text-red-500">*</span>}
        </label>
      )}
      {children}
      {helpText && <small className="text-xs text-slate-500">{helpText}</small>}
      {error && <span className="text-xs text-red-500">{error}</span>}
    </div>
  );
}

const JobView = () => {
  const { jobId } = useParams();

  const { fetchJobByID, updateJob } = useJobs();
  const { showToast } = useToast();

  const [form, setForm] = useState(initialStateJob);
  const [editing, setEditing] = useState(false);

  useEffect(() => {
    const fetchJob = async () => {
      if (!jobId) {
        return;
      }
      try {
        const response = await fetchJobByID(jobId);
        setForm({
          ...initialStateJob,
          ...response.job,
        });
      } catch (error) {
        showToast('error', error.response.data.message);
        setForm(initialStateJob);
      }
    };

    fetchJob();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [jobId]);

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      const data = await updateJob(jobId, form);
      showToast('success', data.message);
    } catch (error) {
      showToast('error', error.response.data.message);
    } finally {
      setEditing(false);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => {
      let newValue;
      if (type === 'checkbox') {
        newValue = checked;
      } else if (type === 'number') {
        newValue = value === '' ? '' : Number(value);
      } else {
        newValue = value ?? '';
      }
      return { ...prev, [name]: newValue };
    });
  };

  const handleBenefitDetailsChange = (e) => {
    setForm((prev) => ({
      ...prev,
      benefitDetails: e.target.value
        ? e.target.value.split(',').map((item) => item.trim())
        : [],
    }));
  };

  const handleImportantDateChange = (idx, field, value) => {
    setForm((prev) => {
      const updatedDates = (
        Array.isArray(prev.importantDates) ? prev.importantDates : []
      ).map((d, i) =>
        i === idx
          ? {
              ...d,
              [field]: value ?? '',
            }
          : d
      );
      return { ...prev, importantDates: updatedDates };
    });
  };

  const handleAddImportantDate = () => {
    setForm((prev) => ({
      ...prev,
      importantDates: Array.isArray(prev.importantDates)
        ? [...prev.importantDates, { label: '', date: '' }]
        : [{ label: '', date: '' }],
    }));
  };

  return (
    <div className="flex justify-center min-h-screen bg-linear-to-br from-slate-100 to-white">
      <div className="w-full max-w-2xl md:max-w-3xl lg:max-w-4xl px-3 py-4">
        {/* Sticky header bar with actions */}
        <div className="sticky top-0 z-20 bg-white/90 rounded-b-xl shadow flex justify-between items-center px-4 py-3 mb-6 border border-slate-100">
          <button
            onClick={() => window.history.back()}
            className="flex items-center gap-2 px-3 py-2 rounded-md border border-slate-200 bg-white text-slate-700 font-semibold shadow-sm transition hover:bg-slate-100 hover:shadow hover:text-blue-700 focus:ring-2 focus:ring-blue-200"
          >
            <ArrowLeft size={18} />
            Back
          </button>
          {!editing ? (
            <button
              onClick={() => setEditing(true)}
              className="flex items-center gap-2 px-4 py-2 rounded-md border border-blue-600 bg-blue-600 text-white font-semibold shadow hover:bg-blue-700 hover:border-blue-800 focus:ring-2 focus:ring-blue-200"
            >
              <Pencil size={20} />
              Edit
            </button>
          ) : (
            <button
              onClick={handleSave}
              type="submit"
              className="flex items-center gap-2 px-4 py-2 rounded-md border border-green-600 bg-green-600 text-white font-semibold shadow hover:bg-green-700 hover:border-green-800 focus:ring-2 focus:ring-green-200"
            >
              <Save size={20} />
              Save
            </button>
          )}
        </div>

        <div className="bg-white rounded-2xl shadow-xl px-6 sm:px-8 py-8">
          <h2 className="text-3xl font-bold text-center text-slate-900 mb-7 tracking-tight">
            Job Details
          </h2>

          <form className="space-y-6" onSubmit={handleSave}>
            {/* --- About Company Section --- */}
            <div>
              <h3 className="text-lg font-semibold text-blue-700 mb-2">
                Company Information
              </h3>
              <div className="grid md:grid-cols-2 gap-6">
                <FormField label="Company Name" required>
                  <input
                    name="companyName"
                    value={form.companyName || ''}
                    onChange={handleChange}
                    className="input"
                    required
                    disabled={!editing}
                  />
                </FormField>
                <FormField label="Office Address">
                  <input
                    name="officeAddress"
                    value={form.officeAddress || ''}
                    onChange={handleChange}
                    className="input"
                    disabled={!editing}
                  />
                </FormField>
              </div>
            </div>

            {/* --- Job Details Section --- */}
            <div>
              <h3 className="text-lg font-semibold text-blue-700 mb-2">
                Job Overview
              </h3>
              <div className="grid md:grid-cols-2 gap-6">
                <FormField label="Job Title" required>
                  <input
                    name="jobTitle"
                    value={form.jobTitle || ''}
                    onChange={handleChange}
                    className="input"
                    required
                    disabled={!editing}
                  />
                </FormField>
                <FormField label="Employment Type" required>
                  <select
                    name="employmentType"
                    value={form.employmentType || ''}
                    onChange={handleChange}
                    className="input"
                    required
                    disabled={!editing}
                  >
                    <option value="" disabled>
                      Select job type
                    </option>
                    {employmentTypeOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </FormField>
                <FormField label="Work Mode" required>
                  <select
                    name="workMode"
                    value={form.workMode || ''}
                    onChange={handleChange}
                    className="input"
                    required
                    disabled={!editing}
                  >
                    <option value="" disabled>
                      Select work mode
                    </option>
                    {workModeOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </FormField>
                <FormField label="Status" required>
                  <select
                    name="status"
                    value={form.status || ''}
                    onChange={handleChange}
                    className="input"
                    required
                    disabled={!editing}
                  >
                    <option value="" disabled>
                      Select status
                    </option>
                    {statusOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </FormField>
              </div>
              {/* Internship Option */}
              {form.employmentType === 'internship' && (
                <div className="md:w-1/2 mt-4">
                  <FormField label="Internship Duration">
                    <input
                      type="text"
                      name="internshipDuration"
                      value={form.internshipDuration || ''}
                      onChange={handleChange}
                      className="input"
                      disabled={!editing}
                      placeholder="e.g. 6 months"
                    />
                  </FormField>
                </div>
              )}
            </div>

            <div>
              <FormField label="Description">
                <textarea
                  name="description"
                  value={form.description || ''}
                  onChange={handleChange}
                  className="input h-24"
                  rows={4}
                  disabled={!editing}
                  placeholder="Job description and responsibilities"
                />
              </FormField>
            </div>

            {/* --- Compensation Section --- */}
            <div>
              <h3 className="text-lg font-semibold text-blue-700 mb-2">
                Compensation
              </h3>
              <div className="grid md:grid-cols-3 gap-6">
                <FormField label="Base Pay">
                  <input
                    type="number"
                    name="basePay"
                    value={form.basePay}
                    onChange={handleChange}
                    className="input"
                    min={0}
                    disabled={!editing}
                  />
                </FormField>
                <FormField label="Monthly Salary">
                  <input
                    type="number"
                    name="monthlySalary"
                    value={form.monthlySalary}
                    onChange={handleChange}
                    className="input"
                    min={0}
                    disabled={!editing}
                  />
                </FormField>
                <FormField label="Annual CTC">
                  <input
                    type="number"
                    name="annualCTC"
                    value={form.annualCTC}
                    onChange={handleChange}
                    className="input"
                    min={0}
                    disabled={!editing}
                  />
                </FormField>
              </div>
              <div className="grid md:grid-cols-2 gap-6 mt-5">
                <FormField label="Program Highlights">
                  <input
                    type="text"
                    name="programHighlights"
                    value={form.programHighlights}
                    onChange={handleChange}
                    className="input"
                    disabled={!editing}
                  />
                </FormField>
                <FormField
                  label={
                    <span className="flex items-center gap-1">
                      Bonus Included
                      <input
                        type="checkbox"
                        name="hasBonus"
                        checked={form.hasBonus}
                        onChange={handleChange}
                        className="ml-2 accent-green-600 h-4 w-4"
                        disabled={!editing}
                      />
                    </span>
                  }
                >
                  {form.hasBonus && (
                    <input
                      name="bonusDescription"
                      value={form.bonusDescription}
                      onChange={handleChange}
                      className="input mt-2"
                      disabled={!editing}
                      placeholder="Bonus description"
                    />
                  )}
                </FormField>
                <FormField
                  label={
                    <span className="flex items-center gap-1">
                      Has Benefits
                      <input
                        type="checkbox"
                        name="hasBenefits"
                        checked={form.hasBenefits}
                        onChange={handleChange}
                        className="ml-2 accent-blue-600 h-4 w-4"
                        disabled={!editing}
                      />
                    </span>
                  }
                >
                  {form.hasBenefits && (
                    <input
                      name="benefitDetails"
                      value={
                        Array.isArray(form.benefitDetails)
                          ? form.benefitDetails.join(', ')
                          : ''
                      }
                      onChange={handleBenefitDetailsChange}
                      className="input mt-2"
                      placeholder="e.g. Health Insurance, Gym Membership"
                      disabled={!editing}
                    />
                  )}
                </FormField>
              </div>
            </div>

            {/* --- Listing and Source Section --- */}
            <div>
              <h3 className="text-lg font-semibold text-blue-700 mb-2">
                Listing &amp; Sourcing
              </h3>
              <div className="grid md:grid-cols-2 gap-6">
                <FormField
                  label={
                    <span className="flex items-center gap-1">
                      Is Listing Active
                      <input
                        type="checkbox"
                        name="isListingActive"
                        checked={form.isListingActive}
                        onChange={handleChange}
                        className="ml-2 accent-blue-600 h-4 w-4"
                        disabled={!editing}
                      />
                    </span>
                  }
                  className=""
                >
                  {/* nothing extra needed, toggle only */}
                </FormField>
                <FormField label="Job Posting URL">
                  <input
                    type="text"
                    name="jobPostingURL"
                    value={form.jobPostingURL}
                    onChange={handleChange}
                    className="input"
                    disabled={!editing}
                    placeholder="Job Posting Link"
                  />
                </FormField>
                <FormField label="Job Source" required>
                  <select
                    name="jobSource"
                    value={form.jobSource}
                    onChange={handleChange}
                    className="input"
                    disabled={!editing}
                    required
                  >
                    <option value="" disabled>
                      Select job source
                    </option>
                    {jobSourceOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </FormField>
              </div>
            </div>

            {/* --- Important Dates Section --- */}
            <div>
              <h3 className="text-lg font-semibold text-blue-700 mb-2 flex items-center">
                Important Dates
                {editing && (
                  <button
                    type="button"
                    className="ml-2 inline-flex items-center gap-2 text-sm font-medium px-2 py-1 rounded-md border border-blue-500 bg-blue-500 text-white shadow hover:bg-blue-600 transition"
                    onClick={handleAddImportantDate}
                  >
                    <Plus size={16} />
                    Add
                  </button>
                )}
              </h3>
              {Array.isArray(form.importantDates) &&
              form.importantDates.length > 0 ? (
                <div className="flex flex-col gap-2">
                  {form.importantDates.map((d, idx) => (
                    <div
                      key={idx}
                      className="flex flex-col sm:flex-row gap-2 items-stretch"
                    >
                      <input
                        name={`importantDatesLabel${idx}`}
                        value={d.label ?? ''}
                        onChange={(e) =>
                          handleImportantDateChange(
                            idx,
                            'label',
                            e.target.value ?? ''
                          )
                        }
                        className="input flex-1"
                        placeholder="Label"
                        disabled={!editing}
                      />
                      <input
                        name={`importantDatesDate${idx}`}
                        value={d.date ? d.date.toString().substring(0, 10) : ''}
                        onChange={(e) =>
                          handleImportantDateChange(
                            idx,
                            'date',
                            e.target.value ?? ''
                          )
                        }
                        className="input flex-1"
                        type="date"
                        disabled={!editing}
                      />
                    </div>
                  ))}
                </div>
              ) : (
                <span className="text-slate-400 text-sm ml-1">None</span>
              )}
            </div>

            {/* --- Notes Section --- */}
            <div>
              <FormField label="Notes">
                <textarea
                  name="notes"
                  value={form.notes}
                  onChange={handleChange}
                  className="input h-16"
                  rows={2}
                  disabled={!editing}
                  placeholder="Add notes here..."
                />
              </FormField>
            </div>

            {/* --- Save button at bottom in editing mode for convenience --- */}
            {editing && (
              <div className="flex justify-end pt-4">
                <button
                  type="submit"
                  className="inline-flex items-center gap-2 px-6 py-2 rounded-lg border border-green-600 bg-green-600 text-white font-semibold shadow hover:bg-green-700 hover:border-green-800 focus:ring-2 focus:ring-green-200 transition"
                >
                  <Save size={20} />
                  Save Changes
                </button>
              </div>
            )}
          </form>
        </div>
      </div>
      <style>
        {`
        .input {
          @apply border border-slate-300 rounded px-3 py-2 w-full bg-white text-slate-900 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-100 focus:bg-blue-50 transition disabled:bg-slate-100 disabled:text-slate-400;
        }
      `}
      </style>
    </div>
  );
};

export default JobView;
