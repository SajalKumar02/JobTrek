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

/**
 * Updated getDefaultJobState follows prior logic (UI change only)
 */
const getDefaultJobState = (initialJobState) => ({
  companyName: initialJobState.companyName || '',
  officeAddress: initialJobState.officeAddress || '',

  jobTitle: initialJobState.jobTitle || '',
  description: initialJobState.description || '',
  requiredSkills: initialJobState.requiredSkills || [],
  employmentType:
    initialJobState.employmentType || employmentTypeOptions[0]?.value,
  workMode: initialJobState.workMode || workModeOptions[0]?.value,

  internshipDuration: initialJobState.internshipDuration || '',
  annualCTC: initialJobState.annualCTC ?? '',
  basePay: initialJobState.basePay ?? '',
  monthlySalary: initialJobState.monthlySalary ?? '',
  compensationRange: {
    min: initialJobState.compensationRange?.min ?? '',
    max: initialJobState.compensationRange?.max ?? '',
    period: initialJobState.compensationRange?.period ?? '',
  },

  programHighlights: initialJobState.programHighlights ?? [],
  notes: initialJobState.notes || '',

  hasBonus: !!initialJobState.hasBonus,
  hasBenefits: !!initialJobState.hasBenefits,
  perks: initialJobState.perks ?? [],

  isListingActive: !!initialJobState.isListingActive,
  jobPostingURL: initialJobState.jobPostingURL || '',
  jobSource: initialJobState.jobSource || '',

  status: initialJobState.status || statusOptions[0].value,
});

const inputBase =
  'w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-base font-normal text-slate-900 placeholder:text-slate-400 shadow-sm outline-none focus:border-indigo-600 focus:ring-2 focus:ring-indigo-100 transition-all';

const labelBase = 'mb-1 block text-sm font-medium text-gray-800';

const requiredMark = <span className="ml-0.5 text-rose-600">*</span>;

const SectionHeader = ({ icon: Icon, title, subtitle }) => (
  <div className="mb-5 flex items-center gap-3">
    <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-indigo-100 text-indigo-700">
      <Icon className="h-5 w-5" />
    </span>
    <div>
      <h3 className="text-base font-semibold text-gray-900">{title}</h3>
      {subtitle && <p className="text-xs text-gray-500">{subtitle}</p>}
    </div>
  </div>
);

const Divider = () => <div className="my-7 h-px w-full bg-slate-200" />;

