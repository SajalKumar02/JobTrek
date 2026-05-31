import { Outlet } from 'react-router';

import CreateJobModal from '../../features/jobs/modals/CreateJobModal';

import SideBar from '../../features/sidebar/component/SideBar';
import AppTopBar from '../components/AppTopBar';

export default function AppLayout() {
  return (
    <>
      <div className="bg-stone-50 grid h-screen w-screen grid-cols-[220px_1fr] overflow-hidden">
        <SideBar />
        <div className="grid grid-rows-[52px_1fr] gap-2 overflow-hidden">
          <AppTopBar />
          <div className="overflow-auto">
            <Outlet />
          </div>
        </div>
      </div>
      <CreateJobModal />
    </>
  );
}
