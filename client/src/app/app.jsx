import { BrowserRouter, Routes, Route } from 'react-router';

import Home from '@/pages/Home';
import Dashboard from '@/pages/Dashboard';
import Registration from '@/pages/Registration';
import Settings from '@/pages/Settings';
import Jobs from '@/pages/Jobs';
import PageNotFound from '@/pages/PageNotFound';

import AppLayout from '@/layout/AppLayout';

import { ProtectedRoute } from '@/features/auth';
import { JobView } from '@/features/jobs';
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
            <Route path="/jobs" element={<Jobs />} />
            <Route path="/jobs/:jobId" element={<JobView />} />
            <Route path="/settings" element={<Settings />} />
          </Route>
        </Route>
        <Route path="*" element={<PageNotFound statusCode="404" message="Page Not Found" />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
