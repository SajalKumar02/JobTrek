import React from 'react';

const filters = [
  { label: 'All', value: 'all' },
  { label: 'Full Time', value: 'full time' },
  { label: 'Internship', value: 'internship' },
  { label: 'Contract', value: 'contract' },
  { label: 'Freelancing', value: 'freelancing' },
  { label: 'Part Time', value: 'part time' },
];

const JobTypesFilterPills = () => {
  const [selected, setSelected] = React.useState(filters[0].value);

  return (
    <div className="flex gap-2 px-2 py-2 rounded-md">
      {filters.map((filter) => (
        <button
          key={filter.value}
          onClick={() => setSelected(filter.value)}
          className={`px-4 py-1 rounded-full text-sm font-medium transition-colors text-gray-700 hover:text-gray-50
            ${
              selected === filter.value
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
