import { useContext } from 'react';
import { Navigate } from 'react-router';

import { AuthContext } from '../../app/providers/AuthProvider';
import Loader from '../../shared/components/Loader';
import AppLayout from '../../shared/layouts/AppLayout';

const ProtectedRoute = () => {
  const { authenticated, loading } = useContext(AuthContext);

  if (loading) return <Loader />;

  return authenticated ? <AppLayout /> : <Navigate to="/register" replace />;
};

export default ProtectedRoute;
