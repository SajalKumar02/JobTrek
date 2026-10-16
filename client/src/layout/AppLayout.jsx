import { useEffect, useState } from 'react';
import { Outlet } from 'react-router';

import Head from '@/shared/components/Head';

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
      <div className="flex h-screen bg-canvas-parchment">
        <aside
          className={`
            fixed left-0 top-0 z-30 h-full
            border-r border-surface-tile-3 bg-surface-black
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
    </>
  );
};

export default AppLayout;
