import { BrowserRouter, Routes, Route } from 'react-router';

import Home from '../pages/Home';
import Dashboard from '../pages/Dashboard';
import Registration from '../pages/Registration';
import Settings from '../pages/Settings';
import Jobs from '../pages/Jobs';

import ProtectedRoute from '../features/auth/ProtectedRoute';
import PublicLayout from '../shared/layouts/PublicLayout';
import AppLayout from '../shared/layouts/AppLayout';
import JobProvider from './providers/JobProvider';
import CreateJobModal from '../features/jobs/components/CreateJobModal';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<PublicLayout />}>
          <Route index path="/" element={<Home />} />
          <Route path="/register" element={<Registration />} />
        </Route>
        <Route element={<ProtectedRoute />}>
          <Route
            element={
              <JobProvider>
                <AppLayout />
                <CreateJobModal />
              </JobProvider>
            }
          >
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/jobs" element={<Jobs />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
