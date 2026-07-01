import { NavLink, useNavigate } from 'react-router';
import { LineChart, LogOut, Users } from 'lucide-react';

import { NAV_ITEMS } from '@/features/jobs/components/sidebar/constants';

import { useAuth } from '@/features/auth';
import { useToast } from '@/features/toast';

import { countJobs } from '@/features/jobs/utils';
import { useJobs } from '@/features/jobs';

const SideBar = () => {
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
    <aside className="bg-white border-r border-black/10 flex flex-col">
      {/* Logo */}
      <div className="flex items-center gap-2.5 px-4.5 py-5 border-b border-black/10 cursor-pointer" onClick={() => navigate('/')}>
        <div className="w-[30px] h-[30px] bg-[#1a1a1a] rounded-[7px] flex items-center justify-center shrink-0">
          <LineChart className="text-white" size={16} />
        </div>
        <span className="text-[15px] font-medium text-gray-900 tracking-tight">JobTrek</span>
      </div>

      {/* Nav */}
      <nav className="flex-1 p-2.5 pt-3">
        {NAV_ITEMS.map(({ section, items }) => (
          <div key={section} className="mb-3">
            <p className="text-[10px] font-medium tracking-[0.08em] uppercase text-gray-400 px-2 mb-1">{section}</p>
            {items.map(({ label, icon: Icon, to, badge }) => (
              <NavLink key={to} to={to} className={({ isActive }) => ['flex items-center gap-2.5 px-2.5 py-2 rounded-lg text-[14px] w-full mb-px transition-colors duration-100', isActive ? 'bg-[#1a1a1a] text-white' : 'text-gray-500 hover:bg-stone-100 hover:text-gray-900'].join(' ')}>
                {({ isActive }) => (
                  <>
                    <Icon size={17} className={isActive ? 'text-white' : 'text-current'} />
                    <span className="flex-1">{label}</span>
                    {badge && <span className={['text-[11px] font-medium px-1.5 py-px rounded-full', isActive ? 'bg-white/20 text-white/85' : 'bg-stone-100 text-gray-500'].join(' ')}>{appicationsCount}</span>}
                  </>
                )}
              </NavLink>
            ))}
          </div>
        ))}
      </nav>

      {/* Bottom */}
      <div className="p-2.5 border-t border-black/10">
        <div className="flex items-center gap-2.5 px-2.5 py-2 rounded-lg hover:bg-stone-100 cursor-pointer transition-colors">
          <div className="w-[30px] h-[30px] rounded-full bg-blue-50 flex items-center justify-center text-blue-700 shrink-0">
            <Users size={20} />
          </div>

          <div className="flex-1 min-w-0">
            <div className="text-[13px] font-medium text-gray-900 truncate">{user && user.username}</div>
            <div className="text-[11px] text-gray-400 truncate">{user && user.email}</div>
          </div>
        </div>
        <button onClick={handleLogOut} className="flex items-center gap-2 px-2.5 py-2 rounded-lg w-full text-[13px] text-gray-400 hover:bg-red-50 hover:text-red-700 transition-colors mt-0.5 group">
          <LogOut size={16} className="text-gray-400 group-hover:text-red-700 transition-colors" />
          Log out
        </button>
      </div>
    </aside>
  );
};

export default SideBar;
