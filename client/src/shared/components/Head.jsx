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
    return () => clearTimeout(timeoutId);
  }, [searchInput, handleSetSearchString]);

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <header className="sub-nav">
      <div className="flex min-w-0 items-center gap-3">
        <button
          onClick={toggleSidebar}
          type="button"
          className="flex h-11 w-11 items-center justify-center rounded-full bg-surface-chip/64 text-ink transition-transform active:scale-95 focus:outline-none focus-visible:outline-2 focus-visible:outline-primary-focus"
          aria-label="Toggle Sidebar"
        >
          <Menu size={18} />
        </button>

        <div className="mx-1 h-6 w-px bg-hairline" aria-hidden />

        <span className="flex min-w-0 items-center gap-2 rounded-sm py-1 pl-1 pr-3">
          <button
            type="button"
            onClick={handleBack}
            className="flex h-8 w-8 items-center justify-center rounded-sm text-ink-muted-48 transition-transform active:scale-95 focus:outline-none focus-visible:outline-2 focus-visible:outline-primary-focus"
            style={{ lineHeight: 0 }}
            aria-label="Go back"
          >
            <ArrowLeft size={18} />
          </button>

          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-sm bg-surface-pearl text-primary">
            <Icon size={16} />
          </span>
          <span className="truncate font-display text-[21px] leading-[1.19] font-semibold tracking-[0.231px] text-ink">
            {breadcrumb.label}
          </span>
        </span>
      </div>

      <div className="flex items-center gap-3">
        <div className="relative hidden md:block">
          <Search
            size={14}
            className="pointer-events-none absolute top-1/2 left-5 -translate-y-1/2 text-ink-muted-48"
          />
          <input
            type="text"
            value={searchInput}
            onChange={(e) => handleChangeSearchInput(e.target.value)}
            className="search-input w-56 pl-11 transition-[width] duration-150 focus:w-64"
            placeholder="Search jobs..."
            aria-label="Search jobs"
          />
        </div>
      </div>
    </header>
  );
};

export default Head;
