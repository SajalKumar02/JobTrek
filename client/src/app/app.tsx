import { BrowserRouter, Routes, Route } from 'react-router';

import Home from '../pages/Home';
import Dashboard from '../pages/Dashboard';
import Registration from '../pages/Registration';
import Settings from '../pages/Settings';
import Jobs from '../pages/Jobs';

import ProtectedRoute from '../features/auth/ProtectedRoute';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route index path="/" element={<Home />} />
        <Route path="/register" element={<Registration />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/jobs" element={<Jobs />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
