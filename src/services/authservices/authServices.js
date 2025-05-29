import api from "../api";

export const authService = {
  login: async (email, password) => {
    try {
      const response = await api.post("/Auth/Login", { email, password });
      localStorage.setItem("token", response.data.token);
      return response.data.user;
    } catch (error) {
      throw new Error(
        error.response?.data?.message || "Error al iniciar sesion"
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
