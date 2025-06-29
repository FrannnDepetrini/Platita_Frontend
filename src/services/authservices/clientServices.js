import api from "../api";

export const clientService = {
    updateUser: async (userData) => {
        try {
            const response = await api.put("/Client/UpdateClient", userData);
            localStorage.setItem("email", userData.email);
            localStorage.setItem("name", userData.userName);
            return response;
        } catch (error) {
            throw new Error(
                error.response?.data?.message || "Error al actualizar el usuario"
            )
        }
    },

    getReputation: async () => {
        try {
            const userId = localStorage.getItem("id");
            const response = await api.get('/Rating/GetMyReceivedRatingsScore', { params: { clientId: userId } });
            return response;
        } catch (error) {
            throw new Error(
                error.response?.data?.message || "Error al obtener la reputacion del usuario"
            )
        }
    }
}