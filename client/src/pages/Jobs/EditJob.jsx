import { useEffect, useState } from 'react';
import { useParams } from 'react-router';

import { useJobs, JobForm } from '@/features/jobs';

import { initialJobState } from '@/features/jobs/constants';
import { useToast } from '@/features/toast';

const EditJob = () => {
  const [jobForm, setJobForm] = useState({ ...initialJobState });
  const [isLoading, setIsLoading] = useState(true);
  const { jobId } = useParams();

  const { fetchJobByID, updateJob } = useJobs();
  const { showToast } = useToast();

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

  if (isLoading) return <div>Loading job...</div>; // ✅ blocks mount until data's ready

  return (
    <div>
      <JobForm
        initialJobState={jobForm}
        onSubmit={handleSubmitEditJobForm}
        buttonTitle="Save Changes"
      />
    </div>
  );
};

export default EditJob;
