import api from "../api";

export const postulationService = {
  getMyPostulations: async () => {
    try {
      const response = await api.get("Postulation/GetMyPostulations");
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
};
