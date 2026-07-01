import DashboardHeader from '@/pages/dashboard/components/DashboardHeader';
import UpcomingDeadlines from '@/pages/dashboard/components/UpcomingDeadlines';
// import PipeLineSnapshot from '@/features/jobs/components/pipeline/PipeLineSnapshot';
import RecentActivity from '@/pages/dashboard/components/RecentActivity/RecentActivity';
import StatBar from '@/shared/components/StatBar/StatBar';
import StageConversionFunnel from '@/pages/Dashboard/components/StageConversionFunnel';

const Dashboard = () => {
  return (
    <div className="grid grid-rows-[1fr_1fr_2fr_1fr] h-full gap-2 px-2 pb-4">
      {/* Dashboard Top */}
      <DashboardHeader />
      {/* StatBar */}
      <StatBar />

      <div className="grid grid-cols-[2fr_3fr] gap-2">
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
