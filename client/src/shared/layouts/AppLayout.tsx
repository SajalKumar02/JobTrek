import { Outlet } from 'react-router';

import CreateJobModal from '../../features/jobs/components/CreateJobModal';

import SideBar from '../../features/sidebar/component/SideBar';
import AppTopBar from '../components/AppTopBar';

export default function AppLayout() {
  return (
    <>
      <div className="bg-stone-50 grid min-h-screen grid-cols-[220px_1fr]">
        <SideBar />
        <div className="grid grid-rows-[52px_1fr] gap-2">
          <AppTopBar />
          <Outlet />
        </div>
      </div>
      <CreateJobModal />
    </>
  );
}
