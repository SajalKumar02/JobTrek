import { useMemo } from 'react';
import { useDroppable } from '@dnd-kit/react';

import {
  getJobsThroughStatus,
  getJobsViaEmployementType,
  getJobsForSearch,
} from '@/features/jobs/components/pipeline/utils';

import { useJobs } from '@/features/jobs';

import JobCard from '@/features/jobs/components/pipeline/components/JobCard';

function Droppable({ title, children }) {
  const { ref } = useDroppable({
    id: title.toLowerCase(),
  });

  return <div ref={ref}>{children}</div>;
}

const PipelineColumn = ({ title = '' }) => {
  const { jobs, filterString, searchString } = useJobs();

  const filteredJobs = useMemo(() => {
    let jobsByStatus = getJobsThroughStatus(jobs, title);
    if (filterString !== 'all') {
      jobsByStatus = getJobsViaEmployementType(jobsByStatus, filterString);
    }
    if (searchString !== '') {
      jobsByStatus = getJobsForSearch(jobsByStatus, searchString);
    }
    return jobsByStatus;
  }, [jobs, title, filterString, searchString]);

  const count = filteredJobs.length;

  return (
    <div className="flex flex-col w-70 min-w-[20rem] max-w-xs">
      {/* Table Header */}
      <div
        className={`sticky top-0 z-10 bg-white border-b-3 rounded-t-l 
          ${title.toLowerCase() === 'wishlist' ? 'text-gray-400' : title === 'Applied' ? 'border-b-cyan-500' : title === 'OA' ? 'border-b-yellow-800' : title === 'Interview' ? 'border-b-indigo-500' : title === 'Offer' ? 'border-b-green-400' : title === 'Rejected' ? 'border-red-500' : ''}
         `}
      >
        <div className="flex sticky top-0 items-center justify-between px-3 py-2">
          <span className="font-semibold text-gray-800">{title}</span>
          <span className="bg-blue-100 text-blue-700 px-2 py-0.5 rounded text-xs font-medium ml-2">
            {count}
          </span>
        </div>
      </div>
      {/* Table Body */}
      <Droppable title={title}>
        <div className="flex-1 flex flex-col bg-white border-b border-x border-gray-200 rounded-b-lg h-full p-2 gap-2">
          {filteredJobs.length === 0 ? (
            <div className="flex-1 flex items-center justify-center py-6 text-gray-400 text-sm h-full">
              No jobs in this stage.
            </div>
          ) : (
            filteredJobs.map((job) => (
              <JobCard
                key={job._id}
                companyName={job.companyName}
                jobTitle={job.jobTitle}
                employementType={job.employementType ? job.employementType : 'Unknown'}
                importantDates={job.importantDates}
                _id={job._id}
              />
            ))
          )}
        </div>
      </Droppable>
    </div>
  );
};

export default PipelineColumn;
