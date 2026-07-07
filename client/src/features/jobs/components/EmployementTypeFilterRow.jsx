import { filterOptions } from '@/features/jobs/constants';
import { useJobs } from '@/features/jobs/context/useJobs';

const EmployementTypeFilterRow = () => {
  const { filterString, handleSetFilter } = useJobs();

  return (
    <div className="flex flex-row overflow-x-auto gap-2 p-1">
      {filterOptions.map((filter) => (
        <button
          key={filter.value}
          onClick={() => handleSetFilter(filter.value)}
          className={`flex items-center px-4 py-1 rounded-2xl md:rounded-full text-sm font-medium transition-colors
            ${filterString === filter.value ? 'bg-neutral-900 text-white shadow' : 'bg-transparent border border-neutral-700 text-gray-700 hover:bg-neutral-800 hover:text-gray-50'}
            focus:outline-none`}
        >
          <span>{filter.label}</span>
        </button>
      ))}
    </div>
  );
};

export default EmployementTypeFilterRow;
