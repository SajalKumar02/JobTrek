import { useEffect, useState } from 'react';
import { useParams } from 'react-router';

import { useJobs, JobForm } from '@/features/jobs';

import { initialJobState } from '@/features/jobs/constants';
import { useToast } from '@/features/toast';
import { editJobInputMethodOptions } from '@/features/ai/constants';
import AIAutofillForm from '@/features/ai/AIAutofillForm';
import AIAnalysisResult from '@/features/ai/AIAnalysisResult';

const EditJob = () => {
  const [jobForm, setJobForm] = useState({ ...initialJobState });
  const [isLoading, setIsLoading] = useState(true);
  const { jobId } = useParams();

  const { fetchJobByID, updateJob } = useJobs();
  const { showToast } = useToast();

  const [activeTab, setActiveTab] = useState(0);

  useEffect(() => {
    const fetchJob = async () => {
      if (!jobId) {
        setIsLoading(false);
        return;
      }
      try {
        const response = await fetchJobByID(jobId);
        setJobForm((prev) => ({ ...prev, ...response.job })); // ✅ functional update
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
      {/* <div className="grid grid-cols-3 sticky justify-around border-b border-gray-200">
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
      </div> */}
      {/* <div className="flex flex-row justify-center p-3"> */}
      {/* {activeTab === 0 && ( */}
      <JobForm
        initialJobState={jobForm}
        onSubmit={handleSubmitEditJobForm}
        buttonTitle="Save Changes"
      />
      {/* )} */}
      {/* {activeTab === 1 && <AIAutofillForm />} */}
      {/* {activeTab === 2 && <AIAnalysisResult />} */}
      {/* </div> */}
    </div>
  );
};

export default EditJob;
