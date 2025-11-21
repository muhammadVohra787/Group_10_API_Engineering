import axios from "axios";

const axiosClient = axios.create({
  baseURL: "https://localhost:7085/api",
});

// Add API key to every request
axiosClient.interceptors.request.use((config) => {
  config.headers["api-key"] = "xzy"; // or localStorage.getItem("key")
  return config;
});

export default axiosClient;
