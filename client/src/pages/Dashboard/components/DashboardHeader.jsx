import { useJobs } from '@/features/jobs';

import { AddJobButton } from '@/features/jobs';

import { countJobs } from '@/features/jobs/utils';
import { getTodayWithDay } from '@/shared/utils/date.utils';

const DashboardHeader = () => {
  const todayString = getTodayWithDay();

  const { jobs } = useJobs();

  const applicationsCount = countJobs(jobs);

  return (
    <div className="app-card flex flex-row justify-between items-center p-4">
      <div className="flex flex-col">
        <h1 className="text-2xl font-bold tracking-tight">JobTrek</h1>
        <p className="text-sm mt-1">
          {todayString}
          &nbsp;·&nbsp;{' '}
          <span className="font-medium">{applicationsCount} applications tracked</span>
        </p>
      </div>
      <AddJobButton />
    </div>
  );
};

export default DashboardHeader;
