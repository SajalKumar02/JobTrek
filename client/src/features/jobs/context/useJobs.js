import { useContext } from 'react';

import { JobContext } from '@/features/jobs/context/provider';

export const useJobs = () => {
  const context = useContext(JobContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
};
