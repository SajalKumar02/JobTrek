import { useMemo } from 'react';
import {
  getJobsForSearch,
  getJobsViaJobType,
  getStatCountByStatus,
} from '../../utils/pipeline.utils';
import { useJobs } from '../../hooks/useJobs';
import StatPill from './StatPill';

type Stat = {
  label: string;
  value: string | number;
  sub: string;
};

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
    <div className="grid grid-cols-5 space-x-2">
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
