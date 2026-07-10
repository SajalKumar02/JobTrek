import { initialJobState, JobForm, useJobs } from '@/features/jobs';
import { useToast } from '@/features/toast';

const NewJob = () => {
  const { createJob } = useJobs();
  const { showToast } = useToast();

  const handleSubmitNewJobForm = async (form) => {
    try {
      const response = await createJob(form);
      showToast('success', response.message);
    } catch (error) {
      showToast('error', error.response?.data?.message || error.message);
    }
  };

  return (
    <div>
      <JobForm
        initialJobState={initialJobState}
        isEditableProp={false}
        onSubmit={handleSubmitNewJobForm}
        buttonTitle="Create New Job"
      />
    </div>
  );
};

export default NewJob;
