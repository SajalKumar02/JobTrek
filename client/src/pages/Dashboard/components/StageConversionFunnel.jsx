import { useMemo } from 'react';

import { useJobs } from '@/features/jobs';

import { getStageConversionData } from '@/pages/Dashboard/utils';

const BarStageConversionBar = ({ label, value, widthPercent }) => {
  return (
    <div className="flex items-center gap-3 py-1">
      <span className="w-16 shrink-0 text-right text-[12px] leading-none tracking-[-0.12px] text-ink-muted-48">
        {label}
      </span>
      <div className="relative h-8 flex-1">
        <div className="h-full rounded-sm border border-hairline bg-surface-pearl">
          <div
            className="flex h-full items-center justify-center rounded-sm bg-ink transition-all duration-500"
            style={{
              width: `${widthPercent}%`,
              minWidth: value > 0 ? '2rem' : '0',
            }}
          >
            {value > 0 && (
              <span className="text-[12px] font-semibold text-on-dark">
                {value}
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const StageConversionFunnel = () => {
  const { jobs } = useJobs();

  const funnelStages = useMemo(() => getStageConversionData(jobs), [jobs]);

  return (
    <div className="app-card">
      <div className="flex h-full flex-col gap-4">
        <div className="flex items-start justify-between">
          <span className="text-[17px] leading-[1.24] font-semibold tracking-[-0.374px] text-ink">
            Stage conversion funnel
          </span>
          <span className="text-[14px] leading-[1.43] tracking-[-0.224px] text-ink-muted-48">
            based on status history
          </span>
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
