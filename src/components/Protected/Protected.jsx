import { Navigate } from "react-router-dom";
import useAuth from "../../services/contexts/AuthProvider";

export default function Protected({ children, acceptedRoles }) {
  const { user } = useAuth();
  console.log(user.role);

  if (!acceptedRoles.includes(user.role)) {
    return <Navigate to={"/not-allowed"} replace/>;
  }

  return children;
}
