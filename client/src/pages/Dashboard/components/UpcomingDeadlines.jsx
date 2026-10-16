import { useMemo } from 'react';
import { useNavigate } from 'react-router';

import { CalendarDays, CalendarX } from 'lucide-react';

import { useJobs } from '@/features/jobs';

import { getCustomDate } from '@/shared/utils/date.utils';
import { getUpcomingDeadlineJobs } from '@/pages/Dashboard/utils';

const UpcomingDeadlines = () => {
  const { jobs } = useJobs();
  const navigate = useNavigate();

  const deadlineJob = useMemo(() => getUpcomingDeadlineJobs(jobs), [jobs]);

  const latestDate = (importantDates) => {
    if (importantDates.length === 0) return;

    return getCustomDate(importantDates[importantDates.length - 1].date);
  };

  return (
    <div className="app-card flex flex-col gap-4">
      <div className="flex justify-between">
        <span className="text-[17px] leading-[1.24] font-semibold tracking-[-0.374px] text-ink">
          Upcoming deadlines
        </span>
        <span className="text-[14px] leading-[1.43] tracking-[-0.224px] text-ink-muted-48">
          next 7 days
        </span>
      </div>
      {deadlineJob && deadlineJob.length > 0 ? (
        <div className="flex flex-col gap-2">
          {deadlineJob.map((d) => (
            <div
              key={d._id}
              onClick={() => navigate(`/jobs/${d._id}`)}
              className={`flex cursor-pointer items-center gap-3 rounded-sm px-3 py-2.5 transition-colors ${
                d.isPrimary
                  ? 'bg-surface-pearl'
                  : 'border border-hairline bg-canvas'
              }`}
            >
              <div className="shrink-0">
                <div
                  className={`flex h-5 w-5 items-center justify-center rounded-sm ${
                    d.isPrimary ? 'bg-primary/10' : 'bg-surface-pearl'
                  }`}
                >
                  <CalendarDays
                    size={14}
                    className={
                      d.isPrimary ? 'text-primary' : 'text-ink-muted-48'
                    }
                    strokeWidth={2}
                  />
                </div>
              </div>
              <div className="flex grow flex-col leading-none">
                <span className="truncate text-[14px] leading-[1.29] font-semibold tracking-[-0.224px] text-ink">
                  {d.companyName || 'Unknown Company'}
                </span>
                <span className="truncate text-[12px] leading-none tracking-[-0.12px] text-ink-muted-48">
                  {d.jobTitle || 'Unknown Role'}
                </span>
              </div>
              <div className="flex flex-col items-end">
                <span
                  className={
                    d.isPrimary
                      ? 'text-[12px] font-semibold text-primary'
                      : 'text-[12px] text-ink-muted-48'
                  }
                >
                  {latestDate(d.importantDates) || '--'}
                </span>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex h-full flex-col items-center justify-center py-8">
          <CalendarX size={32} className="text-ink-muted-48" />
          <span className="text-[14px] leading-[1.43] tracking-[-0.224px] text-ink-muted-48">
            No deadlines in the next 7 days…
          </span>
        </div>
      )}
    </div>
  );
};

export default UpcomingDeadlines;
