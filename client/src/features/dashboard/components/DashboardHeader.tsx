import AddApplicationButton from '../../../shared/components/AddApplicationButton';
import { getTodayWithDay } from '../../../shared/utils/date';
import { useJobs } from '../../jobs/hooks/useJobs';

import { countJobs } from '../../jobs/utils/job.utils';

const DashboardHeader = () => {
  const todayString = getTodayWithDay();

  const { jobs } = useJobs();

  const applicationsCount = countJobs(jobs);

  return (
    <div className="dashboard-card flex flex-row justify-between items-center">
      <div className="flex flex-col">
        <h1 className="text-2xl font-bold tracking-tight">JobTrek</h1>
        <p className="text-sm mt-1">
          {todayString}
          &nbsp;·&nbsp;{' '}
          <span className="font-medium">
            {applicationsCount} applications tracked
          </span>
        </p>
      </div>
      <AddApplicationButton />
    </div>
  );
};

export default DashboardHeader;
