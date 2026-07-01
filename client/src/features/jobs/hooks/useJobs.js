import { useContext } from 'react';
import JobContext from '../contextProvider/JobContext';

export const useJobs = () => {
  const context = useContext(JobContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
};
