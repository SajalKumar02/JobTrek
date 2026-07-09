import { useEffect, useState } from 'react';
import { Outlet } from 'react-router';

import Head from '@/shared/components/Head';

import { CreateJobModal } from '@/features/jobs';
import { SideBar } from '@/features/jobs';

const AppLayout = () => {
  const [showSidebar, setShowSidebar] = useState(false);

  const toggleSidebar = () => setShowSidebar((prev) => !prev);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setShowSidebar(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return (
    <>
      <div className="flex h-screen bg-slate-100">
        <aside
          className={`
            fixed left-0 top-0 z-30 h-full
            border-r border-slate-800/60 bg-slate-900 shadow-xl shadow-slate-900/20
            transition-transform duration-200 ease-out
            ${showSidebar ? 'translate-x-0 md:relative md:z-0' : '-translate-x-full'}
          `}
        >
          <SideBar toggleSidebar={toggleSidebar} />
        </aside>

        <main className="grid flex-1 grid-rows-[auto_1fr] overflow-y-auto">
          <Head toggleSidebar={toggleSidebar} />
          <Outlet />
        </main>
      </div>

      <CreateJobModal />
    </>
  );
};

export default AppLayout;
