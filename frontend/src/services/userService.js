import axios from "axios";

const API_URL = "http://localhost:3000/api/v1/users";

const getMe = async () => {
  const response = await axios.get(`${API_URL}/me`, {
    withCredentials: true,
  });
  return response.data;
};

const updateMe = async (params) => {
  const response = await axios.patch(`${API_URL}/me`, params, {
    withCredentials: true,
  });
  return response.data;
};

const getAllUsers = async () => {
  const response = await axios.get(`${API_URL}`, {
    withCredentials: true,
  });
  return response.data;
};

const createUser = async (params) => {
  const response = await axios.post(`${API_URL}`, params, {
    withCredentials: true,
  });
  return response.data;
};

const deleteUser = async (userId) => {
  const response = await axios.delete(`${API_URL}/${userId}`, {
    withCredentials: true,
  });
  return response.data;
};

const updateUser = async (userId, params) => {
  const response = await axios.patch(`${API_URL}/${userId}`, params, {
    withCredentials: true,
  });
  return response.data;
};

const userService = {
  getMe,
  updateMe,
  getAllUsers,
  createUser,
  deleteUser,
  updateUser,
};

export default userService;
