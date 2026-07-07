import EmployementTypeFilterRow from '@/features/jobs/components/EmployementTypeFilterRow';
import Pipeline from '@/features/jobs/components/pipeline/components/Pipeline';

import StatBar from '@/shared/components/StatBar/StatBar';

const Jobs = () => {
  return (
    <div className="flex flex-col gap-2 p-2 pb-0 h-full overflow-hidden">
      <StatBar />

      <EmployementTypeFilterRow />

      <Pipeline />
    </div>
  );
};

export default Jobs;
