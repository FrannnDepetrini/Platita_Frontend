import api from "../api";

export const complaintService = {
  getAllComplaint: async () => {
    try {
      const response = await api.get("Complaint/GetAllComplaint");
      return response;
    } catch (error) {
      throw new Error(
        error.response?.data?.message || "Error obteniendo las complaints"
      );
    }
  },
};
