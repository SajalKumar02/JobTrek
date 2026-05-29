import { useEffect, useState } from 'react';
import { useParams } from 'react-router';

import { ArrowLeft, Pencil, Save } from 'lucide-react';

import { useJobs } from '../features/jobs/hooks/useJobs';

import {
  jobTypeOptions,
  locationOptions,
  statusOptions,
  initialStateJob,
} from '../features/jobs/types/contants';

import { useToast } from '../features/toast/hooks/useToast';

const JobView = () => {
  const { jobId } = useParams();
  const { fetchJobViaId, updateJob } = useJobs();
  const { showToast } = useToast();

  const [form, setForm] = useState(initialStateJob);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const [editing, setEditing] = useState(false);

  useEffect(() => {
    const fetchJob = async () => {
      setLoading(true);
      setError('');
      try {
        if (jobId) {
          const fetchedJob = await fetchJobViaId(jobId);
          setForm(fetchedJob || initialStateJob);
        } else {
          setError('Job ID not found in URL.');
        }
      } catch {
        showToast('warning', 'Could not fetch job details.');

        setForm(initialStateJob);
      } finally {
        setLoading(false);
      }
    };

    fetchJob();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [jobId]);

  const handleSave = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const { result } = await updateJob(jobId, form);
      setForm(result);
      setEditing(false);
    } catch {
      showToast('warning', 'Job Updating Failed');
      setError('Could not update job.');
    } finally {
      showToast('success', 'Job Updated Successfully');
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleBenefitsDetailsChange = (e) => {
    setForm((prev) => ({
      ...prev,
      benefitsDetails: e.target.value.split(',').map((item) => item.trim()),
    }));
  };

  const handleImportantDateChange = (idx, field, value) => {
    setForm((prev) => {
      const updatedDates = (prev.importantDates || []).map((d, i) =>
        i === idx ? { ...d, [field]: value } : d,
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

  if (error) {
    return;
  }

  return (
    <div className="grid px-2 pb-4">
      {/* Bar with Back and Edit/Save buttons */}
      <div className="flex justify-between items-center mb-8">
        <button
          onClick={() => window.history.back()}
          className="flex items-center gap-2 px-4 py-2 rounded border border-gray-300 bg-gray-50 text-gray-700 cursor-pointer hover:bg-gray-100 hover:text-gray-900 transition font-medium"
        >
          <ArrowLeft size={18} />
          Back
        </button>
        {!editing ? (
          <button
            onClick={() => setEditing(true)}
            className="flex items-center gap-2 px-4 py-2 rounded border border-blue-600 bg-blue-600 text-white cursor-pointer font-medium shadow-sm hover:bg-blue-700 hover:border-blue-700 transition"
          >
            <Pencil size={18} />
            Edit
          </button>
        ) : (
          <button
            onClick={handleSave}
            type="submit"
            className="flex items-center gap-2 px-4 py-2 rounded border border-green-600 bg-green-600 text-white cursor-pointer font-medium shadow-sm hover:bg-green-700 hover:border-green-700 transition"
          >
            <Save size={18} />
            Save
          </button>
        )}
      </div>

      {/* Header */}
      <div className="bg-white rounded-lg shadow-md p-8 min-w-2xl mx-auto">
        <h2 className="text-2xl text-center font-bold text-gray-900 mb-6">
          Job Details
        </h2>

        {/* FORM */}
        <form className="space-y-3" onSubmit={handleSave}>
          <div>
            <label className="font-semibold text-gray-700 block">
              Company Name:
            </label>
            <input
              name="companyName"
              value={form.companyName || ''}
              onChange={handleChange}
              className="border rounded px-2 py-1 w-full"
              required
              disabled={!editing}
            />
          </div>
          <div>
            <label className="font-semibold text-gray-700 block">
              Job Role:
            </label>
            <input
              name="jobRole"
              value={form.jobRole || ''}
              onChange={handleChange}
              className="border rounded px-2 py-1 w-full"
              required
              disabled={!editing}
            />
          </div>
          <div>
            <label className="font-semibold text-gray-700 block">
              Description:
            </label>
            <textarea
              name="description"
              value={form.description || ''}
              onChange={handleChange}
              className="border rounded px-2 py-1 w-full"
              rows={4}
              disabled={!editing}
            />
          </div>
          <div>
            <label className="font-semibold text-gray-700 block">
              Job Type:
            </label>
            <select
              name="jobType"
              value={form.jobType || ''}
              onChange={handleChange}
              className="border rounded px-2 py-1 w-full"
              required
              disabled={!editing}
            >
              <option value="" disabled>
                Select job type
              </option>
              {jobTypeOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="font-semibold text-gray-700 block">
              Location:
            </label>
            <select
              name="location"
              value={form.location || ''}
              onChange={handleChange}
              className="border rounded px-2 py-1 w-full"
              required
              disabled={!editing}
            >
              <option value="" disabled>
                Select location
              </option>
              {locationOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="font-semibold text-gray-700 block">
              Office Address:
            </label>
            <input
              name="officeAddress"
              value={form.officeAddress || ''}
              onChange={handleChange}
              className="border rounded px-2 py-1 w-full"
              disabled={!editing}
            />
          </div>
          <div>
            <label className="font-semibold text-gray-700 block">Status:</label>
            <select
              name="status"
              value={form.status || ''}
              onChange={handleChange}
              className="border rounded px-2 py-1 w-full"
              disabled={!editing}
              required
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
          </div>

          <div>
            <label className="font-semibold text-gray-700 block">
              Base Pay:
            </label>
            <input
              type="number"
              name="basePay"
              value={form.basePay ?? ''}
              onChange={handleChange}
              className="border rounded px-2 py-1 w-full"
              min={0}
              disabled={!editing}
            />
          </div>
          <div>
            <label className="font-semibold text-gray-700 block">
              Monthly Salary:
            </label>
            <input
              type="number"
              name="monthlySalary"
              value={form.monthlySalary ?? ''}
              onChange={handleChange}
              className="border rounded px-2 py-1 w-full"
              min={0}
              disabled={!editing}
            />
          </div>
          <div>
            <label className="font-semibold text-gray-700 block">CTC:</label>
            <input
              type="number"
              name="ctc"
              value={form.ctc ?? ''}
              onChange={handleChange}
              className="border rounded px-2 py-1 w-full"
              min={0}
              disabled={!editing}
            />
          </div>
          <div>
            <label className="font-semibold text-gray-700 block mr-2">
              Bonus Included:
            </label>
            <input
              type="checkbox"
              name="bonusIncluded"
              checked={!!form.bonusIncluded}
              onChange={handleChange}
              className="mr-2"
              disabled={!editing}
            />
          </div>
          {form.bonusIncluded && (
            <div>
              <label className="font-semibold text-gray-700 block">
                Bonus Description:
              </label>
              <input
                name="bonusDescription"
                value={form.bonusDescription || ''}
                onChange={handleChange}
                className="border rounded px-2 py-1 w-full"
                disabled={!editing}
              />
            </div>
          )}
          <div>
            <label className="font-semibold text-gray-700 block mr-2">
              Benefits:
            </label>
            <input
              type="checkbox"
              name="benefits"
              checked={!!form.benefits}
              onChange={handleChange}
              className="mr-2"
              disabled={!editing}
            />
          </div>
          {form.benefits && (
            <div>
              <label className="font-semibold text-gray-700 block">
                Benefits Details (comma separated):
              </label>
              <input
                name="benefitsDetails"
                value={
                  Array.isArray(form.benefitsDetails)
                    ? form.benefitsDetails.join(', ')
                    : ''
                }
                onChange={handleBenefitsDetailsChange}
                className="border rounded px-2 py-1 w-full"
                placeholder="e.g. Health Insurance, Gym Membership"
                disabled={!editing}
              />
            </div>
          )}
          <div>
            <label className="font-semibold text-gray-700 block mr-2">
              Active:
            </label>
            <input
              type="checkbox"
              name="isActive"
              checked={form.isActive}
              onChange={handleChange}
              className="mr-2"
              disabled={!editing}
            />
          </div>
          <div>
            <label className="font-semibold text-gray-700 block">Notes:</label>
            <textarea
              name="notes"
              value={form.notes || ''}
              onChange={handleChange}
              className="border rounded px-2 py-1 w-full"
              rows={2}
              disabled={!editing}
            />
          </div>
          <div>
            <label className="font-semibold text-gray-700 block">
              Important Dates:
            </label>
            {Array.isArray(form.importantDates) &&
            form.importantDates.length > 0 ? (
              form.importantDates.map((d, idx) => (
                <div key={idx} className="flex items-center gap-2 mb-1">
                  <input
                    name={`importantDatesLabel${idx}`}
                    value={d.label || ''}
                    onChange={(e) =>
                      handleImportantDateChange(idx, 'label', e.target.value)
                    }
                    className="border rounded px-2 py-1 flex-1"
                    placeholder="Label"
                    disabled={!editing}
                  />
                  <input
                    name={`importantDatesDate${idx}`}
                    value={d.date ? d.date.toString().substring(0, 10) : ''}
                    onChange={(e) =>
                      handleImportantDateChange(idx, 'date', e.target.value)
                    }
                    className="border rounded px-2 py-1 flex-1"
                    type="date"
                    disabled={!editing}
                  />
                </div>
              ))
            ) : (
              <span className="text-gray-400 text-sm ml-1">None</span>
            )}
            {editing && (
              <div className="flex gap-3 mt-2">
                <button
                  type="button"
                  className="px-3 py-1 border border-blue-500 rounded bg-blue-500 text-white font-medium hover:bg-blue-600 transition"
                  onClick={() => handleAddImportantDate()}
                >
                  + Add Important Date
                </button>
                <button
                  type="submit"
                  className="px-3 py-1 border border-green-600 rounded bg-green-600 text-white font-medium hover:bg-green-700 transition"
                  onClick={handleSave}
                >
                  Save
                </button>
              </div>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default JobView;
