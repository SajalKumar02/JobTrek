import { Navigate, Outlet } from 'react-router';

const ProtectedRoute = () => {
  const isAuthenticated = true;

  return isAuthenticated ? <Outlet /> : <Navigate to="/register" replace />;
};

export default ProtectedRoute;
