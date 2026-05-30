const StatPill = ({ label, value, sub }) => (
  <div className="dashboard-card flex flex-col items-start px-5 py-3 transition">
    <div className="text-[0.85rem] text-gray-600 uppercase tracking-wider font-semibold mb-1">
      {label}
    </div>
    <div className="text-2xl mb-1 drop-shadow-sm ">{value}</div>
    <div className="text-sm text-gray-900 font-normal tracking-wide">{sub}</div>
  </div>
);

export default StatPill;
