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
    <div className="app-card flex flex-col gap-4">
      <div className="flex flex-row items-center justify-between">
        <span className="text-[17px] leading-[1.24] font-semibold tracking-[-0.374px] text-ink">
          Recent activity
        </span>
        <Link
          to="/jobs"
          className="text-link flex cursor-pointer flex-row items-center gap-1"
        >
          <span>View all</span>
          <ArrowRight size={16} />
        </Link>
      </div>

      <div className="flex flex-col gap-4 md:flex-row">
        {recentActivities.length > 0 ? (
          recentActivities.map((activity) => (
            <RecentActivityCard
              activity={activity}
              id={activity._id}
              key={activity._id}
            />
          ))
        ) : (
          <div className="flex w-full flex-col items-center p-6 text-center text-[17px] leading-[1.47] text-ink-muted-48">
            <span className="mb-2 flex justify-center">
              <File className="h-6 w-6 text-ink-muted-48" />
            </span>
            No recent activity to show.
          </div>
        )}
      </div>
    </div>
  );
};

export default RecentActivity;
