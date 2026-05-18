const stats = [
  {
    label: 'Total',
    value: 12,
    sub: 'all time',
  },
  {
    label: 'Active',
    value: 7,
    sub: 'in progress',
  },
  {
    label: 'Interviews',
    value: 2,
    sub: 'scheduled',
  },
  {
    label: 'Offers',
    value: 1,
    sub: 'received',
  },
  {
    label: 'Response rate',
    value: '42%',
    sub: 'above avg',
  },
];

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

const StatBar = () => {
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
