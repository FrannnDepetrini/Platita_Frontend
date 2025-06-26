import { useNavigate } from "react-router-dom";
import useAuth from "../../services/contexts/AuthProvider";
import { useEffect } from "react";

export default function GuestProtect({ children }) {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    console.log("que onda paaaaaaaaaaaaa");
    if (isAuthenticated) {
      navigate(-1, { replace: true });
      return 0;
    }
  }, [navigate, isAuthenticated]);

  return children;
}
