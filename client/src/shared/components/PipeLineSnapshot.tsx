import React from 'react';

// Pipeline snapshot data (static for now)
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

// BarRow Component
const PipelineBarRow: React.FC<{
  label: string;
  value: number;
  maxValue: number;
}> = ({ label, value, maxValue }) => {
  // Calculate percentage for the filled bar
  const percent = Math.max((value / maxValue) * 100, 8); // Set minimum bar width for visibility
  return (
    <div className="flex items-center gap-2 h-7">
      {label !== 'Wishlist' ? (
        <span className="inline-block w-2 h-2 rounded-full mr-2 border border-gray-400 bg-white" />
      ) : (
        <span className="inline-block w-2 h-2 mr-2" />
      )}
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
    <div className="flex-2/5 bg-white rounded-lg px-4 py-3 h-full w-full mx-auto border border-gray-200 shadow-sm">
      <div className="font-semibold text-[1.08rem] mb-2">Pipeline snapshot</div>
      <div className="flex flex-col gap-2">
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
