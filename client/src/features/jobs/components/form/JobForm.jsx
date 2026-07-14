import { useState } from 'react';
import { useNavigate } from 'react-router';

import {
  employmentTypeOptions,
  workModeOptions,
  statusOptions,
  jobSourceOptions,
} from '@/features/jobs/constants';

import {
  Building2,
  Briefcase,
  IndianRupee,
  CalendarDays,
  Link2,
  StickyNote,
  Plus,
  X,
} from 'lucide-react';

import JobFormHeader from '@/features/jobs/components/form/JobFormHeader';

const getDefaultJobState = (initialJobState) => ({
  companyName: initialJobState.companyName || '',
  officeAddress: initialJobState.officeAddress || '',
  jobTitle: initialJobState.jobTitle || '',
  description: initialJobState.description || '',
  employmentType:
    initialJobState.employmentType || employmentTypeOptions[0]?.value || '',
  workMode: initialJobState.workMode || workModeOptions[0]?.value || '',
  internshipDuration: initialJobState.internshipDuration || '',
  annualCTC: initialJobState.annualCTC ?? '',
  basePay: initialJobState.basePay ?? '',
  monthlySalary: initialJobState.monthlySalary ?? '',
  // Booleans
  hasBonus: !!initialJobState.hasBonus,
  hasBenefits: !!initialJobState.hasBenefits,
  isListingActive:
    'isListingActive' in initialJobState
      ? !!initialJobState.isListingActive
      : true,
  jobPostingURL: initialJobState.jobPostingURL || '',
  jobSource: initialJobState.jobSource || '',
  status: initialJobState.status || statusOptions[0]?.value || '',
  notes: initialJobState.notes || '',
});

const inputBase =
  'w-full rounded-lg border border-slate-200 bg-slate-50/60 px-3.5 py-2.5 text-sm text-slate-800 placeholder:text-slate-400 outline-none transition-all duration-150 focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-500/10';

const labelBase = 'mb-1.5 block text-[13px] font-medium text-slate-700';

const requiredMark = <span className="ml-0.5 text-rose-500">*</span>;

const SectionHeader = ({ icon: Icon, title, subtitle }) => (
  <div className="mb-4 flex items-center gap-2.5">
    <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-50 text-indigo-600">
      <Icon className="h-4 w-4" />
    </span>
    <div>
      <h3 className="text-sm font-semibold text-slate-800">{title}</h3>
      {subtitle && <p className="text-xs text-slate-400">{subtitle}</p>}
    </div>
  </div>
);

const Divider = () => <div className="mb-7 h-px w-full bg-slate-200" />;

