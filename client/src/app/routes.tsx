import { BrowserRouter, Routes, Route } from 'react-router';

import Home from '../pages/Home';
import Dashboard from '../pages/Dashboard';
import Registration from '../pages/Registration';
import Settings from '../pages/Settings';
import Jobs from '../pages/Jobs';

import PublicLayout from '../shared/layouts/PublicLayout';
import ProtectedRoute from '../features/auth/ProtectedRoute';

import AppLayout from '../shared/layouts/AppLayout';

// Provider
import JobProvider from './providers/JobProvider';

// Specific Use Cases Pages
import JobView from '../pages/JobView';
import PageNotFound from '../pages/PageNotFound';

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
              </JobProvider>
            }
          >
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/jobs" element={<Jobs />} />
            <Route path="/jobs/:jobId" element={<JobView />} />
          </Route>
        </Route>
        {/* <Route element={<ProtectedRoute />}></Route> */}
        <Route
          path="*"
          element={<PageNotFound statusCode="404" message="Page Not Found" />}
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
