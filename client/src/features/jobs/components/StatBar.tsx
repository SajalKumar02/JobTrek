type Stat = {
  label: string;
  value: string | number;
  sub: string;
};

const StatPill = ({ label, value, sub }: Stat) => (
  <div className="bg-white rounded-xl shadow hover:shadow-lg transition flex flex-col items-center p-5">
    <div className="text-xs text-gray-400 uppercase tracking-wide mb-1">
      {label}
    </div>
    <div className="text-2xl font-semibold text-blue-800 mb-1">{value}</div>
    <div className="text-xs text-blue-500 font-bold">{sub}</div>
  </div>
);

const StatBar = ({ statJobs }) => {
  // Create stats array from statJobs prop
  const stats: Stat[] = [
    {
      label: 'Total',
      value: statJobs.total ?? 0,
      sub: 'all time',
    },
    {
      label: 'Active',
      value: statJobs.active ?? 0,
      sub: 'in progress',
    },
    {
      label: 'Interviews',
      value: statJobs.interview ?? 0,
      sub: 'scheduled',
    },
    {
      label: 'Offers',
      value: statJobs.offers ?? 0,
      sub: 'received',
    },
    {
      label: 'Response rate',
      value:
        typeof statJobs.responseRate === 'number'
          ? `${statJobs.responseRate}%`
          : '0%',
      sub: 'above avg',
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5 w-full">
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
