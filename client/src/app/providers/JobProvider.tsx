import { createContext, useEffect, useState } from 'react';

import http from '../../features/api/api';

const JobContext = createContext(null);

const JobProvider = ({ children }) => {
  const [showModal, setShowModal] = useState(false);
  const [jobs, setJobs] = useState([]);

  const [filter, setFilter] = useState('all');
  const [search, setSearch] = useState('');

  useEffect(() => {
    const fetchJobs = async () => {
      const response = await http.get('/jobs/');
      setJobs(response.data.jobs);
    };
    fetchJobs();
  }, []);

  const setShowCreateModal = () => setShowModal(true);
  const setCloseCreateModal = () => setShowModal(false);

  const handleSetFilter = (filterString) => setFilter(filterString);

  const handleSetSearchString = (searchString) => setSearch(searchString);

  const createJob = async (jobData) => {
    const response = await http.post('/jobs/', jobData);
    if (response.data && response.data.success) {
      setJobs((prev) => (prev ? [response.data.job, ...prev] : [response.data.job]));
      return response.data;
    }
  };

  const fetchJobViaId = async (jobId) => {
    const response = await http.get(`/jobs/${jobId}`);
    return response.data;
  };

  const updateJob = async (jobId, updateData) => {
    const response = await http.patch(`/jobs/${jobId}`, updateData);

    if (response.data && response.data.success && response.data.job) {
      setJobs((prev) =>
        prev ? prev.map((job) => (job._id === jobId ? { ...job, ...response.data.job } : job)) : prev,
      );
    }

    const newResponse = await fetchJobViaId(jobId);

    return { ...newResponse, message: 'Job Updated Successfully' };
  };

  const switchJobStatus = async (jobId, newStatus) => {
    const job = jobs.find((j) => j._id === jobId);

    if (!job || job.status === newStatus) return;

    if (job.statusHistory && job.statusHistory.length > 6) {
      throw new Error('Limit Reached, Click on Job to Update');
    }

    const response = await http.patch(`/jobs/status/${jobId}`, {
      status: newStatus,
    });

    if (response.data && response.data.success && response.data.job) {
      setJobs((prev) =>
        prev
          ? prev.map((j) =>
              j._id === jobId
                ? {
                    ...j,
                    ...response.data.job,
                  }
                : j,
            )
          : prev,
      );
    }

    return response.data;
  };

  const deleteJob = async (jobId) => {
    const response = await http.delete(`/jobs/${jobId}`);
    if (response.data && response.data.success) {
      const newJobs = (prev) => (prev ? prev.filter((job) => job._id !== jobId) : prev);
      setJobs(newJobs);
    }
    return response.data;
  };

  return (
    <JobContext.Provider
      value={{
        jobs,
        createJob,
        updateJob,
        switchJobStatus,
        deleteJob,
        fetchJobViaId,
        showCreateModal: showModal,
        setShowCreateModal,
        setCloseCreateModal,
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
