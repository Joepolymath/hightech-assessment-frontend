import { Navigate, Outlet } from 'react-router-dom';
import { useAppSelector } from './app/hooks';

const PrivateRoutes = () => {
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);
  return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoutes;
