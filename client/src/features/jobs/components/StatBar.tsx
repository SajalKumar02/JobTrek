import { useMemo } from 'react';
import {
  getJobsForSearch,
  getJobsViaJobType,
  getStatCountByStatus,
} from '../utils/pipeline.utils';
import { useJobs } from '../hooks/useJobs';

type Stat = {
  label: string;
  value: string | number;
  sub: string;
};

const StatPill = ({ label, value, sub }: Stat) => (
  <div className="rounded-lg border border-[#393939] flex flex-col items-start px-5 py-3 shadow transition">
    <div className="text-[0.85rem] text-gray-600 uppercase tracking-wider font-semibold mb-1">
      {label}
    </div>
    <div className="text-2xl mb-1 drop-shadow-sm ">{value}</div>
    <div className="text-sm text-gray-900 font-normal tracking-wide">{sub}</div>
  </div>
);

const StatBar = () => {
  const { jobs, filterString, searchString } = useJobs();

  const filteredJobs = useMemo(() => {
    let jobsByStatus = jobs;
    if (filterString !== 'all') {
      jobsByStatus = getJobsViaJobType(jobsByStatus, filterString);
    }
    if (searchString !== '') {
      jobsByStatus = getJobsForSearch(jobsByStatus, searchString);
    }
    return jobsByStatus;
  }, [jobs, filterString, searchString]);

  const { total, active, interview, offers, responseRate } = useMemo(() => {
    return getStatCountByStatus(filteredJobs);
  }, [filteredJobs]);

  const stats: Stat[] = useMemo(
    () => [
      {
        label: 'TOTAL',
        value: total ?? 0,
        sub: 'all time',
      },
      {
        label: 'ACTIVE',
        value: active ?? 0,
        sub: 'not rejected',
      },
      {
        label: 'INTERVIEWS',
        value: interview ?? 0,
        sub: 'scheduled',
      },
      {
        label: 'OFFERS',
        value: offers ?? 0,
        sub: 'received',
      },
      {
        label: 'RESPONSE RATE',
        value: typeof responseRate === 'number' ? `${responseRate}%` : '0%',
        sub: 'of applied jobs',
      },
    ],
    [total, active, interview, offers, responseRate],
  );

  return (
    <div className="grid grid-cols-5 space-x-3 w-full justify-start mb-2">
      {stats.map((stat, i) => (
        <StatPill
          key={i}
          label={stat.label}
          value={stat.value}
          sub={stat.sub}
        />
      ))}
    </div>
  );
};

export default StatBar;
