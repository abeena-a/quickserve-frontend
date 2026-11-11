import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

export default function ProtectedRoute({ allowedRole }) {

  // const { admin } = useSelector((state) => state.register);
  const { currentUser } = useSelector((state) => state.auth || {}); 
  // assume you’ll add auth slice later

  // check if user exists and role matches
  if (!currentUser || currentUser.role !== allowedRole) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}
