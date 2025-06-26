import api from "../api";

export const postulationService = {
  getMyPostulations: async () => {
    try {
      const response = await api.get("Postulation/GetMyPostulations");
      console.log(response);
      return response;
    } catch (error) {
      throw new Error(
        error.response?.data?.message || "Error obteniendo postulaciones"
      );
    }
  },
  showPhoneForAcceptedPostulation: async (id) => {
    try {
      const response = await api.get(
        "Postulation/ShowPhoneForAcceptedPostulation",
        {
          params: { postulationId: id },
        }
      );
      return response;
    } catch (error) {
      throw new Error(
        error.response?.data?.message || "Error obteniendo numero de celular"
      );
    }
  },
  applicateJob: async (userData) => {
    try {
      const response = await api.post("/Postulation/ApplicateJob", userData);
      return response;
    } catch (error) {
      throw new Error(
        error.response?.data?.message || "Error enviendo postulacion"
      );
    }
  },
  deletePostulationLogic: async (jobId, psId) => {
    try {
      const response = await api.patch(
        "/Postulation/DeletePostulationLogic",
        null,
        {
          params: { jobId: jobId, postulationId: psId },
        }
      );
      return response;
    } catch (error) {
      throw new Error(
        error.response?.data?.message || "Error borrando postulacion"
      );
    }
  },
  getMyPostulationsDone: async () => {
    try {
      const response = await api.get("Postulation/GetMyPostulationsDone");
      console.log(response);
      return response;
    } catch (error) {
      throw new Error(
        error.response?.data?.message || "Error obteniendo las postulaciones"
      );
    }
  },
};
