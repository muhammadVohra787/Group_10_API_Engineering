// import axios from "axios";

// const API_URL = "https://localhost:7085/api/Inventory"; // Update with your API URL

// const getAllInventories = async () => {
//   try {
//     const response = await axios.get(API_URL);
//     return response.data;
//   } catch (error) {
//     console.error("Error fetching inventories:", error);
//     throw error;
//   }
// };

// const getInventoryById = async (id) => {
//   try {
//     const response = await axios.get(`${API_URL}/${id}`);
//     return response.data;
//   } catch (error) {
//     console.error("Error fetching inventory:", error);
//     throw error;
//   }
// };

// const createInventory = async (inventory) => {
//   try {
//     const response = await axios.post(API_URL, inventory);
//     return response.data;
//   } catch (error) {
//     console.error("Error creating inventory:", error);
//     throw error;
//   }
// };

// const updateInventory = async (id, inventory) => {
//   try {
//     const response = await axios.put(`${API_URL}/${id}`, inventory);
//     return response.data;
//   } catch (error) {
//     console.error("Error updating inventory:", error);
//     throw error;
//   }
// };
// const patchInventory = async (id, patchOperations) => {
//   try {
//     const response = await axios.patch(`${API_URL}/${id}`, patchOperations);
//     return response.data;
//   } catch (error) {
//     console.error("Error updating inventory:", error);
//     throw error;
//   }
// };

// const deleteInventory = async (id) => {
//   try {
//     await axios.delete(`${API_URL}/${id}`);
//   } catch (error) {
//     console.error("Error deleting inventory:", error);
//     throw error;
//   }
// };

// export default {
//   getAllInventories,
//   getInventoryById,
//   createInventory,
//   updateInventory,
//   deleteInventory,
//   patchInventory,
// };

// https://34.110.214.123.nip.io/proxy4grp10sec003/api/books?apikey=4rxbLeqJF1gcGSxUhYPBzLgMsP6wm6jYnLTRYRJQpdcJnAuR

import axios from "axios";

const API_URL = "https://34.110.214.123.nip.io/proxy4grp10sec003/api/Inventory";
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
