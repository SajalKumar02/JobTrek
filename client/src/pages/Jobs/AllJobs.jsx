import EmploymentTypeFilterRow from '@/features/jobs/components/EmploymentTypeFilterRow';
import Pipeline from '@/features/jobs/components/pipeline/components/Pipeline';

import StatBar from '@/shared/components/StatBar/StatBar';

const AllJobs = () => {
  return (
    <div className="flex flex-col gap-3 px-3 pt-3 overflow-x-auto">
      <StatBar />

      <EmploymentTypeFilterRow />

      <Pipeline />
    </div>
  );
};

export default AllJobs;
