import { Navigate } from "react-router-dom";
import useAuth from "../../services/contexts/AuthProvider";

export default function Protected({ children, acceptedRoles }) {
  const { user } = useAuth();

  if (!acceptedRoles.includes(user.role)) {
    return <Navigate to="/" replace />;
  }

  return children;
}
