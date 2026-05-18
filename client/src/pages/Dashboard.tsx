import { getTodayWithDay } from '../shared/utils/date';

const Dashboard = () => {
  const todayString = getTodayWithDay();

  return (
    <div className="flex flex-col md:flex-row justify-between items-center mb-8 rounded-lg bg-white shadow w-full px-6 py-6">
      <div className="flex flex-col">
        <h1 className="text-2xl font-bold text-blue-700 tracking-tight">
          JobTrek
        </h1>
        <p className="text-gray-600 text-sm mt-1">
          {todayString}
          &nbsp;·&nbsp;{' '}
          <span className="font-medium text-blue-700">
            12 applications tracked
          </span>
        </p>
      </div>
      <button className="mt-4 md:mt-0 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold rounded px-5 py-2 shadow transition">
        + Add application ↗
      </button>
    </div>
  );
};

export default Dashboard;
