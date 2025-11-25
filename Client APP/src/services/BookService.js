import axios from "axios";

const API_URL = "https://localhost:7085/api/books"; // Proxy/API URL
const API_KEY = "4rxbLeqJF1gcGSxUhYPBzLgMsP6wm6jYnLTRYRJQpdcJnAuR";

// Create an axios instance so the apikey is always attached
const api = axios.create({
  baseURL: API_URL,
  headers: {
    apikey: API_KEY, // => ?apikey=YOUR_API_KEY_HERE on every request
  },
});

// ---------- CRUD METHODS ----------

const getAllBooks = async () => {
  try {
    const response = await api.get("/");
    return response.data;
  } catch (error) {
    console.error("Error fetching books:", error);
    throw error;
  }
};

const getBookById = async (id) => {
  try {
    const response = await api.get(`/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching book:", error);
    throw error;
  }
};

const createBook = async (book) => {
  try {
    const response = await api.post("/", book);
    return response.data;
  } catch (error) {
    console.error("Error creating book:", error);
    throw error;
  }
};

const updateBook = async (id, book) => {
  try {
    const response = await api.put(`/${id}`, book);
    return response.data;
  } catch (error) {
    console.error("Error updating book:", error);
    throw error;
  }
};

const patchBook = async (id, patchData) => {
  try {
    const response = await api.patch(`/${id}`, patchData, {
      headers: {
        "Content-Type": "application/json-patch+json",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error updating book with PATCH:", error);
    throw error;
  }
};

const deleteBook = async (id) => {
  try {
    await api.delete(`/${id}`);
  } catch (error) {
    console.error("Error deleting book:", error);
    throw error;
  }
};

export default {
  getAllBooks,
  getBookById,
  createBook,
  updateBook,
  deleteBook,
  patchBook,
};
