import StatBar from '../features/jobs/components/StatBar';

import DashboardTop from '../shared/components/DashboardTop';
import UpcomingDeadlines from '../shared/components/UpcomingDeadlines';
import PipeLineSnapshot from '../shared/components/PipeLineSnapshot';
import RecentActivity from '../shared/components/RecentActivity';

const Dashboard = () => {
  return (
    <>
      {/* Dashboard Top */}
      <DashboardTop />
      {/* StatBar */}
      <StatBar />
      <div className="flex flex-row gap-3 w-full mb-2">
        {/* Upcoming Deadlines */}
        <UpcomingDeadlines />
        {/* Pipeline Breakdown */}
        <PipeLineSnapshot />
      </div>

      {/* Recent Activity */}
      <RecentActivity />
    </>
  );
};

export default Dashboard;
