import axios from "axios";

const API_URL = `${import.meta.env.VITE_SERVER_URL}/api/attendance`;

// Include JWT token from localStorage if you use login
const getAuthHeaders = () => {
  const token = localStorage.getItem("token");
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

// Mark daily attendance
export const markAttendance = async (attendanceData) => {
  return await axios.post(API_URL, attendanceData, getAuthHeaders());
};

// Register leave
export const registerLeave = async (leaveData) => {
  return await axios.post(`${API_URL}/leave`, leaveData, getAuthHeaders());
};

// Get user’s attendance history
export const getMyAttendance = async (startDate, endDate) => {
  return await axios.get(`${API_URL}/my-attendance?startDate=${startDate}&endDate=${endDate}`, getAuthHeaders());
};

//  Cancel a leave (calls PUT /cancel-leave/:id)
export const cancelLeave = async (attendanceId) => {
  return await axios.put(`${API_URL}/cancel-leave/${attendanceId}`, {}, getAuthHeaders());
};

//  Mark a date as present (helper that calls markAttendance endpoint)
// `date` should be an ISO string or Date object. This marks all meals present.
export const markPresent = async (date) => {
  const meals = [
    { mealType: "breakfast", isPresent: true },
    { mealType: "lunch", isPresent: true },
    { mealType: "eveningSnacks", isPresent: true },
    { mealType: "dinner", isPresent: true },
  ];
  return await axios.post(API_URL, { date, meals }, getAuthHeaders());
};



