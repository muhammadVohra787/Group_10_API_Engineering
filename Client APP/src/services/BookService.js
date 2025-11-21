import axios from "axios";

const API_URL = "https://localhost:7085/api/Books"; // Update with your API URL
// const response = await axios.get(API_URL, {
//   headers: {
//     "api-key": "xzy", // your header here
//   },
// });
const getAllBooks = async () => {
  try {
    const response = await axios.get(API_URL, {
      headers: {
        "api-key": "xzy", // your header here
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching books:", error);
    throw error;
  }
};

const getBookById = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/${id}`, {
      headers: {
        "api-key": "xzy", // your header here
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching book:", error);
    throw error;
  }
};

const createBook = async (book) => {
  try {
    const response = await axios.post(API_URL, book);
    return response.data;
  } catch (error) {
    console.error("Error creating book:", error);
    throw error;
  }
};

const updateBook = async (id, book) => {
  try {
    const response = await axios.put(`${API_URL}/${id}`, book);
    return response.data;
  } catch (error) {
    console.error("Error updating book:", error);
    throw error;
  }
};
const patchBook = async (id, patchData) => {
  try {
    const response = await axios.patch(`${API_URL}/${id}`, patchData, {
      headers: {
        "Content-Type": "application/json-patch+json", // Correct Content-Type for JsonPatchDocument
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
    await axios.delete(`${API_URL}/${id}`);
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
