import JobCard from './JobCard';

interface JobInfo {
  companyName: string;
  jobRole: string;
  jobType:
    | 'full time'
    | 'internship'
    | 'contract'
    | 'freelancing'
    | 'part time';
  importantDates?: { label: string; date: string }[];
}

interface PipelineColumnProps {
  title: string;
  count: number;
  jobs: JobInfo[];
}

const PipelineColumn: React.FC<PipelineColumnProps> = ({
  title = '',
  count = 0,
  jobs = [],
}) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-4 flex-1">
      <div className="font-bold text-base mb-3 flex items-center justify-between">
        <span className="text-sm">{title}</span>
        <span className="bg-blue-100 text-blue-700 px-2 py-0.5 rounded text-xs ml-2">
          {count}
        </span>
      </div>
      {jobs.map((job, idx) => (
        <div
          className={idx < jobs.length - 1 ? 'mb-2' : undefined}
          key={job.companyName + job.jobRole}
        >
          <JobCard
            companyName={job.companyName}
            jobRole={job.jobRole}
            jobType={job.jobType}
            importantDates={job.importantDates}
          />
        </div>
      ))}
    </div>
  );
};

export default PipelineColumn;
