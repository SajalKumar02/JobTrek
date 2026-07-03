import { useJobs } from '@/features/jobs';
import { getStatCountByStatus } from '@/features/pipeline/utils';

const PipelineBarRow = ({ label, value, maxValue }) => {
  const percent = Math.max((value / maxValue) * 100, 8);

  return (
    <div className="flex items-center gap-2 h-7">
      <span className="w-20 text-sm font-medium">{label}</span>
      <div className="relative flex-1 flex items-center">
        <div className="h-2.5 rounded bg-gray-200 w-full" />
        <div
          className="absolute left-0 top-0 h-2.5 rounded bg-gray-500"
          style={{
            width: `${percent}%`,
            minWidth: value === 0 ? 0 : 16,
            maxWidth: '100%',
            transition: 'width 0.3s',
          }}
        />
      </div>
      <span className="w-5 text-sm font-semibold text-right ml-2">{value}</span>
    </div>
  );
};

const PipeLineSnapshot = () => {
  const { jobs } = useJobs();

  const statJobCountsArray = Object.entries(getStatCountByStatus(jobs)).map(([key, value]) => ({
    label: key,
    value,
  }));

  const maxValue = Math.max(...statJobCountsArray.map((d) => d.value), 1);

  return (
    <div className="grid grid-rows-[auto_5fr] gap-2">
      <div>
        <p className="font-semibold text-lg">Pipeline snapshot</p>
      </div>
      <div className="grid">
        {statJobCountsArray.map((stage) => (
          <PipelineBarRow key={stage.label} label={stage.label} value={stage.value} maxValue={maxValue} />
        ))}
      </div>
    </div>
  );
};

export default PipeLineSnapshot;
