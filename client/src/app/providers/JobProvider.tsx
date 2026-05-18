import { createContext, useEffect, useState } from 'react';
import http from '../../features/api/api';

const JobContext = createContext(null);

const JobProvider = ({ children }) => {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await http.get('/jobs/');
        if (response.data && response.data.success) {
          setJobs(response.data.jobs);
        } else {
          setJobs([]);
        }
      } catch (error) {
        setJobs([]);
        console.error('Failed to fetch jobs:', error);
      }
    };
    fetchJobs();
  }, []);

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
            ? prev.map((job) => (job._id === jobId ? response.data.job : job))
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

  const deleteJob = async (jobId) => {
    try {
      const response = await http.delete(`/jobs/${jobId}`);
      if (response.data && response.data.success) {
        setJobs((prev) =>
          prev ? prev.filter((job) => job._id !== jobId) : prev,
        );
        return true;
      } else {
        throw new Error(response.data?.message || 'Failed to delete job');
      }
    } catch (error) {
      console.error('Error deleting job:', error);
      throw error;
    }
  };

  const countJobs = () => (jobs ? jobs.length : 0);

  return (
    <JobContext.Provider
      value={{ jobs, countJobs, createJob, updateJob, deleteJob }}
    >
      {children}
    </JobContext.Provider>
  );
};

export { JobContext };
export default JobProvider;
