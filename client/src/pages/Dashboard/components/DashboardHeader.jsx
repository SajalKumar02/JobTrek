import { useJobs } from '@/features/jobs';

import { AddJobButton } from '@/features/jobs';

import { countJobs } from '@/features/jobs/utils';
import { getTodayWithDay } from '@/shared/utils/date.utils';

const DashboardHeader = () => {
  const todayString = getTodayWithDay();

  const { jobs } = useJobs();

  const applicationsCount = countJobs(jobs);

  return (
    <div className="app-card flex flex-row items-center justify-between">
      <div className="flex flex-col gap-1">
        <h1 className="font-display text-[40px] leading-[1.1] font-semibold tracking-normal text-ink">
          JobTrek
        </h1>
        <p className="text-[17px] leading-[1.47] tracking-[-0.374px] text-ink-muted-48">
          {todayString}
          &nbsp;·&nbsp;
          <span className="font-semibold text-ink">
            {applicationsCount} applications tracked
          </span>
        </p>
      </div>
      <AddJobButton />
    </div>
  );
};

export default DashboardHeader;
