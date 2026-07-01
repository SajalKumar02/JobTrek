import http from '@/api';

const jobServices = {
  getAll: async () => {
    try {
      const response = await http.get('/jobs');
      return response;
    } catch (error) {
      console.error(error);
      throw new Error('Could Not Fetch Jobs', { cause: error });
    }
  },
  fetchJob: async (jobId) => {
    try {
      const response = await http.get(`/jobs/${jobId}`);
      return response;
    } catch (error) {
      console.error(error);
      throw new Error('Could Not Fetch Job', { cause: error });
    }
  },
  createJob: async (jobBody) => {
    try {
      const response = await http.post(`/jobs/`, jobBody);
      return response;
    } catch (error) {
      console.error(error);
      throw new Error('Could Not Create Job', { cause: error });
    }
  },
  updateJob: async (jobId, jobUpdates) => {
    try {
      const response = await http.patch(`/jobs/${jobId}`, jobUpdates);
      return response;
    } catch (error) {
      console.error(error);
      throw new Error('Could Not Update Job', { cause: error });
    }
  },
  deleteJob: async (jobId) => {
    try {
      const response = await http.delete(`/jobs/${jobId}`);
      return response;
    } catch (error) {
      console.error(error);
      throw new Error('Could Not Delete Job', { cause: error });
    }
  },
  switchJobStatus: async (jobId, newStatus) => {
    try {
      const response = await http.patch(`/jobs/${jobId}/status`, { status: newStatus });
      return response;
    } catch (error) {
      console.error(error);
      throw new Error('Could Not Switch Job Status', { cause: error });
    }
  },
};

export default jobServices;
