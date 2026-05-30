import StatBar from '../features/jobs/components/StatBar';

import DashboardTop from '../features/dashboard/components/DashboardTop';
import UpcomingDeadlines from '../features/dashboard/components/UpcomingDeadlines';
import PipeLineSnapshot from '../features/dashboard/components/PipeLineSnapshot';
import RecentActivity from '../features/dashboard/components/RecentActivity';

const Dashboard = () => {
  return (
    <div className="grid h-full gap-2 px-2 pb-4">
      {/* Dashboard Top */}
      <DashboardTop />
      {/* StatBar */}
      <StatBar />
      <div className="grid grid-cols-[3fr_2fr] gap-2">
        {/* Upcoming Deadlines */}
        <UpcomingDeadlines />
        {/* Pipeline Breakdown */}
        <PipeLineSnapshot />
      </div>

      {/* Recent Activity */}
      <RecentActivity />
    </div>
  );
};

export default Dashboard;
