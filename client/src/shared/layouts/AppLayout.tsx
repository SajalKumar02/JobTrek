import { useContext } from 'react';
import { NavLink, Outlet, useParams, useLocation } from 'react-router';
import { AuthContext } from '../../app/providers/AuthProvider';
import {
  LayoutDashboard,
  Briefcase,
  Settings,
  LogOut,
  Bell,
  Search,
  LineChart,
  Plus,
} from 'lucide-react';
import { useJobs } from '../../features/jobs/hooks/useJobs';

const NAV_ITEMS = [
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

function useBreadcrumb() {
  const location = useLocation();
  const { jobId } = useParams();

  if (location.pathname.startsWith('/jobs/') && jobId) {
    return { label: 'Jobs / Detail', Icon: Briefcase };
  }
  if (location.pathname === '/jobs') return { label: 'Jobs', Icon: Briefcase };
  if (location.pathname === '/dashboard')
    return { label: 'Dashboard', Icon: LayoutDashboard };
  if (location.pathname === '/settings')
    return { label: 'Settings', Icon: Settings };
  return { label: 'JobTrek', Icon: LineChart };
}

export default function AppLayout() {
  const { logOut } = useContext(AuthContext);
  const breadcrumb = useBreadcrumb();

  const { countJobs, setShowCreateModal } = useJobs();

  return (
    <div className="grid min-h-screen bg-stone-50 grid-cols-[220px_1fr]">
      {/* Sidebar */}
      <aside className="min-w-[220px] bg-white border-r border-black/10 flex flex-col">
        {/* Logo */}
        <div className="flex items-center gap-2.5 px-4.5 py-5 border-b border-black/10">
          <div className="w-[30px] h-[30px] bg-[#1a1a1a] rounded-[7px] flex items-center justify-center shrink-0">
            <LineChart className="text-white" size={16} />
          </div>
          <span className="text-[15px] font-medium text-gray-900 tracking-tight">
            JobTrek
          </span>
        </div>

        {/* Nav */}
        <nav className="flex-1 p-2.5 pt-3">
          {NAV_ITEMS.map(({ section, items }) => (
            <div key={section} className="mb-3">
              <p className="text-[10px] font-medium tracking-[0.08em] uppercase text-gray-400 px-2 mb-1">
                {section}
              </p>
              {items.map(({ label, icon: Icon, to, badge }) => (
                <NavLink
                  key={to}
                  to={to}
                  className={({ isActive }) =>
                    [
                      'flex items-center gap-2.5 px-2.5 py-2 rounded-lg text-[14px] w-full mb-px transition-colors duration-100',
                      isActive
                        ? 'bg-[#1a1a1a] text-white'
                        : 'text-gray-500 hover:bg-stone-100 hover:text-gray-900',
                    ].join(' ')
                  }
                >
                  {({ isActive }) => (
                    <>
                      <Icon
                        size={17}
                        className={isActive ? 'text-white' : 'text-current'}
                      />
                      <span className="flex-1">{label}</span>
                      {badge && (
                        <span
                          className={[
                            'text-[11px] font-medium px-1.5 py-px rounded-full',
                            isActive
                              ? 'bg-white/20 text-white/85'
                              : 'bg-stone-100 text-gray-500',
                          ].join(' ')}
                        >
                          {countJobs()}
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
        <div className="p-2.5 border-t border-black/10">
          <div className="flex items-center gap-2.5 px-2.5 py-2 rounded-lg hover:bg-stone-100 cursor-pointer transition-colors">
            <div className="w-[30px] h-[30px] rounded-full bg-blue-50 flex items-center justify-center text-[12px] font-medium text-blue-700 shrink-0">
              SK
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-[13px] font-medium text-gray-900 truncate">
                Sajal Kumar
              </div>
              <div className="text-[11px] text-gray-400 truncate">
                admin@gmail.com
              </div>
            </div>
          </div>
          <button
            onClick={logOut}
            className="flex items-center gap-2 px-2.5 py-2 rounded-lg w-full text-[13px] text-gray-400 hover:bg-red-50 hover:text-red-700 transition-colors mt-0.5 group"
          >
            <LogOut
              size={16}
              className="text-gray-400 group-hover:text-red-700 transition-colors"
            />
            Log out
          </button>
        </div>
      </aside>

      {/* Main */}
      <div className="flex flex-col min-w-0 h-screen overflow-auto">
        {/* Topbar */}
        <header className="h-[52px] min-h-[52px] bg-white border-b border-black/10 flex items-center justify-between px-5">
          <div className="flex items-center gap-2 text-sm text-gray-400">
            <breadcrumb.Icon size={14} className="text-gray-400" />
            <span>{breadcrumb.label}</span>
          </div>

          <div className="flex items-center gap-1.5">
            <div className="relative">
              <Search
                size={16}
                className="absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
              />
              <input
                type="text"
                className="h-8 w-3xs pl-8 pr-2.5 rounded-md border border-gray-500/40 bg-white text-xs text-gray-900 placeholder:text-gray-400 outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-150"
                placeholder="Search jobs..."
              />
            </div>
            <button
              className="flex items-center gap-1.5 h-8 px-3.5 rounded-md border border-gray-500/40 bg-white hover:bg-gray-100 transition-all text-gray-900 text-xs font-semibold focus:ring-2 focus:ring-blue-400"
              onClick={() => setShowCreateModal()}
            >
              <Plus size={17} />
              <span className="truncate">Add opportunity</span>
            </button>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
