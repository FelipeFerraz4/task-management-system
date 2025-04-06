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

export default {getMe, updateMe, getAllUsers};
