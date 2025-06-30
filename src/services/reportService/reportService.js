import api from "../api";

export const reportService = {
  addReport: async (dataReport) => {
    try {
      const response = api.post("/Report/AddReport", null, {
        params: { jobId: dataReport.id, category: dataReport.category },
      });
      return response;
    } catch (error) {
      throw new Error(
        error.response?.data?.message || "Error añadiendo el reporte"
      );
    }
  },
};
