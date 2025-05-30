import { createContext, useContext, useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
import { authService } from "../authservices/AuthServices";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState({
    role: "Guest",
  });
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();
  
  const checkAuth = () => {
      const token = localStorage.getItem("token");
      if (token) {
        const userData = jwtDecode(token);

        const role = userData["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];

        const payload = {
          id: userData.sub,
          email: userData.email,
          name: userData.given_name,
          role: role,
          hasJobs: userData.hasJobs === "True",
        };
        
        setUser(payload);
        setIsAuthenticated(true);
        navigate("/employee/home", {replace: true});
      }else {
        setUser({
          role: "Guest",
        });
        setIsAuthenticated(false);
      }
  };

  useEffect(() => {
    checkAuth();
  }, []);

  useEffect(() => {
    checkAuth();
  }, [isAuthenticated]);

  const login = async (userData) => {
    try {
      const response = await authService.login(userData);
      
      if(response.success){
        setIsAuthenticated(true);
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
    setUser({
            id: null,
            email: null,
            name: null,
            role: "Guest",
            hasJobs: false,
          });
    setIsAuthenticated(false);
  };

  const value = {
    user,
    isAuthenticated,
    login,
    register,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export default function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth debe usarse dentro de un AuthProvider");
  }
  return context;
}
