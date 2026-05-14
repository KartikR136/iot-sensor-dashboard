import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL
});

export const fetchSensorHistory = async () => {
  const response = await api.get("/sensors/history?limit=50");
  return response.data.data;
};

export const fetchAlertConfig = async () => {
  const response = await api.get("/sensors/alerts");
  return response.data.data;
};

export const updateAlertConfig = async (payload) => {
  const response = await api.put("/sensors/alerts", payload);
  return response.data.data;
};

export default api;