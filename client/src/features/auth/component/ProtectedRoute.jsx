import { Navigate, Outlet } from 'react-router';

import Loader from '@/shared/components/Loader';

import { useAuth } from '@/features/auth/context/useAuth';

const ProtectedRoute = () => {
  const { authenticated, loading } = useAuth();

  if (loading) {
    return <Loader />;
  }

  if (!authenticated) {
    return <Navigate to="/register" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
