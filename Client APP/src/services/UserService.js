import axios from "axios";

const API_URL = "https://localhost:7085/api/user"; //'https://localhost:7085/api/user'; // Update with your API URL

const registerUser = async (user) => {
  try {
    const response = await axios.post(`${API_URL}/register`, user);
    return response.data;
  } catch (error) {
    console.error("Error registering user:", error);
    throw error;
  }
};

const loginUser = async (credentials) => {
  try {
    const response = await axios.post(`${API_URL}/login`, credentials);
    return response.data;
  } catch (error) {
    console.error("Error logging in:", error);
    throw error;
  }
};

export default {
  registerUser,
  loginUser,
};
