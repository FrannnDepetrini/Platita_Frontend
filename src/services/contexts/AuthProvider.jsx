import { createContext, useContext, useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
import { authService } from "../authservices/AuthServices";
import { jwtDecode } from "jwt-decode";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const token = localStorage.getItem("token");
        if (token) {
          // const userData = await authService.getCurrentUser();
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
        }else {
          const payload = {
            id: null,
            email: null,
            name: null,
            role: "Client",
            hasJobs: false,
          }
          setUser(payload);
          setIsAuthenticated(false);
        }
      } catch (error) {
        logout();
      } finally {
        setLoading(false);
      }
    };
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
    loading,
    login,
    register,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
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
