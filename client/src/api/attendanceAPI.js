import axios from "axios";

const API_URL = "http://localhost:5000/api/attendance";

// Include JWT token from localStorage if you use login
const getAuthHeaders = () => {
  const token = localStorage.getItem("token");
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

// ✅ Mark daily attendance
export const markAttendance = async (attendanceData) => {
  return await axios.post(API_URL, attendanceData, getAuthHeaders());
};

// ✅ Register leave
export const registerLeave = async (leaveData) => {
  return await axios.post(`${API_URL}/leave`, leaveData, getAuthHeaders());
};

// ✅ Get user’s attendance history
export const getMyAttendance = async (startDate, endDate) => {
  return await axios.get(`${API_URL}/my-attendance?startDate=${startDate}&endDate=${endDate}`, getAuthHeaders());
};
