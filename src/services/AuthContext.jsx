import { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext();

const initalValue = localStorage.getItem("UserRole") || "guest";
export const AuthContextProvider = ({ children }) => {
  const [userRole, setUserRole] = useState(initalValue);
  const navigate = useNavigate();

  const handleLogin = () => {
    if (userRole == "guest") {
      setUserRole("employee");
      navigate("employee/home");
      localStorage.setItem("UserRole", "employee");
    } else {
      setUserRole("guest");
      navigate("/");
      localStorage.setItem("UserRole", "guest");
    }
  };

  return (
    <AuthContext.Provider value={{ userRole, handleLogin }}>
      {children}
    </AuthContext.Provider>
  );
};
