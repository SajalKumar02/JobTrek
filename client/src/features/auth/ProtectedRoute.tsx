import { Navigate, Outlet } from 'react-router';

import Loader from '../../shared/components/Loader';
import { useAuth } from './hooks/useAuth';

const ProtectedRoute = () => {
  const { authenticated, loading } = useAuth();

  if (loading) return <Loader />;

  return authenticated ? <Outlet /> : <Navigate to="/register" replace />;
};

export default ProtectedRoute;
