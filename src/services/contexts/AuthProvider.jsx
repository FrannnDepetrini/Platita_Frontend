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
  const [isAuthenticated, setIsAuthenticated] = useState(
    initialState.token ? true : false
  );
  const [isLoadingAuth, setIsLoadingAuth] = useState(false);

  const navigate = useNavigate();

  const autoNavigate = (token) => {
    const userData = jwtDecode(token);

    const role =
      userData["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];

    switch (role) {
      case "Client":
        navigate("/employee/home", { replace: true });

        break;
      case "Moderator":
        navigate("/moderator/home", { replace: true });
        break;
      case "SysAdmin":
        navigate("/sysadmin/home", { replace: true });
        break;
      case "Support":
        navigate("/support/home", { replace: true });
        break;
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

      localStorage.setItem("id", userData.sub);
      localStorage.setItem("email", userData.email);
      localStorage.setItem("name", userData.given_name);
      localStorage.setItem("role", role);
      localStorage.setItem("hasJobs", userData.hasJobs);
      // localStorage.setItem("token", token);
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

      autoNavigate(token);
    } else {
      setUser({ role: "Guest" });
      setIsAuthenticated(false);
    }
  };

  useEffect(() => {
    const token = initialState.token;
    if (token) {
      setIsAuthenticated(true);
      console.log(isAuthenticated);
      if (window.location.pathname === "/" && !isLoadingAuth) {
        autoNavigate(token);
      }
    }
  }, []);

  const login = async (userData) => {
    try {
      setIsLoadingAuth(true);
      const response = await authService.login(userData);

      if (response.success) {
        setIsAuthenticated(true);
        checkAuth();
        return { success: true };
      }
    } catch (error) {
      return { success: false, error: error.message };
    } finally {
      setIsLoadingAuth(false);
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
    navigate("/");
    setTimeout(() => {
      authService.logout();
      setUser(initialState);
      setIsAuthenticated(false);
    }, 1);
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
