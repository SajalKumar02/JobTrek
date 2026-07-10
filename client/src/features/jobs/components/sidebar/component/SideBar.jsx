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
    <div className="flex h-full w-60 flex-col bg-slate-900">
      {/* Header */}
      <div className="flex flex-col gap-2 border-b border-slate-800/80 px-4 py-3.5">
        <div className="flex flex-row justify-between gap-2">
          <button
            onClick={() => navigate('/')}
            className="flex cursor-pointer flex-row items-center gap-2"
            type="button"
          >
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-linear-to-br from-blue-500 to-indigo-600 shadow-sm shadow-blue-900/40">
              <LineChart className="text-white" size={17} />
            </span>
            <span className="ml-0.5 text-base font-bold tracking-tight text-white">
              JobTrek
            </span>
          </button>
          <button
            onClick={toggleSidebar}
            className="rounded-md p-2 text-slate-400 transition-colors duration-150 hover:bg-slate-800 hover:text-slate-100"
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
            <p className="mb-1.5 px-2.5 text-[10px] font-semibold uppercase tracking-[0.09em] text-slate-500">
              {section}
            </p>
            {items.map(({ label, icon: Icon, to, badge }) => (
              <NavLink
                key={to}
                to={to}
                className={({ isActive }) =>
                  [
                    'group relative mb-0.5 flex w-full items-center gap-2.5 rounded-lg px-2.5 py-2 text-[14px] transition-colors duration-100',
                    isActive
                      ? 'bg-slate-800 font-semibold text-white'
                      : 'text-slate-400 hover:bg-slate-800/60 hover:text-white',
                  ].join(' ')
                }
              >
                {({ isActive }) => (
                  <>
                    {isActive && (
                      <span className="absolute left-0 top-1/2 h-4 w-[3px] -translate-y-1/2 rounded-r-full bg-blue-500" />
                    )}
                    <Icon
                      size={17}
                      className={
                        isActive
                          ? 'text-blue-400'
                          : 'text-slate-500 group-hover:text-slate-300'
                      }
                    />
                    <span className="flex-1">{label}</span>
                    {badge && (
                      <span
                        className={[
                          'ml-1 rounded-full px-2 py-px text-[11px] font-semibold',
                          isActive
                            ? 'bg-blue-500/15 text-blue-300'
                            : 'bg-slate-800 text-slate-400',
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
      <div className="mt-auto border-t border-slate-800/80 px-2.5 pb-2.5 pt-2.5">
        <div className="flex items-center gap-2.5 rounded-lg px-1.5 py-2">
          <div className="flex h-[34px] w-[34px] shrink-0 items-center justify-center rounded-full border border-slate-700 bg-linear-to-br from-blue-900 to-slate-800 text-blue-400">
            <Users size={18} />
          </div>

          <div className="min-w-0 flex-1">
            <div className="truncate text-[13.5px] font-bold text-white">
              {user && user.username}
            </div>
            <div className="truncate text-[11px] text-slate-500">
              {user && user.email}
            </div>
          </div>
        </div>
        <button
          onClick={handleLogOut}
          className="group mt-1 flex w-full items-center gap-2 rounded-lg px-1.5 py-2 text-[13px] text-slate-400 transition-colors hover:bg-red-950/60 hover:text-red-400 cursor-pointer"
        >
          <LogOut
            size={16}
            className="text-slate-500 transition-colors group-hover:text-red-400"
          />
          <span>Log out</span>
        </button>
      </div>
    </div>
  );
};

export default SideBar;
