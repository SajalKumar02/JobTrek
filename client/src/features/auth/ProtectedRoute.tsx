import { useContext } from 'react';
import { Navigate, Outlet } from 'react-router';

import { AuthContext } from '../../app/providers/AuthProvider';
import Loader from '../../shared/components/Loader';

const ProtectedRoute = () => {
  const { authenticated, loading } = useContext(AuthContext);

  if (loading) return <Loader />;

  return authenticated ? <Outlet /> : <Navigate to="/register" replace />;
};

export default ProtectedRoute;