const JobForm = ({ initialJobState, onSubmit, buttonTitle }) => {
  const [form, setForm] = useState(() => getDefaultJobState(initialJobState));
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

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    if (type === 'checkbox' && 'checked' in e.target) {
      setForm((prev) => ({ ...prev, [name]: e.target.checked }));
    } else if (type === 'number') {
      setForm((prev) => ({
        ...prev,
        [name]: value === '' ? '' : Number(value),
      }));
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  };

  // --- Important Dates
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

  // --- Bonus
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

  // --- Benefit
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

  // --- Program Highlights
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

  // --- Submit
  const handleSubmit = (e) => {
    e.preventDefault();
    // most recent date first
    const sortedImportantDates = importantDates
      .slice()
      .sort((a, b) => new Date(a.date) - new Date(b.date));

    const formData = {
      ...form,
      importantDates: sortedImportantDates,
      benefitDetails,
      programHighlights,
      bonusDescription,
    };

    onSubmit(formData);
    navigate('/jobs');
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-slate-100 max-w-2xl mx-auto">
      <JobFormHeader />

      <form
        className="flex flex-1 flex-col"
        onSubmit={handleSubmit}
        autoComplete="off"
      >
        <div className="flex-1 overflow-y-auto px-8 pt-6 pb-10">
          {/* Section 1: Company */}
          <section className="mb-8">
            <SectionHeader icon={Building2} title="Company" />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
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

          {/* Section 2: Role Details */}
          <section className="mb-8">
            <SectionHeader icon={Briefcase} title="Role Details" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                <label className={labelBase}>
                  Employment Type {requiredMark}
                </label>
                <select
                  name="employmentType"
                  value={form.employmentType}
                  onChange={handleChange}
                  className={`${inputBase} cursor-pointer`}
                  required
                >
                  {employmentTypeOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="grid grid-cols-1 gap-6 mt-6">
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
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                {form.employmentType === 'internship' && (
                  <div>
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
            </div>
          </section>

          <Divider />

          {/* Section 3: Compensation */}
          <section className="mb-8">
            <SectionHeader
              icon={IndianRupee}
              title="Compensation"
              subtitle="Optional but recommended"
            />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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
            <div className="mt-6">
              <label className={labelBase}>Program Highlights</label>
              <div className="flex flex-col gap-2">
                {programHighlights.length > 0 &&
                  programHighlights.map((highlight, idx) => (
                    <div key={idx} className="flex items-center gap-2">
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
                        className="group flex h-9 w-9 items-center justify-center rounded-full hover:bg-red-50 transition-colors"
                        aria-label="Remove highlight"
                      >
                        <X className="h-4 w-4 text-red-400 group-hover:text-red-600" />
                      </button>
                    </div>
                  ))}
                <button
                  type="button"
                  className="flex items-center w-fit gap-1.5 rounded-md border border-dashed border-indigo-300 px-3 py-2 text-xs font-medium text-indigo-600 hover:bg-indigo-50 mt-2"
                  onClick={handleAddProgramHighlight}
                >
                  <Plus className="h-4 w-4" />
                  Add Highlight
                </button>
              </div>
            </div>

            {/* Toggles */}
            <div className="mt-6 flex flex-wrap gap-3">
              <label
                htmlFor="hasBonus"
                className={`flex items-center gap-2 px-4 py-2 rounded-full border text-xs font-medium cursor-pointer transition ${
                  form.hasBonus
                    ? 'border-indigo-300 bg-indigo-50 text-indigo-700'
                    : 'border-slate-200 bg-slate-50 text-gray-500 hover:border-slate-300'
                }`}
              >
                <input
                  type="checkbox"
                  name="hasBonus"
                  checked={form.hasBonus}
                  onChange={handleChange}
                  id="hasBonus"
                  className="h-4 w-4 accent-indigo-600"
                />
                Bonus
              </label>
              <label
                htmlFor="hasBenefits"
                className={`flex items-center gap-2 px-4 py-2 rounded-full border text-xs font-medium cursor-pointer transition ${
                  form.hasBenefits
                    ? 'border-indigo-300 bg-indigo-50 text-indigo-700'
                    : 'border-slate-200 bg-slate-50 text-gray-500 hover:border-slate-300'
                }`}
              >
                <input
                  type="checkbox"
                  name="hasBenefits"
                  checked={form.hasBenefits}
                  onChange={handleChange}
                  id="hasBenefits"
                  className="h-4 w-4 accent-indigo-600"
                />
                Benefits
              </label>
              <label
                htmlFor="isListingActive"
                className={`flex items-center gap-2  px-4 py-2 rounded-full border text-xs font-medium cursor-pointer transition ${
                  form.isListingActive
                    ? 'border-emerald-300 bg-emerald-50 text-emerald-700'
                    : 'border-slate-200 bg-slate-50 text-gray-500 hover:border-slate-300'
                }`}
              >
                <input
                  type="checkbox"
                  name="isListingActive"
                  checked={form.isListingActive}
                  onChange={handleChange}
                  id="isListingActive"
                  className="h-4 w-4 accent-emerald-600"
                />
                Active
              </label>
            </div>

            {form.hasBonus && (
              <div className="mt-5">
                <label className={labelBase}>Bonus Details</label>
                <div className="flex flex-col gap-2">
                  {bonusDescription.length > 0 &&
                    bonusDescription.map((bonus, idx) => (
                      <div className="flex items-center gap-2" key={idx}>
                        <input
                          type="text"
                          placeholder="Bonus (e.g. Joining Bonus, Performance Bonus, etc.)"
                          value={bonus}
                          onChange={(e) =>
                            handleBonusChange(idx, e.target.value)
                          }
                          className={inputBase}
                        />
                        <button
                          type="button"
                          onClick={() => handleRemoveBonus(idx)}
                          className="group flex h-9 w-9 items-center justify-center rounded-full hover:bg-red-50 transition-colors"
                          aria-label="Remove bonus"
                        >
                          <X className="h-4 w-4 text-red-400 group-hover:text-red-600" />
                        </button>
                      </div>
                    ))}
                  <button
                    type="button"
                    onClick={handleAddBonus}
                    className="flex items-center w-fit gap-1.5 rounded-md border border-dashed border-indigo-300 px-3 py-2 text-xs font-medium text-indigo-600 hover:bg-indigo-50"
                  >
                    <Plus className="h-4 w-4" />
                    Add More Bonus
                  </button>
                </div>
              </div>
            )}
            {form.hasBenefits && (
              <div className="mt-5">
                <label className={labelBase}>Benefit Details</label>
                <div className="flex flex-col gap-2">
                  {benefitDetails.length > 0 &&
                    benefitDetails.map((benefit, idx) => (
                      <div className="flex items-center gap-2" key={idx}>
                        <input
                          type="text"
                          placeholder="Benefit (e.g. Health Insurance, Paid Leave, etc.)"
                          value={benefit}
                          onChange={(e) =>
                            handleBenefitChange(idx, e.target.value)
                          }
                          className={inputBase}
                        />
                        <button
                          type="button"
                          onClick={() => handleRemoveBenefitDetails(idx)}
                          className="group flex h-9 w-9 items-center justify-center rounded-full hover:bg-red-50 transition-colors"
                          aria-label="Remove benefit"
                        >
                          <X className="h-4 w-4 text-red-400 group-hover:text-red-600" />
                        </button>
                      </div>
                    ))}
                  <button
                    type="button"
                    onClick={handleAddBenefitDetails}
                    className="flex items-center w-fit gap-1.5 rounded-md border border-dashed border-indigo-300 px-3 py-2 text-xs font-medium text-indigo-600 hover:bg-indigo-50"
                  >
                    <Plus className="h-4 w-4" />
                    Add More Benefit
                  </button>
                </div>
              </div>
            )}
          </section>

          <Divider />

          {/* Section 4: Important Dates */}
          <section className="mb-8">
            <SectionHeader icon={CalendarDays} title="Important Dates" />
            <div className="flex flex-col gap-2">
              {importantDates.length > 0 &&
                importantDates.map((date, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    <input
                      type="text"
                      placeholder="Label (e.g. OA, Interview)"
                      value={date.label}
                      onChange={(e) =>
                        handleImportantDateChange(idx, 'label', e.target.value)
                      }
                      className={inputBase}
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
                      className={inputBase}
                    />
                    <button
                      type="button"
                      onClick={() => handleRemoveImportantDate(idx)}
                      className="group flex h-9 w-9 items-center justify-center rounded-full hover:bg-red-50 transition-colors"
                      aria-label="Remove date"
                    >
                      <X className="h-4 w-4 text-red-400 group-hover:text-red-600" />
                    </button>
                  </div>
                ))}

              <button
                type="button"
                onClick={handleAddImportantDate}
                className="flex items-center w-fit gap-1.5 rounded-md border border-dashed border-indigo-300 px-3 py-2 text-xs font-medium text-indigo-600 hover:bg-indigo-50 mt-2"
              >
                <Plus className="h-4 w-4" />
                Add Date
              </button>
            </div>
          </section>

          <Divider />

          {/* Section 5: Listing Info */}
          <section className="mb-8">
            <SectionHeader icon={Link2} title="Listing Info" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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

          {/* Section 6: Status & Notes */}
          <section>
            <SectionHeader icon={StickyNote} title="Status & Notes" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
        <div className="sticky bottom-0 flex items-center justify-end gap-3 border-t border-slate-100 px-8 py-5 bg-white">
          <button
            type="submit"
            className="rounded-md bg-indigo-600 px-6 py-2.5 text-base font-semibold text-white shadow-md hover:bg-indigo-700 transition-colors"
          >
            {buttonTitle}
          </button>
        </div>
      </form>
    </div>
  );
};

export default JobForm;
