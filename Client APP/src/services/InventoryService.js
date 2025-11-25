import axios from "axios";

const API_URL = "https://localhost:7085/api/Inventory";
const API_KEY = "4rxbLeqJF1gcGSxUhYPBzLgMsP6wm6jYnLTRYRJQpdcJnAuR"; // << add your key here

// Shared axios instance → automatically adds ?apikey=XYZ
const api = axios.create({
  baseURL: API_URL,
  headers: {
    apikey: API_KEY, // => ?apikey=YOUR_API_KEY_HERE on every request
  },
});

// ---------------- CRUD FUNCTIONS ----------------

const getAllInventories = async () => {
  try {
    const response = await api.get("/");
    return response.data;
  } catch (error) {
    console.error("Error fetching inventories:", error);
    throw error;
  }
};

const getInventoryById = async (id) => {
  try {
    const response = await api.get(`/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching inventory:", error);
    throw error;
  }
};

const createInventory = async (inventory) => {
  try {
    const response = await api.post("/", inventory);
    return response.data;
  } catch (error) {
    console.error("Error creating inventory:", error);
    throw error;
  }
};

const updateInventory = async (id, inventory) => {
  try {
    const response = await api.put(`/${id}`, inventory);
    return response.data;
  } catch (error) {
    console.error("Error updating inventory:", error);
    throw error;
  }
};

const patchInventory = async (id, patchOperations) => {
  try {
    const response = await api.patch(`/${id}`, patchOperations, {
      headers: {
        "Content-Type": "application/json-patch+json",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error patching inventory:", error);
    throw error;
  }
};

const deleteInventory = async (id) => {
  try {
    await api.delete(`/${id}`);
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
