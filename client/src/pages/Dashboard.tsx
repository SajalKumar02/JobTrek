import DashboardHeader from '../features/dashboard/components/DashboardHeader';
import UpcomingDeadlines from '../features/dashboard/components/UpcomingDeadlines/UpcomingDeadlines';
// import PipeLineSnapshot from '../features/jobs/components/pipeline/PipeLineSnapshot';
import RecentActivity from '../features/dashboard/components/RecentActivity/RecentActivity';
import StatBar from '../shared/components/StatBar/StatBar';
import StageConversionFunnel from '../features/dashboard/components/StageConversionFunnel';

const Dashboard = () => {
  return (
    <div className="grid h-full gap-2 px-2 pb-4">
      {/* Dashboard Top */}
      <DashboardHeader />
      {/* StatBar */}
      <StatBar />
      <div className="grid grid-cols-[3fr_2fr] gap-2">
        {/* Upcoming Deadlines */}
        <UpcomingDeadlines />
        <StageConversionFunnel />
      </div>

      {/* Recent Activity */}
      <RecentActivity />
    </div>
  );
};

export default Dashboard;
