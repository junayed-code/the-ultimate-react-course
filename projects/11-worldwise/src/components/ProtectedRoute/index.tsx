import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "@providers/AuthProvider";

export default function ProtectedRoute() {
  const { isAuthenticated } = useAuth();
  if (isAuthenticated) {
    return <Outlet />;
  } else {
    return <Navigate to="/login" replace />;
  }
}
