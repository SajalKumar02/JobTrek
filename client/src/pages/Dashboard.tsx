import StatBar from '../features/jobs/components/StatBar';

import DashboardTop from '../shared/components/DashboardTop';
import UpcomingDeadlines from '../shared/components/UpcomingDeadlines';
import PipeLineSnapshot from '../shared/components/PipeLineSnapshot';
import RecentActivity from '../shared/components/RecentActivity';

const Dashboard = () => {
  return (
    <div className="grid gap-2 px-2 pb-4">
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
