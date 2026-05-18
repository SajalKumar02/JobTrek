import StatBar from '../features/jobs/components/StatBar.tsx';
import Pipeline from '../features/jobs/pipeline/Pipeline.tsx';

import {
  groupJobsByStatus,
  getStatCountByStatus,
} from '../features/jobs/utils/pipeline.utils.ts';
import { useJobs } from '../features/jobs/hooks/useJobs.ts';

const Jobs = () => {
  const { jobs } = useJobs();

  const groupedJobs = groupJobsByStatus(jobs);
  const statJobs = getStatCountByStatus(jobs);

  return (
    <>
      {/* Stat Bar */}
      <StatBar statJobs={statJobs} />

      {/* Pipeline */}
      <Pipeline groupedJobs={groupedJobs} />
    </>
  );
};

export default Jobs;
