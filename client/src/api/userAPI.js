import axios from "axios";

const BASE_URL = import.meta.env.VITE_SERVER_URL || "http://localhost:5000";

export const getStudentCount = async (messId) => {
  const token = localStorage.getItem("token");
  return await axios.get(`${BASE_URL}/api/users/count`, {
    params: { messId },
    headers: { Authorization: `Bearer ${token}` },
  });
};
