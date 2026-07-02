import JobTypesFilterPills from '@/features/jobs/components/JobTypesFilterPills';
import Pipeline from '@/features/jobs/components/pipeline/components/Pipeline';

import StatBar from '@/shared/components/StatBar/StatBar';

const Jobs = () => {
  return (
    <div className="flex flex-col gap-2 p-2 h-full overflow-hidden">
      <StatBar />

      <JobTypesFilterPills />

      <Pipeline />
    </div>
  );
};

export default Jobs;
