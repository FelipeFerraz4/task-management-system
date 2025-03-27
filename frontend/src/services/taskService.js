import axios from "axios";

const API_URL = "http://localhost:3000/api/v1/tasks";

export const getTasks = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar as tarefas:", error);
    throw error;
  }
};
