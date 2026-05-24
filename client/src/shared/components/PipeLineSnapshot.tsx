import React from 'react';

const pipelineData = [
  {
    label: 'Wishlist',
    value: 6,
  },
  {
    label: 'Applied',
    value: 10,
  },
  {
    label: 'OA',
    value: 4,
  },
  {
    label: 'Interview',
    value: 4,
  },
  {
    label: 'Offer',
    value: 1,
  },
];

const maxValue = Math.max(...pipelineData.map((d) => d.value), 1);

const PipelineBarRow: React.FC<{
  label: string;
  value: number;
  maxValue: number;
}> = ({ label, value, maxValue }) => {
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
  return (
    <div className="dashboard-card grid grid-rows-[auto_5fr] gap-2 p-4">
      <div>
        <p className="font-semibold text-lg">Pipeline snapshot</p>
      </div>
      <div className="grid">
        {pipelineData.map((stage) => (
          <PipelineBarRow
            key={stage.label}
            label={stage.label}
            value={stage.value}
            maxValue={maxValue}
          />
        ))}
      </div>
    </div>
  );
};

export default PipeLineSnapshot;
