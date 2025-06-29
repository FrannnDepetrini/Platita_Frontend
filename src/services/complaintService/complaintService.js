import api from "../api";

export const complaintService = {
  getAllComplaint: async () => {
    try {
      const response = await api.get("/Complaint/getAllComplaint");
      return response;
    } catch (error) {
      throw new Error(
        error.response?.data?.message || "Error obteniendo las complaints"
      );
    }
  },
  completeComplaint: async (complaintId) => {
    try {
      const response = await api.patch("/Complaint/CompleteComplaint", null, {
        params: { complaintId },
      });
      return response;
    } catch (error) {
      throw new Error(
        error.response?.data?.message || "Error al resolver la queja."
      );
    }
  },
  getComplaintById: async (id) => {
  try {
    const response = await api.get("/Complaint/GetComplaintById", {
      params: { complaintId: id },
    });
    return response;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Error obteniendo la queja"
    );
  }
}

};
