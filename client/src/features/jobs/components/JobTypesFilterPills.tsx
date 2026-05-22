import { filterOptions } from '../types/contants';
import { useJobs } from '../hooks/useJobs';

const JobTypesFilterPills = () => {
  const { filterString, handleSetFilter } = useJobs();

  return (
    <div className="flex gap-2 px-2 py-2 rounded-md">
      {filterOptions.map((filter) => (
        <button
          key={filter.value}
          onClick={() => handleSetFilter(filter.value)}
          className={`px-4 py-1 rounded-full text-sm font-medium transition-colors text-gray-700 hover:text-gray-50
            ${
              filterString === filter.value
                ? 'bg-[#191919] text-white shadow'
                : 'bg-transparent border border-[#444] text-gray-50 hover:bg-[#282828]'
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
