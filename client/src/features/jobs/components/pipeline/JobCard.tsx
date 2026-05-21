import React from 'react';
import { useNavigate } from 'react-router';

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
  _id: string;
}

const JobCard: React.FC<JobCardProps> = ({
  companyName,
  jobRole,
  jobType,
  importantDates,
  _id,
}) => {
  const firstDate =
    importantDates && importantDates.length > 0 ? importantDates[0] : undefined;

  const navigate = useNavigate();

  const handleClick = () => {
    if (_id) {
      navigate(`/jobs/${_id}`);
    }
  };

  return (
    <div
      className="bg-white rounded-lg shadow flex flex-col gap-2 p-4 border border-gray-200 hover:shadow-lg cursor-pointer transition"
      onClick={handleClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') handleClick();
      }}
    >
      <div className="flex items-center justify-between mb-1">
        <div className="font-bold text-base text-gray-800 truncate">
          {companyName}
        </div>
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
            ' px-2 py-0.5 rounded-full text-[11px] font-semibold ml-2'
          }
        >
          {jobType.replace(/\b\w/g, (l) => l.toUpperCase())}
        </span>
      </div>
      <div className="text-gray-600 text-sm font-medium">{jobRole}</div>
      <div className="flex items-center mt-1 space-x-2 text-xs">
        {firstDate && (
          <div className="flex items-center bg-blue-50 text-blue-700 px-2 py-0.5 rounded">
            <span className="font-semibold">
              {firstDate.label ? `${firstDate.label} ` : ''}
            </span>
            <span>
              {firstDate.date
                ? new Date(firstDate.date).toLocaleDateString()
                : ''}
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default JobCard;
