import { Outlet } from 'react-router';

import Head from '@/shared/components/Head';
import CreateJobModal from '@/features/jobs/modals/CreateJobModal';
import SideBar from '@/features/jobs/components/sidebar/component/SideBar';

const AppLayout = () => {
  return (
    <>
      <div className="bg-stone-50 grid h-screen w-screen grid-cols-[auto_1fr]">
        <SideBar />
        <div className="grid grid-rows-[auto_1fr] max-h-screen gap-2">
          <Head />
          <div className="overflow-auto">
            <Outlet />
          </div>
        </div>
      </div>
      <CreateJobModal />
    </>
  );
};

export default AppLayout;
