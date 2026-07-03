const StatPill = ({ label, value, sub }) => (
  <div className="flex flex-col border border-gray-300 shadow-sm rounded-lg items-start transition p-4">
    <span className="text-sm text-gray-600 uppercase tracking-wider font-semibold">{label}</span>
    <span className="text-2xl">{value}</span>
    <span className="text-sm text-gray-900 font-normal tracking-wide">{sub}</span>
  </div>
);

export default StatPill;
