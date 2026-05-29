import { createContext, useCallback, useEffect, useState } from 'react';
import http from '../../features/api/api';

const JobContext = createContext(null);

const JobProvider = ({ children }) => {
  const [showModal, setShowModal] = useState(false);
  const [jobs, setJobs] = useState([]);
  const [error, setError] = useState<string | null>(null);

  const [filter, setFilter] = useState('all');
  const [search, setSearch] = useState('');

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await http.get('/jobs/');
        if (response.data?.success) {
          setJobs(response.data.jobs || []); // ✅ Explicit fallback
        } else {
          throw new Error(response.data?.message || 'Failed to fetch');
        }
      } catch (err) {
        setError(err.message);
        setJobs([]);
      }
    };
    fetchJobs();
  }, []);

  const setShowCreateModal = () => setShowModal(true);
  const setCloseCreateModal = () => setShowModal(false);

  const handleSetFilter = (filterString) => setFilter(filterString);

  const handleSetSearchString = (searchString) => setSearch(searchString);

  const createJob = async (jobData) => {
    try {
      const response = await http.post('/jobs/', jobData);
      if (response.data && response.data.success) {
        setJobs((prev) =>
          prev ? [response.data.job, ...prev] : [response.data.job],
        );
        return response.data.job;
      } else {
        throw new Error(response.data?.message || 'Failed to create job');
      }
    } catch (error) {
      console.error('Error creating job:', error);
      throw error;
    }
  };

  const updateJob = async (jobId, updateData) => {
    try {
      const response = await http.patch(`/jobs/${jobId}`, updateData);
      if (response.data && response.data.success) {
        setJobs((prev) =>
          prev
            ? prev.map((job) =>
                job._id === jobId
                  ? Object.fromEntries(
                      Object.keys(job).map((key) => [
                        key,
                        key in response.data.job
                          ? response.data.job[key]
                          : job[key],
                      ]),
                    )
                  : job,
              )
            : prev,
        );
        return response.data.job;
      } else {
        throw new Error(response.data?.message || 'Failed to update job');
      }
    } catch (error) {
      console.error('Error updating job:', error);
      throw error;
    }
  };

  const switchJobStatus = async (jobId, newStatus) => {
    const job = jobs.find((j) => j._id === jobId);
    if (!job) return;

    try {
      const response = await http.patch(`/jobs/status/${jobId}`, {
        status: newStatus,
      });
      if (response.data && response.data.success) {
        const newJobs = (prev) =>
          prev
            ? prev.map((job) =>
                job._id === jobId ? { ...job, status: newStatus } : job,
              )
            : prev;
        setJobs(newJobs);
      } else {
        throw new Error(
          response.data?.message || 'Failed to update job status',
        );
      }
    } catch (error) {
      console.error('Error updating job status:', error);
      throw error;
    }
  };

  const deleteJob = async (jobId) => {
    try {
      const response = await http.delete(`/jobs/${jobId}`);
      if (response.data && response.data.success) {
        const newJobs = (prev) =>
          prev ? prev.filter((job) => job._id !== jobId) : prev;
        setJobs(newJobs);
      } else {
        throw new Error(response.data?.message || 'Failed to delete job');
      }
    } catch (error) {
      console.error('Error deleting job:', error);
      throw error;
    }
  };

  const fetchJobViaId = async (jobId) => {
    try {
      const job = jobs.find((j) => j._id === jobId);

      const response = await http.get(`/jobs/${job._id}`);
      if (response.data && response.data.success) {
        return response.data.job;
      } else {
        // throw new Error(response.data?.message || 'Failed to delete job');
        throw new Error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      // throw new Error(response.error.data.message);
    }
  };

  const countJobs = useCallback(() => (jobs ? jobs.length : 0), [jobs]);

  return (
    <JobContext.Provider
      value={{
        jobs,
        countJobs,
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
