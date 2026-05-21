import StatBar from '../features/jobs/components/StatBar';
import { useJobs } from '../features/jobs/hooks/useJobs';
import { getTodayWithDay } from '../shared/utils/date';

const Dashboard = () => {
  const todayString = getTodayWithDay();

  const { setShowCreateModal, countJobs } = useJobs();

  return (
    <>
      {/* Dashboard Top */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-2 rounded-lg bg-white shadow w-full px-6 py-6">
        <div className="flex flex-col">
          <h1 className="text-2xl font-bold text-blue-700 tracking-tight">
            JobTrek
          </h1>
          <p className="text-gray-600 text-sm mt-1">
            {todayString}
            &nbsp;·&nbsp;{' '}
            <span className="font-medium text-blue-700">
              {countJobs()} applications tracked
            </span>
          </p>
        </div>
        <button
          className="mt-4 md:mt-0 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold rounded px-5 py-2 shadow transition"
          onClick={() => setShowCreateModal()}
        >
          + Add application{' '}
          <span className="inline-block align-middle ml-1">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <path
                d="M9 7H17V15"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M7 17L17 7"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
        </button>
      </div>
      <StatBar />
    </>
  );
};

export default Dashboard;
