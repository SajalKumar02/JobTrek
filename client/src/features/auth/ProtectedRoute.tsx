import { Outlet } from 'react-router';

import Loader from '../../shared/components/Loader';
import { useAuth } from './hooks/useAuth';
import PageNotFound from '../../pages/PageNotFound';

const ProtectedRoute = () => {
  const { authenticated, loading } = useAuth();

  if (loading) return <Loader />;

  return authenticated ? (
    <Outlet />
  ) : (
    <PageNotFound statusCode={401} message={'User not authenticated'} />
  );
};

export default ProtectedRoute;
