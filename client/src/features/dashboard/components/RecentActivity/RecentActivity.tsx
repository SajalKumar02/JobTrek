import { useMemo } from 'react';

import { useJobs } from '../../../jobs/hooks/useJobs';

import RecentActivityCard from './RecentActivityCard';

const RecentActivity = () => {
  const { jobs } = useJobs();

  const recentActivities = useMemo(() => {
    return [...jobs]
      .sort((a, b) => {
        const updatedAtA = new Date(a.updatedAt).getTime();
        const updatedAtB = new Date(b.updatedAt).getTime();
        if (updatedAtB !== updatedAtA) {
          return updatedAtB - updatedAtA;
        }

        const lastStatusA =
          a.statusHistory && a.statusHistory.length > 0
            ? new Date(
                a.statusHistory[a.statusHistory.length - 1].date,
              ).getTime()
            : 0;
        const lastStatusB =
          b.statusHistory && b.statusHistory.length > 0
            ? new Date(
                b.statusHistory[b.statusHistory.length - 1].date,
              ).getTime()
            : 0;
        return lastStatusB - lastStatusA;
      })
      .slice(0, 3);
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
      <div className="grid grid-cols-4 gap-2">
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
