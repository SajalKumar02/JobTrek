import { BrowserRouter, Routes, Route } from 'react-router';

import Home from '@/pages/Home';
import Dashboard from '@/pages/Dashboard';
import Registration from '@/pages/Registration';
import Settings from '@/pages/Settings';
import PageNotFound from '@/pages/PageNotFound';

import AllJobs from '@/pages/Jobs/AllJobs';
import EditJob from '@/pages/Jobs/EditJob';
import NewJob from '@/pages/Jobs/NewJob';

import AppLayout from '@/layout/AppLayout';

import { ProtectedRoute } from '@/features/auth';
import { JobProvider } from '@/features/jobs';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route index path="/" element={<Home />} />
        <Route path="/register" element={<Registration />} />
        <Route element={<ProtectedRoute />}>
          <Route
            element={
              <JobProvider>
                <AppLayout />
              </JobProvider>
            }
          >
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/jobs" element={<AllJobs />} />
            <Route path="/jobs/:jobId" element={<EditJob />} />
            <Route path="/jobs/new" element={<NewJob />} />
            <Route path="/setting" element={<Settings />} />
          </Route>
        </Route>
        <Route path="*" element={<PageNotFound statusCode="404" message="Page Not Found" />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
