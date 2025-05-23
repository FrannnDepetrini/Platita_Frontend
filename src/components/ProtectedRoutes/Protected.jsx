import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../../services/AuthContext";


export default function Protected({ children, deniedRoles }) {
  const { userRole } = useContext(AuthContext);

  if (deniedRoles.includes(userRole)) {
    return <Navigate to="/" replace />;
  }

  return children;
}
