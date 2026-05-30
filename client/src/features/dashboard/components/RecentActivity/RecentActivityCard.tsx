import { Clock3 } from 'lucide-react';
import { useNavigate } from 'react-router';

const RecentActivityCard = ({ activity, id }) => {
  const navigate = useNavigate();

  function getDaysBehind(date) {
    // const today = new Date();

    return new Date(date).toLocaleDateString('en');
  }

  return (
    <div
      className="flex flex-col rounded-md px-3 py-3 border border-gray-200 flex-1 bg-white cursor-pointer transition-colors duration-200 hover:bg-gray-50 hover:border-gray-300"
      onClick={() => navigate(`/jobs/${id}`)}
    >
      <div className="flex items-center justify-between mb-1">
        <div>
          <div className="font-semibold leading-tight text-sm">
            {activity.companyName}
          </div>
        </div>
        <span className="px-3 py-[2px] rounded-full border text-xs font-medium">
          {activity.status}
        </span>
      </div>
      <div className="text-[0.97rem] font-normal mb-4">{activity.jobRole}</div>
      <div className="mt-auto text-xs text-gray-500 flex items-center gap-1">
        <span className="inline-block relative top-px">
          <Clock3 size={14} strokeWidth={1.2} />
        </span>
        <span>{getDaysBehind(activity.updatedAt)}</span>
      </div>
    </div>
  );
};

export default RecentActivityCard;
