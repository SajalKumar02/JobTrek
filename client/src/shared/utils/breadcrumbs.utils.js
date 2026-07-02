import { LayoutDashboard, Briefcase, Settings } from 'lucide-react';

export const useBreadcrumb = (location, jobId) => {
  const path = location.pathname;

  if (path.startsWith('/jobs/') && jobId) {
    return { label: 'Jobs / Detail', icon: Briefcase };
  } else if (path === '/jobs') {
    return { label: 'Jobs', icon: Briefcase };
  } else if (path === '/dashboard') {
    return { label: 'Dashboard', icon: LayoutDashboard };
  } else if (path === '/settings') {
    return { label: 'Settings', icon: Settings };
  } else {
    return undefined;
  }
};
