import * as lucideReact from 'lucide-react';

export const useBreadcrumb = (location, jobId) => {
  const path = location.pathname;

  if (path.startsWith('/jobs/') && jobId) {
    return { label: 'Jobs / Detail', icon: lucideReact.Briefcase };
  } else if (path === '/jobs/new') {
    return { label: 'Jobs / New', icon: lucideReact.PlusSquare };
  } else if (path === '/jobs') {
    return { label: 'Jobs', icon: lucideReact.Briefcase };
  } else if (path === '/dashboard') {
    return { label: 'Dashboard', icon: lucideReact.LayoutDashboard };
  } else if (path === '/setting') {
    return { label: 'Settings', icon: lucideReact.Settings };
  } else {
    return undefined;
  }
};
