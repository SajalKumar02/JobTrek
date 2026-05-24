import { useCallback, useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router';
import {
  LayoutDashboard,
  Briefcase,
  Settings,
  Search,
  LineChart,
  Plus,
} from 'lucide-react';
import { useJobs } from '../../features/jobs/hooks/useJobs';

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

const AppTopBar = () => {
  const { setShowCreateModal, searchString, handleSetSearchString } = useJobs();

  const [searchInput, setSearchInput] = useState(searchString);
  const breadcrumb = useBreadcrumb();

  const handleChangeSearchInput = useCallback(
    (newStringInput) => setSearchInput(newStringInput),
    [],
  );

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      handleSetSearchString(searchInput);
    }, 300);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [searchInput, handleSetSearchString]);

  return (
    <header className="bg-white border-b border-black/10 flex justify-between px-5 mb-0">
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
            value={searchInput}
            onChange={(e) => handleChangeSearchInput(e.target.value)}
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
  );
};

export default AppTopBar;
