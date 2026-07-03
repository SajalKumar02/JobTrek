import DashboardHeader from '@/pages/Dashboard/components/DashboardHeader';
import UpcomingDeadlines from '@/pages/Dashboard/components/UpcomingDeadlines';
// import PipeLineSnapshot from '@/features/jobs/components/pipeline/PipeLineSnapshot';
// Corrected
import RecentActivity from '@/pages/Dashboard/components/RecentActivity/RecentActivity';
import StatBar from '@/shared/components/StatBar/StatBar';
import StageConversionFunnel from '@/pages/Dashboard/components/StageConversionFunnel';

const Dashboard = () => {
  return (
    <div className="grid gap-2 p-2">
      {/* Dashboard Top */}
      <DashboardHeader />

      {/* StatBar */}
      <StatBar />

      <div className="grid md:grid-cols-[2fr_3fr] gap-2">
        <UpcomingDeadlines />
        <StageConversionFunnel />
      </div>

      {/* Recent Activity */}
      <RecentActivity />
    </div>
  );
};

export default Dashboard;
