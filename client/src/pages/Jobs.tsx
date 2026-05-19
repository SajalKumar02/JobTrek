import StatBar from '../features/jobs/components/StatBar.tsx';
import JobTypesFilterPills from '../features/jobs/components/JobTypesFilterPills.tsx';
import Pipeline from '../features/jobs/components/pipeline/Pipeline.tsx';

import {
  groupJobsByStatus,
  getStatCountByStatus,
} from '../features/jobs/utils/pipeline.utils.ts';

import { useJobs } from '../features/jobs/hooks/useJobs.ts';
import PipelineFooter from '../features/jobs/components/pipeline/PipelineFooter.tsx';

const Jobs = () => {
  const { jobs } = useJobs();

  const groupedJobs = groupJobsByStatus(jobs);
  const statJobs = getStatCountByStatus(jobs);

  return (
    <>
      {/* Stat Bar */}
      <StatBar statJobs={statJobs} />

      <JobTypesFilterPills />

      {/* Pipeline */}
      <Pipeline groupedJobs={groupedJobs} />

      {/* Pipeline Footer */}
      <PipelineFooter />
    </>
  );
};

export default Jobs;
