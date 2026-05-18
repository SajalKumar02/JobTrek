import React from 'react';

interface ImportantDate {
  label: string;
  date: string;
}

export interface JobCardProps {
  companyName: string;
  jobRole: string;
  jobType:
    | 'full time'
    | 'internship'
    | 'contract'
    | 'freelancing'
    | 'part time';
  importantDates?: ImportantDate[];
}

const JobCard: React.FC<JobCardProps> = ({
  companyName,
  jobRole,
  jobType,
  importantDates,
}) => {
  const firstDate =
    importantDates && importantDates.length > 0 ? importantDates[0] : undefined;

  return (
    <div className="bg-gray-100 rounded p-3">
      <div className="font-semibold text-sm">{companyName}</div>
      <div className="text-gray-700 mb-1 text-xs">{jobRole}</div>
      <div className="flex gap-2 text-[10px] text-gray-500">
        {firstDate && (
          <span>
            {firstDate.label ? `${firstDate.label} ` : ''}
            {firstDate.date
              ? new Date(firstDate.date).toLocaleDateString()
              : ''}
          </span>
        )}
        <span
          className={
            (jobType === 'full time'
              ? 'bg-green-100 text-green-700'
              : jobType === 'internship'
                ? 'bg-yellow-100 text-yellow-700'
                : jobType === 'contract'
                  ? 'bg-purple-100 text-purple-700'
                  : jobType === 'freelancing'
                    ? 'bg-pink-100 text-pink-700'
                    : jobType === 'part time'
                      ? 'bg-blue-100 text-blue-700'
                      : 'bg-gray-100 text-gray-700') +
            ' px-2 rounded text-[10px]'
          }
        >
          {jobType.replace(/\b\w/g, (l) => l.toUpperCase())}
        </span>
      </div>
    </div>
  );
};

export default JobCard;
