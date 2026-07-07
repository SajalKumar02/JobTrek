import { useNavigate } from 'react-router';

import { useDraggable } from '@dnd-kit/react';

const JobCard = ({ companyName, jobTitle, employementType, importantDates, _id }) => {
  const { ref } = useDraggable({
    id: _id,
  });

  const navigate = useNavigate();

  const handleClick = () => {
    if (_id) {
      navigate(`/jobs/${_id}`);
    }
  };

  const lastDate =
    importantDates && importantDates.length > 0
      ? importantDates[importantDates.length - 1]
      : undefined;

  return (
    <div
      ref={ref}
      className=" bg-white rounded-lg shadow flex flex-col gap-2 p-3 border border-gray-200 hover:shadow-lg cursor-pointer transition"
      onClick={handleClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') handleClick();
      }}
    >
      <div className="flex items-center justify-between mb-1">
        <div className="font-bold text-base text-gray-800 truncate">{companyName}</div>
        <span
          className={
            (employementType === 'full time'
              ? 'bg-green-100 text-green-700'
              : employementType === 'internship'
                ? 'bg-yellow-100 text-yellow-700'
                : employementType === 'contract'
                  ? 'bg-purple-100 text-purple-700'
                  : employementType === 'freelancing'
                    ? 'bg-pink-100 text-pink-700'
                    : employementType === 'part time'
                      ? 'bg-blue-100 text-blue-700'
                      : 'bg-gray-100 text-gray-700') +
            ' px-2 py-0.5 rounded-full text-[11px] font-semibold ml-2'
          }
        >
          {employementType.replace(/\b\w/g, (l) => l.toUpperCase())}
        </span>
      </div>
      <div className="text-gray-600 text-sm font-medium">{jobTitle}</div>
      <div className="flex items-center mt-1 space-x-2 text-xs">
        {(lastDate?.label || lastDate?.date) && (
          <div className="flex items-center justify-between bg-blue-50 text-blue-700 px-2 py-0.5 rounded">
            <span className="font-semibold">{lastDate?.label && `${lastDate.label} `}</span>
            <span className="ms-2">
              {lastDate?.date && new Date(lastDate.date).toLocaleDateString()}
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default JobCard;
