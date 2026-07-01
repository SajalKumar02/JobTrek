import { useEffect, useState } from 'react';

import { X } from 'lucide-react';

import { useJobs } from '@/features/jobs/context/useJobs';

import { jobTypeOptions, locationOptions, statusOptions } from '@/features/jobs/constants';

import { useToast } from '@/features/toast';

const initialForm = {
  companyName: '',
  officeAddress: '',
  jobRole: '',
  description: '',
  jobType: 'full time',
  location: 'onSite',
  ctc: '',
  basePay: '',
  monthlySalary: '',
  bonusIncluded: false,
  bonusDescription: '',
  benefits: false,
  benefitsDetails: '',
  isActive: true,
  status: 'wishlist',
  notes: '',
};

const CreateJobModal = () => {
  const [form, setForm] = useState(initialForm);
  const [importantDates, setImportantDate] = useState([]);

  const { createJob, showCreateModal, setCloseCreateModal } = useJobs();
  const { showToast } = useToast();

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setCloseCreateModal();
        setImportantDate([]);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [setCloseCreateModal]);

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    if (type === 'checkbox' && 'checked' in e.target) {
      const checked = e.target.checked;
      setForm((prev) => ({ ...prev, [name]: checked }));
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  };

  // Important Date functions
  const handleAddImportantDate = () => {
    setImportantDate((prev) => [
      ...prev,
      {
        idx: Date.now().toString(),
        label: '',
        date: '',
      },
    ]);
  };

  const handleRemoveImportantDate = (key) => {
    setImportantDate((prev) => prev.filter((a) => a.idx !== key));
  };

  const handleImportantDateChange = (key, field, value) => {
    setImportantDate((prev) => prev.map((date) => (date.idx === key ? { ...date, [field]: value } : date)));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const jobBody = {
        companyName: form.companyName,
        officeAddress: form.officeAddress,
        jobRole: form.jobRole,
        jobType: form.jobType,
        description: form.description,
        location: form.location,
        ctc: Number(form.ctc),
        basePay: Number(form.basePay),
        monthlySalary: Number(form.monthlySalary),
        bonusIncluded: form.bonusIncluded,
        benefits: form.benefits,
        isActive: form.isActive,
        bonusDescription: form.bonusDescription,
        benefitsDetails: form.benefitsDetails,
        status: form.status,
        notes: form.notes,
        importantDates,
      };

      const response = await createJob(jobBody);
      showToast('success', response.message);
      setForm(initialForm);
    } catch (error) {
      showToast('error', error.response.data.message || error.message);
    } finally {
      setImportantDate([]);
      setCloseCreateModal();
    }
  };

  if (!showCreateModal) {
    return null;
  }
  // Modal background and modal body
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 bg-opacity-40">
      <div className="relative bg-white rounded shadow-lg max-w-2xl w-full mx-4 max-h-[95vh] overflow-y-auto">
        {/* Close button */}
        <button className="absolute top-3 right-4 text-gray-500 hover:text-gray-700 text-2xl font-bold" onClick={() => setCloseCreateModal()} type="button" aria-label="Close">
          <X className="w-6 h-6" />
        </button>
        <form className="p-6" onSubmit={handleSubmit}>
          <h2 className="text-xl font-semibold mb-4">Create Job</h2>
          {/* About Company */}
          <div className="mb-4">
            <label className="block mb-1 font-medium">Company Name *</label>
            <input type="text" name="companyName" value={form.companyName} onChange={handleChange} required className="w-full border p-2 rounded" />
          </div>
          <div className="mb-4">
            <label className="block mb-1 font-medium">Office Address</label>
            <input type="text" name="officeAddress" value={form.officeAddress} onChange={handleChange} className="w-full border p-2 rounded" />
          </div>

          {/* About Job */}
          <div className="mb-4">
            <label className="block mb-1 font-medium">Job Role *</label>
            <input type="text" name="jobRole" value={form.jobRole} onChange={handleChange} required className="w-full border p-2 rounded" />
          </div>
          <div className="mb-4">
            <label className="block mb-1 font-medium">Description</label>
            <textarea name="description" value={form.description} onChange={handleChange} className="w-full border p-2 rounded" />
          </div>
          <div className="mb-4">
            <label className="block mb-1 font-medium">Job Type *</label>
            <select name="jobType" value={form.jobType} onChange={handleChange} required className="w-full border p-2 rounded">
              {jobTypeOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-4">
            <label className="block mb-1 font-medium">Location *</label>
            <select name="location" value={form.location} onChange={handleChange} required className="w-full border p-2 rounded">
              {locationOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          {/* Miscellaneous */}
          <div className="mb-4 flex gap-4">
            <div>
              <label className="block mb-1 font-medium">CTC</label>
              <input type="number" min="0" name="ctc" value={form.ctc} onChange={handleChange} className="w-full border p-2 rounded" />
            </div>
            <div>
              <label className="block mb-1 font-medium">Base Pay</label>
              <input type="number" min="0" name="basePay" value={form.basePay} onChange={handleChange} className="w-full border p-2 rounded" />
            </div>
            <div>
              <label className="block mb-1 font-medium">Monthly Salary</label>
              <input type="number" min="0" name="monthlySalary" value={form.monthlySalary} onChange={handleChange} className="w-full border p-2 rounded" />
            </div>
          </div>
          <div className="mb-4 flex gap-4">
            <div className="flex items-center">
              <input type="checkbox" name="bonusIncluded" checked={form.bonusIncluded} onChange={handleChange} id="bonusIncluded" />
              <label htmlFor="bonusIncluded" className="ml-2">
                Bonus Included
              </label>
            </div>
            <div className="flex items-center">
              <input type="checkbox" name="benefits" checked={form.benefits} onChange={handleChange} id="benefits" />
              <label htmlFor="benefits" className="ml-2">
                Benefits Included
              </label>
            </div>
            <div className="flex items-center">
              <input type="checkbox" name="isActive" checked={form.isActive} onChange={handleChange} id="isActive" />
              <label htmlFor="isActive" className="ml-2">
                Active
              </label>
            </div>
          </div>

          {form.bonusIncluded && (
            <div className="mb-4">
              <label className="block mb-1 font-medium">Bonus Description</label>
              <input type="text" name="bonusDescription" value={form.bonusDescription} onChange={handleChange} className="w-full border p-2 rounded" />
            </div>
          )}

          {form.benefits && (
            <div className="mb-4">
              <label className="block mb-1 font-medium">Benefits Details (comma separated)</label>
              <input type="text" name="benefitsDetails" value={form.benefitsDetails} onChange={handleChange} placeholder="Health insurance, Gym membership" className="w-full border p-2 rounded" />
            </div>
          )}

          {/* Important Dates */}
          <div className="mb-4">
            <label className="block mb-1 font-medium">Important Dates</label>
            {importantDates.length > 0 &&
              importantDates.map((date) => (
                <div key={date.idx} className="mb-2 flex gap-2 items-center">
                  <input type="text" placeholder="Label" value={date.label} onChange={(e) => handleImportantDateChange(date.idx, 'label', e.target.value)} className="border p-2 rounded" />
                  <input type="date" value={date.date} onChange={(e) => handleImportantDateChange(date.idx, 'date', e.target.value)} className="border p-2 rounded" />
                  <button type="button" onClick={() => handleRemoveImportantDate(date.idx)} className="px-2 py-1 text-red-500 cursor-pointer">
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ))}
            <button type="button" onClick={handleAddImportantDate} className="px-2 py-1 bg-blue-100 rounded text-blue-700 mt-1">
              Add Date
            </button>
          </div>

          {/* Status */}
          <div className="mb-4">
            <label className="block mb-1 font-medium">Status *</label>
            <select name="status" value={form.status} onChange={handleChange} required className="w-full border p-2 rounded">
              {statusOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          {/* Notes */}
          <div className="mb-4">
            <label className="block mb-1 font-medium">Notes</label>
            <textarea name="notes" value={form.notes} onChange={handleChange} className="w-full border p-2 rounded" />
          </div>

          <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
            Create Job
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateJobModal;
