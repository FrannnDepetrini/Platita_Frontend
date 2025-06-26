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
    getPostulationsByJobId: async (id) => {
    try {
        const response = await api.get("/Postulation/GetPostulationsByJobId", {
            params: { jobId: id },
        });
        return response;
    } catch (error) {
        if (error.response?.status === 400) {
            console.warn(`No se encontraron postulaciones para el trabajo ${id}`);
            return [];
        }
        throw new Error(
            error.message || "Error obteniendo las postulaciones del trabajo"
        );
    }
},
    approvePostulation: async (jobId, postulationId) => {
  try {
    const response = await api.put("/Postulation/ApproveApplication", null, {
      params: { jobId: jobId, postulantId: postulationId }, // Cambiar postulantId por postulationId si se cambia la api a la de maruco
    });
    return response.data;
  } catch (error) {
    console.error("Error al aprobar la postulación (backend):", error.response);
    throw new Error(
      error.response?.data?.message || "Error al aprobar la postulación"
    );
  }
},
    cancelSuccessPostulation: async (jobId, postulationId) => {
      try {
        const response = await api.put("Postulation/CancelWhenSuccessPostulation", null, {
          params: { jobId: jobId, postulationId: postulationId},
        }
      );
      return response;
      } catch (error) {
        throw new Error(
          error.response?.data?.message || "Error al cancelar la postulacion aceptada"
        );
      }
    }
};
