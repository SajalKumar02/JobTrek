import { useCallback, useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router';

import { Menu, Search } from 'lucide-react';

import { useJobs } from '@/features/jobs';
import AddApplicationButton from './AddApplicationButton';

import { useBreadcrumb } from '@/shared/utils/breadcrumbs.utils';

const Head = ({ toggleSidebar }) => {
  const location = useLocation();
  const { jobId } = useParams();

  const { searchString, handleSetSearchString } = useJobs();

  const [searchInput, setSearchInput] = useState(searchString);
  const breadcrumb = useBreadcrumb(location, jobId);
  const Icon = breadcrumb.icon;

  const handleChangeSearchInput = useCallback((newStringInput) => setSearchInput(newStringInput), []);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      handleSetSearchString(searchInput);
    }, 300);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [searchInput, handleSetSearchString]);

  return (
    <header className="bg-white/ flex flex-row justify-between border-b border-slate-200 px-5 py-2">
      <div className="flex flex-row items-center gap-2 text-gray-400">
        <div className="flex flex-row items-center gap-2 text-gray-400">
          <button onClick={toggleSidebar} className="p-2 rounded hover:bg-gray-100 hover:text-gray-600 transition">
            <Menu size={22} />
          </button>

          <Icon size={22} />
          <span className="text-md">{breadcrumb.label}</span>
        </div>
      </div>
      <div className="flex flex-row gap-3">
        <div className="relative flex-1">
          <Search size={16} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
          <input
            type="text"
            value={searchInput}
            onChange={(e) => handleChangeSearchInput(e.target.value)}
            className="h-full w-full pl-8 pr-2.5 rounded-md border border-slate-200 bg-white text-xs text-gray-900 placeholder:text-gray-400 outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-150"
            placeholder="Search jobs..."
          />
        </div>
        <AddApplicationButton />
      </div>
    </header>
  );
};

export default Head;
