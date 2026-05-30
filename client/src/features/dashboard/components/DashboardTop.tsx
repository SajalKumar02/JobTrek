import AddApplicationButton from '../../../shared/components/AddApplicationButton';
import { getTodayWithDay } from '../../../shared/utils/date';
import { useJobs } from '../../jobs/hooks/useJobs';

const DashboardTop = () => {
  const todayString = getTodayWithDay();

  const { countJobs } = useJobs();

  return (
    <div className="dashboard-card flex flex-row justify-between items-center px-6 py-6">
      <div className="flex flex-col">
        <h1 className="text-2xl font-bold tracking-tight">JobTrek</h1>
        <p className="text-sm mt-1">
          {todayString}
          &nbsp;·&nbsp;{' '}
          <span className="font-medium">
            {countJobs()} applications tracked
          </span>
        </p>
      </div>
      <AddApplicationButton />
    </div>
  );
};

export default DashboardTop;
