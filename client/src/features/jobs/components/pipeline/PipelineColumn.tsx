import JobCard from './JobCard';

const PipelineColumn = ({ title = '', count = 0, jobs = [] }) => {
  return (
    <div className="flex flex-col flex-1">
      {/* Table Header */}
      <div
        className={`sticky top-0 z-10 bg-white border-b-3 rounded-t-l 
          ${
            title.toLowerCase() === 'wishlist'
              ? 'text-gray-400'
              : title === 'Applied'
                ? 'border-b-cyan-500'
                : title === 'OA'
                  ? 'border-b-yellow-800'
                  : title === 'Interview'
                    ? 'border-b-indigo-500'
                    : title === 'Offer'
                      ? 'border-b-green-400'
                      : title === 'Rejected'
                        ? 'border-red-500'
                        : ''
          }
         `}
      >
        <div className="flex items-center justify-between px-3 py-2">
          <span className="font-semibold text-gray-800">{title}</span>
          <span className="bg-blue-100 text-blue-700 px-2 py-0.5 rounded text-xs font-medium ml-2">
            {count}
          </span>
        </div>
      </div>
      {/* Table Body */}
      <div className="flex-1 flex flex-col divide-y divide-gray-100 bg-white border-b border-x border-gray-200 rounded-b-lg">
        {jobs.length === 0 ? (
          <div className="flex-1 flex items-center justify-center py-6 text-gray-400 text-sm">
            No jobs in this stage.
          </div>
        ) : (
          jobs.map((job) => (
            <div className="px-3 py-2" key={job._id}>
              <JobCard
                companyName={job.companyName}
                jobRole={job.jobRole}
                jobType={job.jobType}
                importantDates={job.importantDates}
                _id={job._id}
              />
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default PipelineColumn;
