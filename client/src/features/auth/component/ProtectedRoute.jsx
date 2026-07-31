import { Navigate, Outlet } from 'react-router';

import Loader from '@/shared/components/Loader';

import { useAuth } from '@/features/auth/context/useAuth';

const ProtectedRoute = () => {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return <Loader />;
  }

  if (isAuthenticated) {
    return <Outlet />;
  } else {
    return <Navigate to="/auth" replace />;
  }
};

export default ProtectedRoute;
