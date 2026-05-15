import { BrowserRouter, Routes, Route } from 'react-router';

import Home from '../pages/Home';
import Dashboard from '../pages/Dashboard';
import Registration from '../pages/Registration';
import Settings from '../pages/Settings';
import Jobs from '../pages/Jobs';

import ProtectedRoute from '../features/auth/ProtectedRoute';
import NavBar from '../shared/components/NavBar';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<NavBar />}>
          <Route index path="/" element={<Home />} />
          <Route path="/register" element={<Registration />} />
          <Route element={<ProtectedRoute />}>
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
