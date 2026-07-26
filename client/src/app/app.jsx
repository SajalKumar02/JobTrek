import { BrowserRouter, Routes, Route } from 'react-router';
import { Suspense, lazy } from 'react';

const Home = lazy(() => import('@/pages/Home'));
const Dashboard = lazy(() => import('@/pages/Dashboard'));
const Registration = lazy(() => import('@/pages/Registration'));
const Settings = lazy(() => import('@/pages/Settings'));
const PageNotFound = lazy(() => import('@/pages/PageNotFound'));

const AllJobs = lazy(() => import('@/pages/Jobs/AllJobs'));
const EditJob = lazy(() => import('@/pages/Jobs/EditJob'));
const NewJob = lazy(() => import('@/pages/Jobs/NewJob'));

const AppLayout = lazy(() => import('@/layout/AppLayout'));

import { ProtectedRoute } from '@/features/auth';
import { JobProvider } from '@/features/jobs';
import Loader from '@/shared/components/Loader';

const App = () => {
  return (
    <BrowserRouter>
      <Suspense fallback={<Loader />}>
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
          <Route
            path="*"
            element={<PageNotFound statusCode="404" message="Page Not Found" />}
          />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
};

export default App;
