import DashboardHeader from '@/pages/Dashboard/components/DashboardHeader';
import UpcomingDeadlines from '@/pages/Dashboard/components/UpcomingDeadlines';
import RecentActivity from '@/pages/Dashboard/components/RecentActivity/RecentActivity';
import StatBar from '@/shared/components/StatBar/StatBar';
import StageConversionFunnel from '@/pages/Dashboard/components/StageConversionFunnel';

const Dashboard = () => {
  return (
    <div className="grid gap-6 p-6">
      <DashboardHeader />

      <StatBar />

      <div className="grid gap-6 md:grid-cols-[2fr_3fr]">
        <UpcomingDeadlines />
        <StageConversionFunnel />
      </div>

      <RecentActivity />
    </div>
  );
};

export default Dashboard;
