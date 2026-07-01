import JobTypesFilterPills from '../features/jobs/components/JobTypesFilterPills';
import Pipeline from '../features/pipeline/components/Pipeline';

import StatBar from '../shared/components/StatBar/StatBar';

const Jobs = () => {
  return (
    <div className="grid grid-rows-[1fr_auto_auto] gap-2 px-2 pb-4">
      <StatBar />

      <JobTypesFilterPills />

      <Pipeline />
    </div>
  );
};

export default Jobs;
