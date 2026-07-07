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
      <div className="flex bg-stone-100 h-screen">
        <aside
          className={`
            bg-slate-900 border-r border-slate-700
            fixed z-30 top-0 left-0 h-full
            ${showSidebar ? 'translate-x-0 md:relative md:z-0' : '-translate-x-full'}
            transition-transform duration-200
          `}
        >
          <SideBar toggleSidebar={toggleSidebar} />
        </aside>
        <main className="flex-1 overflow-y-auto grid grid-rows-[auto_1fr]">
          <Head toggleSidebar={toggleSidebar} />
          <Outlet />
        </main>
      </div>

      <CreateJobModal />
    </>
  );
};

export default AppLayout;
