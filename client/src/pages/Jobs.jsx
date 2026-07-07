import EmployementTypeFilterRow from '@/features/jobs/components/EmployementTypeFilterRow';
import Pipeline from '@/features/jobs/components/pipeline/components/Pipeline';

import StatBar from '@/shared/components/StatBar/StatBar';

const Jobs = () => {
  return (
    <div className="flex flex-col gap-3 px-3 pt-3 overflow-x-auto">
      <StatBar />

      <EmployementTypeFilterRow />

      <Pipeline />
    </div>
  );
};

export default Jobs;
