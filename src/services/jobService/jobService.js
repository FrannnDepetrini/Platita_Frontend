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
  getMyJobs: async () => {
    try {

      const response = await api.get("/Job/my-jobs");

      return response;
    } catch (error) {
      throw new Error(
        error.response?.data?.message || "Error obteniendo tus trabajos"
      );
    }
  },

  create: async (jobData) => {
    try {
      const response = await api.post("/Job/create", jobData);
      return response;
    } catch (error) {
      throw new Error(
        error.response?.data?.message || "Error creando el trabajo"
      );
    }
  },
  getJobForModeratorByID: async (id) => {
    try {
      const response = await api.get("/Job/GetJobsForModeratorById", {
        params: { jobId: id },
      });
      return response;
    } catch (error) {
      throw new Error(
        error.response?.data?.message || "Error obteniendo los trabajos"
      );
    }
  },
  deleteJobReported: async (id) => {
    try {
      const response = await api.delete("Report/DeleteJobReported", {
        params: { jobId: id },
      });
      console.log(response);
      return response;
    } catch (error) {
      console.log(error);
      throw new Error(
        error.response?.data?.message || "Error eliminando el trabajo"

      );
    }
  },
};
