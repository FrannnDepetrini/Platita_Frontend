import { Navigate } from "react-router-dom";
import useAuth from "../../services/contexts/AuthProvider";

export default function Protected({ children, acceptedRoles }) {
  const { userRole } = useAuth();

  if (!acceptedRoles.includes(userRole)) {
    return <Navigate to="/" replace />;
  }

  return children;
}