const JobForm = ({ initialJobState, onSubmit, buttonTitle }) => {
  const [form, setForm] = useState(() => getDefaultJobState(initialJobState));

  // ----------------------------------------------------------------------------------------------------------------------------------------------------------------------
  const [importantDates, setImportantDates] = useState(
    initialJobState.importantDates ?? []
  );
  const [benefitDetails, setBenefitDetails] = useState(
    initialJobState.benefitDetails ?? []
  );
  const [bonusDescription, setBonusDescription] = useState(
    initialJobState.bonusDescription ?? []
  );
  const [programHighlights, setProgramHighlights] = useState(
    initialJobState.programHighlights ?? []
  );
  // ----------------------------------------------------------------------------------------------------------------------------------------------------------------------

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    if (type === 'checkbox' && 'checked' in e.target) {
      const checked = e.target.checked;
      setForm((prev) => ({ ...prev, [name]: checked }));
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  };

  // ----------------------------------------------------------------------------------------------------------------------------------------------------------------------
  // Date Functions
  const handleImportantDateChange = (idx, field, value) => {
    setImportantDates((prev) =>
      prev.map((date, i) => (i === idx ? { ...date, [field]: value } : date))
    );
  };
  const handleAddImportantDate = () => {
    setImportantDates((prev) => [
      ...prev,
      {
        label: '',
        date: '',
      },
    ]);
  };
  const handleRemoveImportantDate = (idx) => {
    setImportantDates((prev) => prev.filter((_, i) => i !== idx));
  };

  // Bonus Functions
  const handleBonusChange = (index, value) => {
    setBonusDescription((prev) =>
      prev.map((bonus, i) => (i === index ? value : bonus))
    );
  };
  const handleAddBonus = () => {
    setBonusDescription((prev) => [...prev, '']);
  };
  const handleRemoveBonus = (index) => {
    setBonusDescription((prev) => prev.filter((_, i) => i !== index));
  };

  // Benefit Functions
  const handleBenefitChange = (index, value) => {
    setBenefitDetails((prev) =>
      prev.map((benefit, i) => (i === index ? value : benefit))
    );
  };
  const handleAddBenefitDetails = () => {
    setBenefitDetails((prev) => [...prev, '']);
  };
  const handleRemoveBenefitDetails = (index) => {
    setBenefitDetails((prev) => prev.filter((_, i) => i !== index));
  };

  // Program Highlights Functions
  const handleProgramHighlightChange = (index, value) => {
    setProgramHighlights((prev) =>
      prev.map((highlight, i) => (i === index ? value : highlight))
    );
  };
  const handleAddProgramHighlight = () => {
    setProgramHighlights((prev) => [...prev, '']);
  };
  const handleRemoveProgramHighlight = (index) => {
    setProgramHighlights((prev) => prev.filter((_, i) => i !== index));
  };

  // ----------------------------------------------------------------------------------------------------------------------------------------------------------------------
  // Form Functions
  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = {
      ...form,
      importantDates,
      benefitDetails,
      programHighlights,
      bonusDescription,
    };

    console.log(formData);

    onSubmit(formData);
    navigate('/jobs');
  };

  return (
    <div>
      {/* Header */}
      <JobFormHeader />

      {/* Scrollable body */}
      <form
        className="flex flex-1 flex-col overflow-hidden"
        onSubmit={handleSubmit}
      >
        <div className="flex-1 overflow-y-auto px-6 py-6">
          {/* About Company */}
          <section className="mb-7">
            <SectionHeader icon={Building2} title="Company" />
            {/* Company Name & Office Address */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label className={labelBase}>Company Name {requiredMark}</label>
                <input
                  type="text"
                  name="companyName"
                  value={form.companyName}
                  onChange={handleChange}
                  required
                  placeholder="e.g. Acme Corp"
                  className={inputBase}
                />
              </div>
              <div>
                <label className={labelBase}>Office Address</label>
                <input
                  type="text"
                  name="officeAddress"
                  value={form.officeAddress}
                  onChange={handleChange}
                  placeholder="City, State"
                  className={inputBase}
                />
              </div>
            </div>
          </section>

          <Divider />

          {/* Job details */}
          <section className="mb-7">
            <SectionHeader icon={Briefcase} title="Role Details" />
            <div className="space-y-4">
              {/* Job Title & Description */}
              <div>
                <label className={labelBase}>Job Title {requiredMark}</label>
                <input
                  type="text"
                  name="jobTitle"
                  value={form.jobTitle}
                  onChange={handleChange}
                  required
                  placeholder="e.g. Frontend Developer"
                  className={inputBase}
                />
              </div>
              <div>
                <label className={labelBase}>Description</label>
                <textarea
                  name="description"
                  value={form.description}
                  onChange={handleChange}
                  rows={3}
                  placeholder="Role summary, responsibilities, tech stack..."
                  className={`${inputBase} resize-none`}
                />
              </div>

              {/* Employment Type & Work Mode */}
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label className={labelBase}>
                    Employment Type {requiredMark}
                  </label>
                  <select
                    name="employmentType"
                    value={form.employmentType}
                    onChange={handleChange}
                    className={`${inputBase} cursor-pointer`}
                  >
                    {employmentTypeOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className={labelBase}>Work Mode {requiredMark}</label>
                  <select
                    name="workMode"
                    value={form.workMode}
                    onChange={handleChange}
                    required
                    className={`${inputBase} cursor-pointer`}
                  >
                    {workModeOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Internship Options */}
              {form.employmentType === 'internship' && (
                <div className="rounded-lg border border-indigo-100 bg-indigo-50/50 p-3.5">
                  <label className={labelBase}>Internship Duration</label>
                  <input
                    type="text"
                    name="internshipDuration"
                    value={form.internshipDuration}
                    onChange={handleChange}
                    placeholder="e.g. 6 months"
                    className={inputBase}
                  />
                </div>
              )}
            </div>
          </section>

          <Divider />

          {/* Compensation */}
          <section className="mb-7">
            <SectionHeader
              icon={IndianRupee}
              title="Compensation"
              subtitle="Optional but recommended"
            />
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              <div>
                <label className={labelBase}>Annual CTC</label>
                <input
                  type="number"
                  min="0"
                  name="annualCTC"
                  value={
                    form.annualCTC === null || form.annualCTC === undefined
                      ? ''
                      : form.annualCTC
                  }
                  onChange={handleChange}
                  placeholder="0"
                  className={inputBase}
                  step="any"
                />
              </div>
              <div>
                <label className={labelBase}>Base Pay</label>
                <input
                  type="number"
                  min="0"
                  name="basePay"
                  value={
                    form.basePay === null || form.basePay === undefined
                      ? ''
                      : form.basePay
                  }
                  onChange={handleChange}
                  placeholder="0"
                  className={inputBase}
                  step="any"
                />
              </div>
              <div>
                <label className={labelBase}>Monthly Salary</label>
                <input
                  type="number"
                  min="0"
                  name="monthlySalary"
                  value={
                    form.monthlySalary === null ||
                    form.monthlySalary === undefined
                      ? ''
                      : form.monthlySalary
                  }
                  onChange={handleChange}
                  placeholder="0"
                  className={inputBase}
                  step="any"
                />
              </div>
            </div>

            {/* Program Information */}
            <div className="mt-4">
              <label className={labelBase}>Program Highlights</label>
              {programHighlights.length > 0 &&
                programHighlights.map((highlight, idx) => (
                  <div key={idx} className="flex items-center gap-2 mb-2">
                    <input
                      type="text"
                      name={`programHighlights-${idx}`}
                      value={highlight}
                      onChange={(e) =>
                        handleProgramHighlightChange(idx, e.target.value)
                      }
                      placeholder="e.g. Mentorship, PPO conversion, stipend perks..."
                      className={inputBase}
                    />
                    <button
                      type="button"
                      onClick={() => handleRemoveProgramHighlight(idx)}
                      className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md text-rose-500 transition-colors hover:bg-rose-50 cursor-pointer"
                      aria-label="Remove highlight"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                ))}
              <button
                type="button"
                className="mt-1 flex items-center gap-1.5 rounded-lg border border-dashed border-indigo-200 px-3 py-2 text-xs font-medium text-indigo-600 transition-colors hover:bg-indigo-50 cursor-pointer"
                onClick={handleAddProgramHighlight}
              >
                <Plus className="h-3.5 w-3.5" />
                Add Highlight
              </button>
            </div>

            {/* Toggle pills - hasBonus, hasBenefits, isListingActive */}
            <div className="mt-4 flex flex-wrap gap-2">
              <label
                htmlFor="hasBonus"
                className={`flex cursor-pointer items-center gap-2 rounded-full border px-3.5 py-1.5 text-xs font-medium transition-colors ${
                  form.hasBonus
                    ? 'border-indigo-200 bg-indigo-50 text-indigo-700'
                    : 'border-slate-200 bg-white text-slate-500 hover:border-slate-300'
                }`}
              >
                <input
                  type="checkbox"
                  name="hasBonus"
                  checked={form.hasBonus}
                  onChange={handleChange}
                  id="hasBonus"
                  className="h-3.5 w-3.5 accent-indigo-600"
                />
                Bonus Included
              </label>
              <label
                htmlFor="hasBenefits"
                className={`flex cursor-pointer items-center gap-2 rounded-full border px-3.5 py-1.5 text-xs font-medium transition-colors ${
                  form.hasBenefits
                    ? 'border-indigo-200 bg-indigo-50 text-indigo-700'
                    : 'border-slate-200 bg-white text-slate-500 hover:border-slate-300'
                }`}
              >
                <input
                  type="checkbox"
                  name="hasBenefits"
                  checked={form.hasBenefits}
                  onChange={handleChange}
                  id="hasBenefits"
                  className="h-3.5 w-3.5 accent-indigo-600"
                />
                Benefit Included
              </label>
              <label
                htmlFor="isListingActive"
                className={`flex cursor-pointer items-center gap-2 rounded-full border px-3.5 py-1.5 text-xs font-medium transition-colors ${
                  form.isListingActive
                    ? 'border-emerald-200 bg-emerald-50 text-emerald-700'
                    : 'border-slate-200 bg-white text-slate-500 hover:border-slate-300'
                }`}
              >
                <input
                  type="checkbox"
                  name="isListingActive"
                  checked={form.isListingActive}
                  onChange={handleChange}
                  id="isListingActive"
                  className="h-3.5 w-3.5 accent-emerald-600"
                />
                Listing Active
              </label>
            </div>

            {/* Compensation Extras */}
            {form.hasBonus && (
              <div className="mt-3">
                <label className={labelBase}>Bonus Details</label>
                <div className="space-y-2">
                  {bonusDescription.length > 0 &&
                    bonusDescription.map((bonus, idx) => (
                      <div
                        className="flex items-center gap-2 rounded-lg border border-slate-200 bg-slate-50/60 p-2"
                        key={idx}
                      >
                        <input
                          type="text"
                          placeholder="Bonus (e.g. Joining Bonus, Performance Bonus, etc.)"
                          value={bonus}
                          onChange={(e) =>
                            handleBonusChange(idx, e.target.value)
                          }
                          className={`${inputBase} bg-white`}
                        />
                        <button
                          type="button"
                          onClick={() => {
                            setForm(() => handleRemoveBonus(idx));
                          }}
                          className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md text-rose-500 transition-colors hover:bg-rose-50 cursor-pointer"
                          aria-label="Remove bonus"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      </div>
                    ))}
                </div>

                <button
                  type="button"
                  onClick={handleAddBonus}
                  className="flex items-center gap-1.5 rounded-lg border border-dashed border-indigo-200 px-3 py-2 text-xs font-medium text-indigo-600 transition-colors hover:bg-indigo-50 cursor-pointer"
                >
                  <Plus className="h-3.5 w-3.5" />
                  Add More Bonus
                </button>
              </div>
            )}
            {form.hasBenefits && (
              <div className="mt-3">
                <label className={labelBase}>Benefit Details</label>
                <div className="space-y-2">
                  {benefitDetails.length > 0 &&
                    benefitDetails.map((benefit, idx) => (
                      <div
                        className="flex items-center gap-2 rounded-lg border border-slate-200 bg-slate-50/60 p-2"
                        key={idx}
                      >
                        <input
                          type="text"
                          placeholder="Benefit (e.g. Health Insurance, Paid Leave, etc.)"
                          value={benefit}
                          onChange={(e) =>
                            handleBenefitChange(idx, e.target.value)
                          }
                          className={`${inputBase} bg-white`}
                        />
                        <button
                          type="button"
                          onClick={() => handleRemoveBenefitDetails(idx)}
                          className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md text-rose-500 transition-colors hover:bg-rose-50 cursor-pointer"
                          aria-label="Remove benefit"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      </div>
                    ))}
                </div>

                <button
                  type="button"
                  onClick={handleAddBenefitDetails}
                  className="flex items-center gap-1.5 rounded-lg border border-dashed border-indigo-200 px-3 py-2 text-xs font-medium text-indigo-600 transition-colors hover:bg-indigo-50 cursor-pointer"
                >
                  <Plus className="h-3.5 w-3.5" />
                  Add More Benefit
                </button>
              </div>
            )}
          </section>

          <Divider />

          {/* Important Dates */}
          <section className="mb-7">
            <SectionHeader icon={CalendarDays} title="Important Dates" />
            <div className="space-y-2">
              {importantDates.length > 0 &&
                importantDates.map((date, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-2 rounded-lg border border-slate-200 bg-slate-50/60 p-2"
                  >
                    <input
                      type="text"
                      placeholder="Label (e.g. OA, Interview)"
                      value={date.label}
                      onChange={(e) =>
                        handleImportantDateChange(idx, 'label', e.target.value)
                      }
                      className={`${inputBase} bg-white`}
                    />
                    <input
                      type="date"
                      value={
                        date.date
                          ? new Date(date.date).toISOString().slice(0, 10)
                          : ''
                      }
                      onChange={(e) =>
                        handleImportantDateChange(idx, 'date', e.target.value)
                      }
                      className={`${inputBase} bg-white`}
                    />
                    <button
                      type="button"
                      onClick={() => handleRemoveImportantDate(idx)}
                      className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md text-rose-500 transition-colors hover:bg-rose-50 cursor-pointer"
                      aria-label="Remove date"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                ))}

              <button
                type="button"
                onClick={handleAddImportantDate}
                className="flex items-center gap-1.5 rounded-lg border border-dashed border-indigo-200 px-3 py-2 text-xs font-medium text-indigo-600 transition-colors hover:bg-indigo-50 cursor-pointer"
              >
                <Plus className="h-3.5 w-3.5" />
                Add Date
              </button>
            </div>
          </section>

          <Divider />

          {/* Job Posting URL & Job Source */}
          <section className="mb-7">
            <SectionHeader icon={Link2} title="Listing Info" />
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label className={labelBase}>
                  Job Posting URL {requiredMark}
                </label>
                <input
                  type="text"
                  name="jobPostingURL"
                  value={form.jobPostingURL}
                  onChange={handleChange}
                  required
                  placeholder="https://..."
                  className={inputBase}
                />
              </div>
              <div>
                <label className={labelBase}>Job Source {requiredMark}</label>
                <select
                  name="jobSource"
                  value={form.jobSource}
                  onChange={handleChange}
                  className={`${inputBase} cursor-pointer`}
                  required
                >
                  <option value="" disabled>
                    Select job source...
                  </option>
                  {jobSourceOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </section>

          <Divider />

          {/* Status & Notes */}
          <section>
            <SectionHeader icon={StickyNote} title="Status & Notes" />
            <div className="space-y-4">
              <div>
                <label className={labelBase}>Status {requiredMark}</label>
                <select
                  name="status"
                  value={form.status}
                  onChange={handleChange}
                  className={`${inputBase} cursor-pointer`}
                >
                  {statusOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className={labelBase}>Notes</label>
                <textarea
                  name="notes"
                  value={form.notes}
                  onChange={handleChange}
                  rows={3}
                  placeholder="Anything else worth remembering..."
                  className={`${inputBase} resize-none`}
                />
              </div>
            </div>
          </section>
        </div>

        {/* Sticky footer */}
        <div className="flex items-center justify-end gap-3 border-t border-slate-100 px-6 py-4">
          <button
            type="submit"
            className="rounded-lg bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm shadow-indigo-600/25 transition-colors hover:bg-indigo-700 cursor-pointer"
          >
            {buttonTitle}
          </button>
        </div>
      </form>
    </div>
  );
};

export default JobForm;
