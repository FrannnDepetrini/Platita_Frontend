import api from "../api";

export const authService = {
  login: async (userData) => {
    try {
      const response = await api.post("/auth/Login", userData);
      localStorage.setItem("token", response);
      return { success: true };
    } catch (error) {
      throw new Error(
        error.response?.data?.message || "Email o contraseña incorrectos"
      );
    }
  },

  register: async (userData) => {
    try {
      const response = await api.post("/auth/Register", userData);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || "Error al registrarse");
    }
  },

  logout: () => {
    localStorage.removeItem("token");
    localStorage.removeItem("id");
    localStorage.removeItem("email");
    localStorage.removeItem("name");
    localStorage.removeItem("role");
    localStorage.removeItem("hasJobs");
  },

  getCurrentUser: async () => {
    try {
      const response = await api.get("auth/Me");
      return response.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.message || "Error obteniendo usuario"
      );
    }
  },
};
