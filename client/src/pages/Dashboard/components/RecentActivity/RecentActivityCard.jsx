import { useNavigate } from 'react-router';

import { Clock3 } from 'lucide-react';

import { getCustomDate } from '@/shared/utils/date.utils';

const RecentActivityCard = ({ activity, id }) => {
  const navigate = useNavigate();

  function getDaysBehind(date) {
    return getCustomDate(date);
  }

  return (
    <div className="app-card flex flex-col md:w-1/6" onClick={() => navigate(`/jobs/${id}`)}>
      <div className="flex flex-row justify-between">
        <span className="font-semibold leading-tight text-sm self-center">
          {activity.companyName}
        </span>
        <span className="px-3 py-[2px] rounded-full border text-xs font-medium">
          {activity.status}
        </span>
      </div>
      <span className="text-[0.97rem] font-normal mb-4">{activity.jobTitle}</span>
      <div className="flex flex-row text-xs text-gray-500 items-center gap-4">
        <span className="">
          <Clock3 />
        </span>
        <span>{getDaysBehind(activity.updatedAt)}</span>
      </div>
    </div>
  );
};

export default RecentActivityCard;
