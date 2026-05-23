import { useJobs } from '../../features/jobs/hooks/useJobs';
import { getTodayWithDay } from '../utils/date';

const DashboardTop = () => {
  const todayString = getTodayWithDay();

  const { setShowCreateModal, countJobs } = useJobs();

  return (
    <div className="flex flex-row justify-between items-center mb-2 rounded-lg bg-white shadow w-full px-6 py-6">
      <div className="flex flex-col">
        <h1 className="text-2xl font-bold tracking-tight">JobTrek</h1>
        <p className="text-sm mt-1">
          {todayString}
          &nbsp;·&nbsp;{' '}
          <span className="font-medium">
            {countJobs()} applications tracked
          </span>
        </p>
      </div>
      <button
        className="mt-4 md:mt-0 text-sm font-semibold rounded px-5 py-2 shadow transition border border-gray-400 bg-white text-black"
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
  );
};

export default DashboardTop;
