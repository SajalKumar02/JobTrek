import { NavLink, useNavigate } from 'react-router';

import { useAuth } from '@/features/auth';
import { useToast } from '@/features/toast';
import { useJobs } from '@/features/jobs';

import { countJobs } from '@/features/jobs/utils';

import { NAV_ITEMS } from '@/features/jobs/components/sidebar/constants';

import { LineChart, LogOut, Users, X } from 'lucide-react';

const SideBar = ({ toggleSidebar }) => {
  const navigate = useNavigate();

  const { user, logOut } = useAuth();
  const { jobs } = useJobs();
  const { showToast } = useToast();

  const appicationsCount = countJobs(jobs);

  const handleLogOut = async (e) => {
    e.preventDefault();
    const { success, message } = await logOut();
    if (success) {
      showToast('success', message);
    } else {
      showToast('warning', message);
    }
  };

  return (
    <div className="flex h-full w-60 flex-col bg-surface-black">
      {/* Header */}
      <div className="flex flex-col gap-2 border-b border-surface-tile-3 px-4 py-3.5">
        <div className="flex flex-row justify-between gap-2">
          <button
            onClick={() => navigate('/')}
            className="flex cursor-pointer flex-row items-center gap-2"
            type="button"
          >
            <span className="flex h-8 w-8 items-center justify-center rounded-sm bg-primary">
              <LineChart className="text-on-primary" size={17} />
            </span>
            <span className="ml-0.5 font-display text-base font-semibold tracking-[-0.12px] text-on-dark">
              JobTrek
            </span>
          </button>
          <button
            onClick={toggleSidebar}
            className="rounded-sm p-2 text-body-muted transition-transform active:scale-95"
            aria-label="Close sidebar"
            type="button"
          >
            <X size={20} />
          </button>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-2 pt-4">
        {NAV_ITEMS.map(({ section, items }) => (
          <div key={section} className="mb-4">
            <p className="mb-1.5 px-2.5 text-[10px] leading-[1.3] font-normal tracking-[-0.08px] text-ink-muted-48 uppercase">
              {section}
            </p>
            {items.map(({ label, icon: Icon, to, badge }) => (
              <NavLink
                key={to}
                to={to}
                className={({ isActive }) =>
                  [
                    'group relative mb-0.5 flex w-full items-center gap-2.5 rounded-sm px-2.5 py-2 text-[12px] leading-none tracking-[-0.12px] transition-colors duration-100',
                    isActive
                      ? 'bg-surface-tile-1 font-normal text-on-dark'
                      : 'text-body-muted',
                  ].join(' ')
                }
              >
                {({ isActive }) => (
                  <>
                    {isActive && (
                      <span className="absolute top-1/2 left-0 h-4 w-[3px] -translate-y-1/2 rounded-r-full bg-primary-on-dark" />
                    )}
                    <Icon
                      size={17}
                      className={
                        isActive ? 'text-primary-on-dark' : 'text-ink-muted-48'
                      }
                    />
                    <span className="flex-1">{label}</span>
                    {badge && (
                      <span
                        className={[
                          'ml-1 rounded-full px-2 py-px text-[11px] font-normal',
                          isActive
                            ? 'bg-primary/15 text-primary-on-dark'
                            : 'bg-surface-tile-1 text-body-muted',
                        ].join(' ')}
                      >
                        {appicationsCount}
                      </span>
                    )}
                  </>
                )}
              </NavLink>
            ))}
          </div>
        ))}
      </nav>

      {/* Bottom */}
      <div className="mt-auto border-t border-surface-tile-3 px-2.5 pt-2.5 pb-2.5">
        <div className="flex items-center gap-2.5 rounded-sm px-1.5 py-2">
          <div className="flex h-[34px] w-[34px] shrink-0 items-center justify-center rounded-full border border-surface-tile-2 bg-surface-tile-1 text-primary-on-dark">
            <Users size={18} />
          </div>

          <div className="min-w-0 flex-1">
            <div className="truncate text-[13.5px] font-semibold text-on-dark">
              {user && user.username}
            </div>
            <div className="truncate text-[11px] text-ink-muted-48">
              {user && user.email}
            </div>
          </div>
        </div>
        <button
          onClick={handleLogOut}
          className="mt-1 flex w-full cursor-pointer items-center gap-2 rounded-sm px-1.5 py-2 text-[13px] text-body-muted transition-transform active:scale-95"
        >
          <LogOut size={16} className="text-ink-muted-48" />
          <span>Log out</span>
        </button>
      </div>
    </div>
  );
};

export default SideBar;
