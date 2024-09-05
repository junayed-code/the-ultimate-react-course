import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAppSelector } from '@store/hooks';

function ProtectedRoute() {
  const username = useAppSelector((store) => store.user.username);
  const location = useLocation();

  return username ? <Outlet /> : <Navigate to="/" state={location} replace />;
}

export default ProtectedRoute;
