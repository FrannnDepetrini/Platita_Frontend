import api from "../api";

export const complaintService = {
    createComplaint: async (complain) => {
        try {
            const response = await api.post("/Complaint/CreateComplaint",
                JSON.stringify(complain),
                {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
            );

            return response;

        } catch (error) {
            throw new Error(
                error.response?.data?.message || "Error al crear la queja"
            );
        }
    }
}