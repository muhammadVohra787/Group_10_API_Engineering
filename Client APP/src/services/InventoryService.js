import axios from "axios";

const API_URL = "https://localhost:7085/api/Inventory"; // Update with your API URL

const getAllInventories = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error("Error fetching inventories:", error);
    throw error;
  }
};

const getInventoryById = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching inventory:", error);
    throw error;
  }
};

const createInventory = async (inventory) => {
  try {
    const response = await axios.post(API_URL, inventory);
    return response.data;
  } catch (error) {
    console.error("Error creating inventory:", error);
    throw error;
  }
};

const updateInventory = async (id, inventory) => {
  try {
    const response = await axios.put(`${API_URL}/${id}`, inventory);
    return response.data;
  } catch (error) {
    console.error("Error updating inventory:", error);
    throw error;
  }
};
const patchInventory = async (id, patchOperations) => {
  try {
    const response = await axios.patch(`${API_URL}/${id}`, patchOperations);
    return response.data;
  } catch (error) {
    console.error("Error updating inventory:", error);
    throw error;
  }
};

const deleteInventory = async (id) => {
  try {
    await axios.delete(`${API_URL}/${id}`);
  } catch (error) {
    console.error("Error deleting inventory:", error);
    throw error;
  }
};

export default {
  getAllInventories,
  getInventoryById,
  createInventory,
  updateInventory,
  deleteInventory,
  patchInventory,
};
