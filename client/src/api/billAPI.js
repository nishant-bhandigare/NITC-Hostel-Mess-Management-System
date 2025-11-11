import axios from "axios";

const BASE = import.meta.env.VITE_SERVER_URL || "http://localhost:5000";
const API = `${BASE}/api/bills`;

const authHeaders = () => ({
  headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
});

// Get current student's bills with optional query params: { year, page, limit, paymentStatus }
export const getMyBills = async (params = {}) => {
  const qs = new URLSearchParams(params).toString();
  const url = `${API}/my-bills${qs ? `?${qs}` : ""}`;
  return axios.get(url, authHeaders());
};

// Admin: generate bills for all students (used by GenerateBills page)
export const generateAllBills = async (payload) => {
  return axios.post(`${API}/generate-all`, payload, authHeaders());
};

// Admin/Manager: Get bills for a mess (server: GET /api/bills/mess/:messId)
export const getMessBills = async (messId, params = {}) => {
  const qs = new URLSearchParams(params).toString();
  const url = `${API}/mess/${messId}${qs ? `?${qs}` : ""}`;
  return axios.get(url, authHeaders());
};