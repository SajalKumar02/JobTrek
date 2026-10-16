import { useNavigate } from 'react-router';

import { Clock3 } from 'lucide-react';

import { getCustomDate } from '@/shared/utils/date.utils';

const RecentActivityCard = ({ activity, id }) => {
  const navigate = useNavigate();

  function getDaysBehind(date) {
    return getCustomDate(date);
  }

  return (
    <div
      className="app-card flex flex-1 cursor-pointer flex-col md:w-1/6"
      onClick={() => navigate(`/jobs/${id}`)}
    >
      <div className="flex flex-row justify-between gap-2">
        <span className="self-center text-[14px] leading-[1.29] font-semibold tracking-[-0.224px] text-ink">
          {activity.companyName}
        </span>
        <span className="chip-pill mb-auto px-3 py-1 text-[12px] leading-none">
          {activity.status}
        </span>
      </div>
      <span className="mb-4 text-[17px] leading-[1.47] tracking-[-0.374px] text-ink-muted-80">
        {activity.jobTitle}
      </span>
      <div className="flex flex-row items-center gap-2 text-[12px] leading-none tracking-[-0.12px] text-ink-muted-48">
        <Clock3 size={14} />
        <span>{getDaysBehind(activity.updatedAt)}</span>
      </div>
    </div>
  );
};

export default RecentActivityCard;
