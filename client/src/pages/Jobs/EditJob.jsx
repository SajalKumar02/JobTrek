import { useEffect, useState } from 'react';
import { useParams } from 'react-router';

import { initialJobState, useJobs, JobForm } from '@/features/jobs';

import { useToast } from '@/features/toast';

import { AIAnalysisResult, editJobInputMethodOptions } from '@/features/ai';

const EditJob = () => {
  const [jobForm, setJobForm] = useState({ ...initialJobState });
  const [isLoading, setIsLoading] = useState(true);

  const { jobId } = useParams();

  // Hooks
  const { fetchJobByID, updateJob } = useJobs();
  const { showToast } = useToast();

  // Tab Settings
  const [activeTab, setActiveTab] = useState(0);
  const handleSetActiveTab = (value) => setActiveTab(value);

  useEffect(() => {
    const fetchJob = async () => {
      if (!jobId) {
        setIsLoading(false);
        return;
      }
      try {
        const response = await fetchJobByID(jobId);
        setJobForm((prev) => ({ ...prev, ...response.job }));
      } catch (error) {
        showToast(
          'error',
          error?.response?.data?.message ?? 'Failed to fetch job'
        );
        setJobForm(initialJobState);
      } finally {
        setIsLoading(false);
      }
    };
    fetchJob();
  }, [jobId, fetchJobByID, showToast]);

  const handleSubmitEditJobForm = async (form) => {
    try {
      const data = await updateJob(jobId, form);
      showToast('success', data.message);
    } catch (error) {
      showToast('error', error.response.data.message);
    }
  };

  if (isLoading) return <div>Loading job...</div>;

  return (
    <div className="p-3">
      <div className="grid grid-cols-2 sticky justify-around border-b border-gray-200">
        {editJobInputMethodOptions.map(({ id, label }) => (
          <button
            key={id}
            onClick={() => setActiveTab(id)}
            className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors
              ${
                activeTab === id
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
          >
            {label}
          </button>
        ))}
      </div>
      <div className="flex flex-row justify-center p-3">
        {activeTab === 0 && (
          <JobForm
            initialJobState={jobForm}
            onSubmit={handleSubmitEditJobForm}
            buttonTitle="Save Changes"
          />
        )}
        {activeTab === 1 && <AIAnalysisResult />}
      </div>
    </div>
  );
};

export default EditJob;
