import { createContext, useContext, useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
import { authService } from "../authservices/AuthServices";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

const initialState = {
  id: localStorage.getItem("id") || "",
  email: localStorage.getItem("email") || "",
  name: localStorage.getItem("name") || "",
  role: localStorage.getItem("role") || "Guest",
  hasJobs: localStorage.getItem("hasJobs") || false,
  token: localStorage.getItem("token") || "",
};

export function AuthProvider({ children }) {
  const [user, setUser] = useState(initialState);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  const paleUli = () => {
    const token = localStorage.getItem("token");
    if (token) {
      const userData = jwtDecode(token);

      const role =
        userData[
          "http://schemas.microsoft.com/ws/2008/06/identity/claims/role"
        ];

      setIsAuthenticated(true);

      switch (role) {
        case "Client":
          navigate("/employee/home", { replace: true });
          break;
        case "Moderator":
          navigate("/moderator/job/detail", { replace: true });
      }
    }
  };

  const checkAuth = () => {
    const token = localStorage.getItem("token");
    if (token) {
      const userData = jwtDecode(token);

      const role =
        userData[
          "http://schemas.microsoft.com/ws/2008/06/identity/claims/role"
        ];
      console.log(role);

      localStorage.setItem("id", userData.sub);
      localStorage.setItem("email", userData.email);
      localStorage.setItem("name", userData.given_name);
      localStorage.setItem("role", role);
      localStorage.setItem("hasJobs", userData.hasJobs);
      localStorage.setItem("token", token);
      const payload = {
        id: userData.sub,
        email: userData.email,
        name: userData.given_name,
        role: role,
        hasJobs: userData.hasJobs === "True",
        token,
      };

      setUser(payload);
      setIsAuthenticated(true);
      switch (role) {
        case "Client":
          navigate("/employee/home", { replace: true });
          break;
        case "Moderator":
          navigate("/moderator/job/detail", { replace: true });
      }
    } else {
      setUser({ role: "Guest" });
      setIsAuthenticated(false);
    }
  };

  useEffect(() => {
    if (window.location.pathname === "/") {
      paleUli();
    }
  }, []);

  // useEffect(() => {
  //   checkAuth();
  // }, [isAuthenticated]);

  const login = async (userData) => {
    try {
      const response = await authService.login(userData);

      if (response.success) {
        setIsAuthenticated(true);
        checkAuth();
        return { success: true };
      }
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  const register = async (userData) => {
    try {
      await authService.register(userData);
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  const logout = () => {
    authService.logout();
    setUser(initialState);
    // setUser({ role: "Guest" });
    setIsAuthenticated(false);
  };

  const value = {
    user,
    isAuthenticated,
    login,
    register,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export default function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth debe usarse dentro de un AuthProvider");
  }
  return context;
}
