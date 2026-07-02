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
    <div className={`bg-slate-900 h-full w-55 flex flex-col`}>
      {/* Header */}
      <div className="flex flex-col gap-2 px-4 py-3 border-b border-slate-700 cursor-pointer">
        <div className="flex flex-row gap-2 justify-between">
          <div className="flex flex-row gap-2 items-center" onClick={() => navigate('/')}>
            <LineChart className="text-blue-400" size={22} />
            <span className="text-base font-bold text-white tracking-tight ml-1">JobTrek</span>
          </div>
          <button
            onClick={toggleSidebar}
            className="p-2 rounded-md text-slate-300 hover:text-slate-100 hover:bg-slate-800 transition-colors duration-150"
            aria-label="Close sidebar"
            type="button"
          >
            <X size={22} />
          </button>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-1.5 pt-4">
        {NAV_ITEMS.map(({ section, items }) => (
          <div key={section} className="mb-3">
            <p className="text-[10px] font-semibold tracking-[0.09em] uppercase text-slate-400 px-2.5 mb-1">
              {section}
            </p>
            {items.map(({ label, icon: Icon, to, badge }) => (
              <NavLink
                key={to}
                to={to}
                className={({ isActive }) =>
                  [
                    'flex items-center gap-2.5 px-2.5 py-2 rounded-lg w-full mb-px transition-colors duration-100',
                    isActive
                      ? 'bg-slate-700 text-white font-semibold'
                      : 'text-slate-400 hover:bg-slate-700 hover:text-white',
                    'text-[15px]',
                  ].join(' ')
                }
              >
                {({ isActive }) => (
                  <>
                    <Icon size={17} className={isActive ? 'text-white' : 'text-slate-400'} />
                    <span className="flex-1">{label}</span>
                    {badge && (
                      <span
                        className={[
                          'text-[11px] font-semibold px-2 py-px rounded-full ml-1',
                          isActive ? 'bg-slate-800 text-white' : 'bg-slate-700 text-slate-300',
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
      <div className="px-2.5 pb-2.5 pt-2 border-t border-slate-700 mt-auto">
        <div className="flex items-center gap-2.5 px-1.5 py-2 rounded-lg transition-colors">
          <div className="w-[34px] h-[34px] rounded-full bg-blue-900 flex items-center justify-center text-blue-400 shrink-0 border border-slate-600">
            <Users size={20} className="text-blue-400" />
          </div>

          <div className="flex-1 min-w-0">
            <div className="text-[13.5px] font-bold text-white truncate">{user && user.username}</div>
            <div className="text-[11px] text-slate-400 truncate">{user && user.email}</div>
          </div>
        </div>
        <button
          onClick={handleLogOut}
          className="flex items-center gap-2 px-1.5 py-2 rounded-lg w-full text-[13px] text-slate-400 hover:bg-red-950 hover:text-red-400 transition-colors mt-1 group"
        >
          <LogOut size={16} className="text-slate-400 group-hover:text-red-400 transition-colors" />
          <span>Log out</span>
        </button>
      </div>
    </div>
  );
};

export default SideBar;
