import { useMemo } from 'react';
import { Link } from 'react-router';

import { useJobs } from '@/features/jobs';

import RecentActivityCard from '@/pages/Dashboard/components/recentActivity/RecentActivityCard';

import { ArrowRight } from 'lucide-react';

const RecentActivity = () => {
  const { jobs } = useJobs();

  const recentActivities = useMemo(() => {
    return [...jobs]
      .sort((a, b) => {
        const updatedAtA = new Date(a.updatedAt);
        const updatedAtB = new Date(b.updatedAt);

        return updatedAtB - updatedAtA;
      })
      .slice(0, 3);
  }, [jobs]);

  return (
    <div className="app-card flex flex-col gap-2">
      <div className="flex flex-row justify-between">
        <span className="text-sm font-semibold">Recent activity</span>
        <Link to="/jobs" className="flex flex-row cursor-pointer align-middle">
          <span>View all</span>
          <ArrowRight />
        </Link>
      </div>
      <div className="flex flex-col md:flex-row gap-2">
        {recentActivities.map((activity) => (
          <RecentActivityCard activity={activity} id={activity._id} key={activity._id} />
        ))}
      </div>
    </div>
  );
};

export default RecentActivity;
