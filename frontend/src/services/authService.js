import axios from "axios";

const API_URL = "http://localhost:3000/api/v1/users/login";

export const login = async (email, password) => {
  const response = await axios.post(
    API_URL,
    { email, password },
    {
      withCredentials: true, // Para permitir o envio de cookies
    }
  );
  return response.data;
};
