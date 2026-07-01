import { Briefcase, LayoutDashboard, Settings } from 'lucide-react';

export const NAV_ITEMS = [
  {
    section: 'Main',
    items: [
      { label: 'Dashboard', icon: LayoutDashboard, to: '/dashboard' },
      { label: 'Jobs', icon: Briefcase, to: '/jobs', badge: true },
    ],
  },
  {
    section: 'Account',
    items: [{ label: 'Settings', icon: Settings, to: '/settings' }],
  },
];
