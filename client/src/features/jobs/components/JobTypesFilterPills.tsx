import { filterOptions } from '../types/contants';
import { useJobs } from '../hooks/useJobs';

const JobTypesFilterPills = () => {
  const { filterString, handleSetFilter } = useJobs();

  return (
    <div className="grid grid-cols-6 gap-2">
      {filterOptions.map((filter) => (
        <button
          key={filter.value}
          onClick={() => handleSetFilter(filter.value)}
          className={`px-4 py-1 rounded-full text-sm font-medium transition-colors
            ${
              filterString === filter.value
                ? 'bg-neutral-900 text-white shadow'
                : 'bg-transparent border border-neutral-700 text-gray-700 hover:bg-neutral-800 hover:text-gray-50'
            }
            focus:outline-none`}
        >
          {filter.label}
        </button>
      ))}
    </div>
  );
};

export default JobTypesFilterPills;
