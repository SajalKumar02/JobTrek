import { Outlet } from 'react-router';

import Head from '@/shared/components/Head';
import CreateJobModal from '@/features/jobs/components/modals/CreateJobModal';
import SideBar from '@/features/jobs/components/sidebar/component/SideBar';
import { useEffect, useState } from 'react';

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
      <div className="flex flex-row bg-stone-50 h-screen w-screen">
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
        <div className="flex-1 grid grid-rows-[auto_1fr] max-h-screen">
          <Head toggleSidebar={toggleSidebar} />
          <Outlet />
        </div>
      </div>

      <CreateJobModal />
    </>
  );
};

export default AppLayout;
