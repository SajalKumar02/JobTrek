import { useEffect, useState, useCallback } from 'react';

import JobContext from '@/features/jobs/context/context';

import jobServices from '@/features/jobs/services';

import { useAuth } from '@/features/auth';

const JobProvider = ({ children }) => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const { authenticated } = useAuth();

  useEffect(() => {
    if (!authenticated) return;
    (async function () {
      const response = await jobServices.getAll();
      if (response.data && response.data.success) {
        setJobs(response.data.jobs);
      }
    })();
  }, [authenticated]);

  const createJob = useCallback(async (jobData) => {
    const response = await jobServices.createJob(jobData);
    if (response.data && response.data.success) {
      setJobs((prev) => (prev ? [response.data.job, ...prev] : [response.data.job]));
      return response.data;
    }
  }, []);

  const fetchJob = useCallback(async (jobId) => {
    try {
      const response = await jobServices.fetchJob(jobId);
      return response.data;
    } catch (error) {
      console.log(error.response);
    }
  }, []);

  const updateJob = useCallback(async (jobId, updateData) => {
    const response = await jobServices.updateJob(jobId, updateData);

    if (response.data && response.data.success && response.data.job) {
      setJobs((prev) => (prev ? prev.map((job) => (job._id === jobId ? { ...job, ...response.data.job } : job)) : prev));
    }

    const newResponse = await jobServices.fetchJob(jobId);

    return { ...newResponse, message: 'Job Updated Successfully' };
  }, []);

  const deleteJob = useCallback(async (jobId) => {
    const response = await jobServices.deleteJob(jobId);
    if (response.data && response.data.success) {
      const newJobs = (prev) => (prev ? prev.filter((job) => job._id !== jobId) : prev);
      setJobs(newJobs);
    }
    return response.data;
  }, []);

  const switchJobStatus = useCallback(
    async (jobId, newStatus) => {
      const job = jobs.find((j) => j._id === jobId);

      if (!job || job.status === newStatus) return;

      if (job.statusHistory && job.statusHistory.length > 6) {
        throw new Error('Limit Reached, Click on Job to Update');
      }

      const response = await jobServices.switchJobStatus(jobId, newStatus);

      if (response.data && response.data.success && response.data.job) {
        setJobs((prev) => (prev ? prev.map((j) => (j._id === jobId ? response.data.job : j)) : prev));
      }

      return response.data;
    },
    [jobs],
  );

  // Modal Functions
  const [showModal, setShowModal] = useState(false);
  const setShowCreateModal = useCallback(() => setShowModal(true), []);
  const setCloseCreateModal = useCallback(() => setShowModal(false), []);

  // Filter Functions
  const [filter, setFilter] = useState('all');
  const [search, setSearch] = useState('');

  const handleSetFilter = useCallback((filterString) => setFilter(filterString), []);
  const handleSetSearchString = useCallback((searchString) => setSearch(searchString), []);

  return (
    <JobContext.Provider
      value={{
        jobs,
        createJob,
        updateJob,
        switchJobStatus,
        deleteJob,
        fetchJobByID: fetchJob,
        // Modal
        showCreateModal: showModal,
        setShowCreateModal,
        setCloseCreateModal,
        // Filter and Sorting
        filterString: filter,
        handleSetFilter,
        searchString: search,
        handleSetSearchString,
      }}
    >
      {children}
    </JobContext.Provider>
  );
};

export { JobContext };
export default JobProvider;
