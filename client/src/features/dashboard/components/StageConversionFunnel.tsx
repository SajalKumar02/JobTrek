import { useMemo } from 'react';

import { useJobs } from '../../jobs/hooks/useJobs';

import { getStageConversionData } from '../utils/dashboard.utils';

const BarStageConversionBar = ({
  label,
  value,
  widthPercent,
}: {
  label: string;
  value: number;
  widthPercent: number;
}) => {
  return (
    <div className="flex items-center gap-3 py-1">
      <span className="text-xs text-gray-500 w-16 shrink-0 text-right">
        {label}
      </span>
      <div className="flex-1 relative h-8">
        <div className="absolute inset-0 rounded-md bg-gray-100 border border-gray-200" />
        <div
          className="absolute left-0 top-0 h-full rounded-md bg-gray-800 transition-all duration-500 flex items-center px-3"
          style={{
            width: `${widthPercent}%`,
            minWidth: value > 0 ? '2rem' : '0',
          }}
        >
          {value > 0 && (
            <span className="text-xs font-semibold text-white">{value}</span>
          )}
        </div>
        {value === 0 && (
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs text-gray-400">
            0
          </span>
        )}
      </div>
    </div>
  );
};

const StageConversionFunnel = () => {
  const { jobs } = useJobs();

  const funnelStages = useMemo(() => getStageConversionData(jobs), [jobs]);

  return (
    <div className="dashboard-card p-4 text-gray-900">
      <div className="h-full flex flex-col gap-3">
        <div className="flex justify-between items-start">
          <span className="font-semibold text-sm">Stage conversion funnel</span>
          <span className="text-xs text-gray-400">based on status history</span>
        </div>
        <div className="flex flex-col gap-1">
          {funnelStages.map((stage) => (
            <BarStageConversionBar key={stage.label} {...stage} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default StageConversionFunnel;
