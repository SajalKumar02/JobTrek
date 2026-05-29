import { Clock3 } from 'lucide-react';

const recentActivities = [
  {
    company: 'Razorpay',
    position: 'SDE 1 Full Stack',
    status: 'Interview',
    statusType: 'interview',
    date: '2 days ago',
  },
  {
    company: 'Swiggy',
    position: 'Backend Engineer',
    status: 'Applied',
    statusType: 'applied',
    date: '3 days ago',
  },
  {
    company: 'Flipkart',
    position: 'SDE Intern',
    status: 'OA',
    statusType: 'oa',
    date: '5 days ago',
  },
];

const statusClass = () => {
  return 'px-3 py-[2px] rounded-full border text-xs font-medium';
};

const RecentActivity = () => {
  '[';
  return (
    <div className="dashboard-card py-4 px-4">
      <div className="flex items-center justify-between mb-3">
        <div className="text-[1.08rem] font-semibold">Recent activity</div>
        <a
          href="#"
          className="text-sm font-medium underline underline-offset-2 cursor-pointer"
        >
          View all &rarr;
        </a>
      </div>
      <div className="grid grid-cols-3 gap-6">
        {recentActivities.map((activity, idx) => (
          <div
            key={idx}
            className="flex flex-col min-w-[225px] rounded-md px-3 py-3 border border-gray-200 flex-1 bg-white"
          >
            <div className="flex items-center justify-between mb-1">
              <div>
                <div className="font-semibold leading-tight text-sm">
                  {activity.company}
                </div>
              </div>
              <span className={statusClass()}>{activity.status}</span>
            </div>
            <div className="text-[0.97rem] font-normal mb-4">
              {activity.position}
            </div>
            <div className="mt-auto text-xs text-gray-500 flex items-center gap-1">
              <span className="inline-block relative top-px">
                <Clock3 size={14} strokeWidth={1.2} />
              </span>
              <span>{activity.date}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentActivity;
