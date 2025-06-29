import api from "../api";

export const moderartorService = {
    getJobsForModerator: async () => {
        try {
            const response = await api.get("/Job/GetAllJobsForModerator");
            return response;
        } catch (error) {
            throw new Error(
                error.response?.data?.message || "Error obteniendo los trabajos para el moderador"
            );
        }
    },

    getAllJobsReported: async () => {
        try {
            const response = await api.get("/Job/GetAllJobsReportedForModerator")
            return response;
        } catch (error) {
            throw new Error(
                error.response?.data?.message || "Error obteniendo los trabajos reportados"
            );
        }
    }

}