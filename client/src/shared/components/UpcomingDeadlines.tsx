import { CalendarDays } from 'lucide-react';

type Deadline = {
  company: string;
  label: string;
  dateLabel: string;
  isPrimary: boolean;
  isTomorrow?: boolean;
};

const sampleDeadlines: Deadline[] = [
  {
    company: 'Flipkart',
    label: 'OA deadline',
    dateLabel: 'Tomorrow',
    isPrimary: true,
    isTomorrow: true,
  },
  {
    company: 'Razorpay',
    label: 'Interview round 1',
    dateLabel: 'May 27',
    isPrimary: false,
  },
  {
    company: 'Swiggy',
    label: 'Application closes',
    dateLabel: 'May 30',
    isPrimary: false,
  },
  {
    company: 'Swiggy',
    label: 'Application closes',
    dateLabel: 'May 30',
    isPrimary: false,
  },
];

const UpcomingDeadlines = () => {
  return (
    <div className="flex-3/5 bg-white rounded-lg px-3 py-2 w-full mx-auto border border-gray-300 shadow-sm">
      <div className="flex items-center justify-between mb-1">
        <span className="font-semibold text-sm">Upcoming deadlines</span>
        <span className="text-xs text-gray-500">next 7 days</span>
      </div>
      <div className="flex flex-col gap-1">
        {sampleDeadlines.map((d) => (
          <div
            key={d.company + d.label}
            className={
              d.isPrimary
                ? 'flex items-center gap-2 bg-gray-200 rounded-md px-2 py-2 border-0'
                : 'flex items-center gap-2 bg-transparent rounded-md border border-gray-300 px-2 py-2'
            }
            style={{ minHeight: '36px' }}
          >
            <div className="shrink-0">
              <div
                className={
                  d.isPrimary
                    ? 'w-5 h-5 rounded-md flex items-center justify-center bg-gray-300'
                    : 'w-5 h-5 rounded-md flex items-center justify-center bg-white'
                }
              >
                <CalendarDays
                  size={14}
                  className={d.isPrimary ? 'text-black' : 'text-gray-500'}
                  strokeWidth={2}
                />
              </div>
            </div>
            <div className="flex flex-col grow leading-none">
              <span className="font-semibold text-sm leading-tight truncate">
                {d.company}
              </span>
              <span className="text-xs text-gray-600 truncate">{d.label}</span>
            </div>
            <div className="flex flex-col items-end">
              <span
                className={
                  d.isPrimary
                    ? 'text-black font-medium text-xs'
                    : 'text-gray-600 text-xs'
                }
              >
                {d.dateLabel}
              </span>
            </div>
          </div>
        ))}
      </div>
      <div className="text-center text-gray-400 text-xs mt-2">
        No more deadlines this week
      </div>
    </div>
  );
};

export default UpcomingDeadlines;
