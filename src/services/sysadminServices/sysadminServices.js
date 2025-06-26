import api from "../api";

export const sysadminService = {
    getAllUsers: async () => {
        try {
            const response = await api.get("SysAdmin/GetAllUsers");
            return response;
        } catch (error) {
            throw new Error(
                error.response?.data?.message || "Error obteniendo a lo usuarios"
            );
        }
    },

    deleteUser: async (id) => {
        try {
            const response = api.delete("SysAdmin/DeleteUser", {
                params: { id: id },
            });
            return response;
        } catch (error) {
            throw new Error(
                "Error al eliminar usuario"
            );
        }
    },

    getUserById: async (id) => {
        try {
            const response = api.get("SysAdmin/GetUserById",
                {
                    params: { id: id }
                }
            );
            return response;
        } catch (error) {
            throw new Error(
                error.response?.data?.message || "Error al obtener usuario"
            )
        }
    },

    getUserByRole: async (role) => {
        try {
            const response = api.get("SysAdmin/GetUsersByRole",
                {
                    params: { role: role }
                });
            return response;
        } catch (error) {
            throw new Error(
                error.response?.data?.message || "Error al obtener usuario/s por role"
            );
        }
    },

    updateUserById: async (id, userData) => {
        try {
            const response = api.put("SysAdmin/UpdateUser", userData,
                {
                    params: { id: id }
                }
            );
            return response;
        } catch (error) {
            throw new Error(
                error.response?.data?.message || "Error al actualizar usuario por id"
            )
        }
    }
};
