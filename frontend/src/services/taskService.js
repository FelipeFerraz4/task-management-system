import axios from "axios";

const API_URL = "http://localhost:3000/api/v1/tasks";

const getTasks = async () => {
  try {
    const response = await axios.get(API_URL, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar as tarefas:", error);
    throw error;
  }
};

const getMyTasks = async () => {
  try {
    const response = await axios.get(`${API_URL}/me`, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar as tarefas:", error);
    throw error;
  }
}

const updateTask = async (taskId, params) => {
  try {
    const response = await axios.patch(`${API_URL}/${taskId}`, params, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.error("Erro ao atualizar a tarefa:", error);
    throw error;
  }
};



export default { getTasks, getMyTasks, updateTask };
