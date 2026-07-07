import { useMemo } from 'react';
import { useNavigate } from 'react-router';

import { CalendarDays, CalendarX } from 'lucide-react';

import { useJobs } from '@/features/jobs';

import { getCustomDate } from '@/shared/utils/date.utils';

const UpcomingDeadlines = () => {
  const { jobs } = useJobs();
  const navigate = useNavigate();

  const deadlineJob = useMemo(() => {
    const now = new Date();
    now.setDate(now.getDate() - 1);

    const sevenDaysFromNow = new Date(now);
    sevenDaysFromNow.setDate(now.getDate() + 7);

    const jobsUnderCurrentWeek = jobs.filter(
      (job) =>
        Array.isArray(job.importantDates) &&
        job.importantDates.some((d) => {
          if (!d.date) return false;
          const date = new Date(d.date);
          return date >= now && date <= sevenDaysFromNow;
        })
    );

    const deadlineJobArray = jobsUnderCurrentWeek
      .sort(
        (a, b) =>
          new Date(a.importantDates[a.importantDates.length - 1]?.date).getTime() -
          new Date(b.importantDates[b.importantDates.length - 1]?.date).getTime()
      )
      .slice(0, 3);

    return deadlineJobArray;
  }, [jobs]);

  const latestDate = (importantDates) => {
    if (importantDates.length === 0) return;

    return getCustomDate(importantDates[importantDates.length - 1].date);
  };

  return (
    <div className="app-card flex flex-col gap-2">
      <div className="flex justify-between">
        <span className="font-semibold text-sm">Upcoming deadlines</span>
        <span className="text-xs text-gray-500">next 7 days</span>
      </div>
      {deadlineJob && deadlineJob.length > 0 ? (
        <div className="flex flex-col gap-2">
          {deadlineJob.map((d) => (
            <div
              key={d._id}
              onClick={() => navigate(`/jobs/${d._id}`)}
              className={`flex items-center gap-2 cursor-pointer rounded-md px-2 py-2 ${
                d.isPrimary ? 'bg-gray-200 border-0' : 'bg-transparent border border-gray-300'
              }`}
            >
              <div className="shrink-0">
                <div
                  className={`w-5 h-5 rounded-md flex items-center justify-center ${
                    d.isPrimary ? 'bg-gray-300' : 'bg-white'
                  }`}
                >
                  <CalendarDays
                    size={14}
                    className={d.isPrimary ? 'text-black' : 'text-gray-500'}
                    strokeWidth={2}
                  />
                </div>
              </div>
              <div className="flex flex-col grow leading-none">
                <span className="font-semibold text-sm leading-tight truncate">
                  {d.companyName || 'Unknown Company'}
                </span>
                <span className="text-xs text-gray-600 truncate">
                  {d.jobTitle || 'Unknown Role'}
                </span>
              </div>
              <div className="flex flex-col items-end">
                <span
                  className={
                    d.isPrimary ? 'text-black font-medium text-xs' : 'text-gray-600 text-xs'
                  }
                >
                  {latestDate(d.importantDates) || '--'}
                </span>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex flex-col justify-center items-center h-full py-5">
          <CalendarX size={32} />
          <span className="text-gray-400 text-xs">No deadlines in the next 7 days…</span>
        </div>
      )}
    </div>
  );
};

export default UpcomingDeadlines;
