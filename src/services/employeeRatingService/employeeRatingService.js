import api from "../api"

export const postRating = async (data) => {
  try {
    const response = await api.post("Rating/CreateRating", data)
    return response;
  } catch (error) {
    console.error("Error al publicar la reseña:", error);
    throw error;
  }
};
