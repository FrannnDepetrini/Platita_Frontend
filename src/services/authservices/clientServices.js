import api from "../api";

export const clientService = {
    updateUser: async (userData) => {
        try {
            const response = await api.post("/Client/updateUser", userData);
            return response.data;
        } catch (error) {
            throw new Error(
                error.response?.data?.message || "Error al actualizar el usuario"
            )
        }
    }
}