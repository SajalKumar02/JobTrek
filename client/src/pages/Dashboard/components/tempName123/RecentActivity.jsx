import { useMemo } from 'react';
import { Link } from 'react-router';

import { useJobs } from '@/features/jobs';

import RecentActivityCard from '@/pages/Dashboard/components/RecentActivity/RecentActivityCard';

import { ArrowRight, File } from 'lucide-react';

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
        {recentActivities.length > 0 ? (
          recentActivities.map((activity) => (
            <RecentActivityCard activity={activity} id={activity._id} key={activity._id} />
          ))
        ) : (
          <>
            <div className="flex flex-col items-center text-gray-500 text-sm p-4 w-full text-center">
              <span className="mb-2 flex justify-center">
                <File className="h-6 w-6 text-gray-400" />
              </span>
              No recent activity to show.
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default RecentActivity;
