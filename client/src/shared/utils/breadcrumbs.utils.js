import { LayoutDashboard, Briefcase, Settings } from 'lucide-react';

export const useBreadcrumb = (location, jobId) => {
  const path = location.pathname;

  switch (true) {
    case path.startsWith('/jobs/') && jobId:
      return { label: 'Jobs / Detail', Icon: Briefcase };
    case path === '/jobs':
      return { label: 'Jobs', Icon: Briefcase };
    case path === '/dashboard':
      return { label: 'Dashboard', Icon: LayoutDashboard };
    case path === '/settings':
      return { label: 'Settings', Icon: Settings };
    default:
      return undefined;
  }
};
