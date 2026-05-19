type Stat = {
  label: string;
  value: string | number;
  sub: string;
  colorClass?: string;
};

const StatPill = ({ label, value, sub, colorClass }: Stat) => (
  <div className="rounded-lg border border-[#393939] bg-[#22252a] flex flex-col items-start px-5 py-3 shadow transition">
    <div className="text-xs text-gray-400 uppercase tracking-wider font-semibold mb-0.5">
      {label}
    </div>
    <div
      className={`text-lg font-bold mb-0.5 drop-shadow-sm ${
        colorClass || 'text-white'
      }`}
    >
      {value}
    </div>
    <div className="text-xs text-gray-300 font-normal tracking-wide">{sub}</div>
  </div>
);

const StatBar = ({ statJobs }) => {
  const stats: Stat[] = [
    {
      label: 'TOTAL',
      value: statJobs.total ?? 0,
      sub: 'all time',
      colorClass: 'text-white',
    },
    {
      label: 'ACTIVE',
      value: statJobs.active ?? 0,
      sub: 'not rejected',
      colorClass: 'text-blue-400',
    },
    {
      label: 'INTERVIEWS',
      value: statJobs.interview ?? 0,
      sub: 'scheduled',
      colorClass: 'text-white',
    },
    {
      label: 'OFFERS',
      value: statJobs.offers ?? 0,
      sub: 'received',
      colorClass: 'text-green-400',
    },
    {
      label: 'RESPONSE RATE',
      value:
        typeof statJobs.responseRate === 'number'
          ? `${statJobs.responseRate}%`
          : '0%',
      sub: 'of applied jobs',
      colorClass: 'text-white',
    },
  ];

  return (
    <div className="grid grid-cols-5 space-x-3 w-full py-2 px-1 bg-transparent justify-start">
      {stats.map((stat, i) => (
        <StatPill
          key={i}
          label={stat.label}
          value={stat.value}
          sub={stat.sub}
          colorClass={stat.colorClass}
        />
      ))}
    </div>
  );
};

export default StatBar;
