import { useMemo } from 'react';

import { useJobs } from '../../../jobs/hooks/useJobs';

import RecentActivityCard from './RecentActivityCard';

const RecentActivity = () => {
  const { jobs } = useJobs();

  const recentActivities = useMemo(() => {
    return [...jobs]
      .sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt))
      .slice(0, 5);
  }, [jobs]);

  return (
    <div className="dashboard-card">
      <div className="flex items-center justify-between mb-3">
        <div className="text-[1.08rem] font-semibold">Recent activity</div>
        <a
          href="#"
          className="text-sm font-medium underline underline-offset-2 cursor-pointer"
        >
          View all &rarr;
        </a>
      </div>
      <div className="grid grid-cols-5 gap-2">
        {recentActivities.map((activity) => (
          <RecentActivityCard
            activity={activity}
            id={activity._id}
            key={activity._id}
          />
        ))}
      </div>
    </div>
  );
};

export default RecentActivity;
