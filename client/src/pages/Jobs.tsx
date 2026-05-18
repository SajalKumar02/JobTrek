import StatBar from '../features/jobs/StatBar.tsx';
import Pipeline from '../features/jobs/Pipeline.tsx';

import { useJobs } from '../features/jobs/useJobs.ts';

const Jobs = () => {
  const { jobs } = useJobs();

  return (
    <>
      {/* Stat Bar */}
      <StatBar />

      {/* Pipeline */}
      <Pipeline jobs={jobs} />
    </>
  );
};

export default Jobs;
