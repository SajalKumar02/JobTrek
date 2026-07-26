import { useCallback, useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router';

import { ArrowLeft, Menu, Search } from 'lucide-react';

import { useJobs } from '@/features/jobs';

import { useBreadcrumb } from '@/shared/utils/breadcrumbs.utils';

const Head = ({ toggleSidebar }) => {
  const location = useLocation();
  const { jobId } = useParams();

  const navigate = useNavigate();

  const { searchString, handleSetSearchString } = useJobs();

  const [searchInput, setSearchInput] = useState(searchString);
  const breadcrumb = useBreadcrumb(location, jobId);
  const Icon = breadcrumb.icon;

  const handleChangeSearchInput = useCallback(
    (newStringInput) => setSearchInput(newStringInput),
    []
  );

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      handleSetSearchString(searchInput);
    }, 300);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [searchInput, handleSetSearchString]);

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <header className="sticky top-0 z-10 flex flex-row items-center justify-between gap-2 border-b border-slate-200 bg-white/80 px-2 py-2.5 backdrop-blur-sm md:px-4">
      <div className="flex min-w-0 flex-row items-center gap-2">
        <button
          onClick={toggleSidebar}
          className="rounded-lg p-2 text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-700 cursor-pointer"
        >
          <Menu size={20} />
        </button>

        <div className="mx-1 h-5 w-px bg-slate-200" />

        <span className="flex min-w-0 items-center gap-2 rounded-lg py-1 pl-1.5 pr-2 -ml-1.5 transition-colors cursor-pointer">
          <button
            type="button"
            onClick={handleBack}
            className="flex items-center justify-center rounded-md p-0.5 hover:bg-slate-200 hover:text-slate-800 transition-colors"
            style={{ lineHeight: 0 }}
            aria-label="Go back"
          >
            <ArrowLeft
              size={18}
              className="text-slate-400 group-hover:text-slate-800 transition-colors"
            />
          </button>

          <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-indigo-50 text-indigo-600">
            <Icon size={16} />
          </span>
          <span className="truncate text-sm font-medium text-slate-700">
            {breadcrumb.label}
          </span>
        </span>
      </div>

      <div className="flex flex-row items-center gap-3">
        <div className="relative hidden flex-1 md:inline-block">
          <Search
            size={15}
            className="pointer-events-none absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400"
          />
          <input
            type="text"
            value={searchInput}
            onChange={(e) => handleChangeSearchInput(e.target.value)}
            className="h-full w-56 rounded-lg border border-slate-200 bg-slate-50/60 py-2 pl-8 pr-2.5 text-xs text-slate-800 placeholder:text-slate-400 outline-none transition-all duration-150 focus:w-64 focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-500/10"
            placeholder="Search jobs..."
          />
        </div>
      </div>
    </header>
  );
};

export default Head;
