import api from "../api";

export const authService = {
  login: async (userData) => {
    try {
      const response = await api.post("/Auth/Login", userData);
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
      const response = await api.post("/Auth/Register", userData);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || "Error al registrarse");
    }
  },

  logout: () => {
    localStorage.removeItem("token");
  },

  getCurrentUser: async () => {
    try {
      const response = await api.get("Auth/Me");
      return response.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.message || "Error obteniendo usuario"
      );
    }
  },
};
