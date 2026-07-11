import { useState } from 'react';
import { useNavigate } from 'react-router';

// prettier-ignore
import {
  employementTypeOptions,
  workModeOptions,
  statusOptions,
  jobSourceOptions
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
  ArrowLeft,
} from 'lucide-react';

import JobFormHeader from '@/features/jobs/components/form/JobFormHeader';

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

const JobForm = ({ initialJobState, onSubmit, buttonTitle }) => {
  const [form, setForm] = useState(() => ({ ...initialJobState }));
  const [importantDates, setImportantDates] = useState(
    (initialJobState.importantDates ?? []).map((d) => ({
      ...d,
      id: d._id || d.id,
    }))
  );

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

  const handleImportantDateChange = (key, field, value) => {
    setImportantDates((prev) =>
      prev.map((date) =>
        (date._id || date.id) === key ? { ...date, [field]: value } : date
      )
    );
  };

  const handleAddImportantDate = () => {
    setImportantDates((prev) => [
      ...prev,
      {
        id: crypto.randomUUID(),
        label: '',
        date: '',
      },
    ]);
  };

  const handleRemoveImportantDate = (key) => {
    setImportantDates((prev) => prev.filter((a) => (a._id || a.id) !== key));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ ...form, importantDates });
    navigate('/jobs');
  };

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <div className="p-3">
      {/* Back Button */}
      <button
        type="button"
        onClick={handleBack}
        className="mb-4 ml-3 flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-indigo-600 transition-colors"
      >
        <ArrowLeft className="h-4 w-4" />
        Back
      </button>
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

          <div className="mb-7 h-px w-full bg-slate-100" />

          {/* Job details */}
          <section className="mb-7">
            <SectionHeader icon={Briefcase} title="Role Details" />
            <div className="space-y-4">
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

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label className={labelBase}>
                    Employment Type {requiredMark}
                  </label>
                  <select
                    name="employementType"
                    value={form.employementType}
                    onChange={handleChange}
                    className={`${inputBase} cursor-pointer`}
                  >
                    {employementTypeOptions.map((option) => (
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
              {form.employementType === 'internship' && (
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

          <div className="mb-7 h-px w-full bg-slate-100" />

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
                  value={form.annualCTC}
                  onChange={handleChange}
                  placeholder="0"
                  className={inputBase}
                />
              </div>
              <div>
                <label className={labelBase}>Base Pay</label>
                <input
                  type="number"
                  min="0"
                  name="basePay"
                  value={form.basePay}
                  onChange={handleChange}
                  placeholder="0"
                  className={inputBase}
                />
              </div>
              <div>
                <label className={labelBase}>Monthly Salary</label>
                <input
                  type="number"
                  min="0"
                  name="monthlySalary"
                  value={form.monthlySalary}
                  onChange={handleChange}
                  placeholder="0"
                  className={inputBase}
                />
              </div>
            </div>

            {/* Program Information */}
            <div className="mt-4">
              <label className={labelBase}>
                Program Highlights {requiredMark}
              </label>
              <input
                type="text"
                name="programHighlights"
                value={form.programHighlights}
                onChange={handleChange}
                placeholder="Mentorship, PPO conversion, stipend perks..."
                className={inputBase}
              />
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
                Benefits Included
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
                <label className={labelBase}>Bonus Description</label>
                <input
                  type="text"
                  name="bonusDescription"
                  value={form.bonusDescription}
                  onChange={handleChange}
                  placeholder="Joining bonus, performance bonus..."
                  className={inputBase}
                />
              </div>
            )}
            {form.hasBenefits && (
              <div className="mt-3">
                <label className={labelBase}>Benefits Details</label>
                <div className="space-y-2">
                  {(form.benefitsDetails && form.benefitsDetails.length > 0
                    ? form.benefitsDetails
                    : ['']
                  ).map((benefit, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                      <input
                        type="text"
                        name={`benefitsDetails_${idx}`}
                        value={benefit}
                        onChange={(e) => {
                          const newValue = e.target.value;
                          setForm((prev) => {
                            const newBenefits = [
                              ...(prev.benefitsDetails || []),
                            ];
                            newBenefits[idx] = newValue;
                            return { ...prev, benefitsDetails: newBenefits };
                          });
                        }}
                        placeholder="e.g. Health insurance, Gym membership"
                        className={inputBase}
                      />
                      {form.benefitsDetails.length > 1 && (
                        <button
                          type="button"
                          onClick={() => {
                            setForm((prev) => {
                              const newBenefits = [
                                ...(prev.benefitsDetails || []),
                              ];
                              newBenefits.splice(idx, 1);
                              return { ...prev, benefitsDetails: newBenefits };
                            });
                          }}
                          className="text-rose-500 hover:bg-rose-50 rounded p-1"
                          aria-label="Remove benefit"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      )}
                    </div>
                  ))}
                  <button
                    type="button"
                    className="mt-1 flex items-center gap-1 text-xs text-indigo-600 hover:text-indigo-800"
                    onClick={() =>
                      setForm((prev) => ({
                        ...prev,
                        benefitsDetails: [...(prev.benefitsDetails || []), ''],
                      }))
                    }
                  >
                    <Plus className="h-4 w-4" /> Add another benefit
                  </button>
                </div>
              </div>
            )}
          </section>

          <div className="mb-7 h-px w-full bg-slate-100" />

          {/* Important Dates */}
          <section className="mb-7">
            <SectionHeader icon={CalendarDays} title="Important Dates" />
            <div className="space-y-2">
              {importantDates.length > 0 &&
                importantDates.map((date) => (
                  <div
                    key={date._id || date.id}
                    className="flex items-center gap-2 rounded-lg border border-slate-200 bg-slate-50/60 p-2"
                  >
                    <input
                      type="text"
                      placeholder="Label (e.g. OA, Interview)"
                      value={date.label}
                      onChange={(e) =>
                        handleImportantDateChange(
                          date._id || date.id,
                          'label',
                          e.target.value
                        )
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
                        handleImportantDateChange(
                          date._id || date.id,
                          'date',
                          e.target.value
                        )
                      }
                      className={`${inputBase} bg-white`}
                    />
                    <button
                      type="button"
                      onClick={() =>
                        handleRemoveImportantDate(date._id || date.id)
                      }
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

          <div className="mb-7 h-px w-full bg-slate-100" />

          {/* Listing Status */}
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

          <div className="mb-7 h-px w-full bg-slate-100" />

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
        <div className="flex items-center justify-end gap-3 border-t border-slate-100 bg-white px-6 py-4">
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
