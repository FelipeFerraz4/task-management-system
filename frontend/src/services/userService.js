import axios from "axios";

const API_URL = "http://localhost:3000/api/v1/users/me";

const getMe = async () => {
  const response = await axios.get(
    API_URL,
    {
      withCredentials: true,
    }
  );
  return response.data;
};

export default getMe;
