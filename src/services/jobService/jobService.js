import api from "../api";

export const jobService = {
  getJobs: async () => {
    try {
      const response = await api.get("Job/by-location");
      return response;
    } catch (error) {
      throw new Error(
        error.response?.data?.message || "Error obteniendo postulaciones"
      );
    }
  },
  getJobById: async (id) => {
    try {
      const response = await api.get("/Job/GetJobById", {
        params: { jobId: id },
      });

      return response;
    } catch (error) {
      throw new Error(
        error.response?.data?.message || "Error obteniendo postulaciones"
      );
    }
  },
};
