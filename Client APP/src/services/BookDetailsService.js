// import axios from "axios";

// const API_URL = "https://localhost:7085/api/BookDetails"; // Update with your API URL

// const getAllBookDetails = async () => {
//   try {
//     const response = await axios.get(API_URL);
//     return response.data;
//   } catch (error) {
//     console.error("Error fetching book details:", error);
//     throw error;
//   }
// };

// const getBookDetailById = async (id) => {
//   try {
//     const response = await axios.get(`${API_URL}/${id}`);
//     return response.data;
//   } catch (error) {
//     console.error("Error fetching book detail by id:", error);
//     throw error;
//   }
// };

// const getBookDetailByBookId = async (bookId) => {
//   try {
//     const response = await axios.get(`${API_URL}/book/${bookId}`);
//     return response.data;
//   } catch (error) {
//     console.error("Error fetching book detail by bookId:", error);
//     throw error;
//   }
// };

// const createBookDetail = async (bookDetail) => {
//   try {
//     const response = await axios.post(API_URL, bookDetail);
//     return response.data;
//   } catch (error) {
//     console.error("Error creating book detail:", error);
//     throw error;
//   }
// };

// const updateBookDetail = async (id, bookDetail) => {
//   try {
//     const response = await axios.put(`${API_URL}/${id}`, bookDetail);
//     return response.data;
//   } catch (error) {
//     console.error("Error updating book detail:", error);
//     throw error;
//   }
// };

// const patchBookDetail = async (id, patchOperations) => {
//   // patchOperations should be an array of JSON Patch operations, e.g.:
//   // [{ op: "replace", path: "/price", value: 19.99 }]
//   try {
//     const response = await axios.patch(`${API_URL}/${id}`, patchOperations, {
//       headers: {
//         "Content-Type": "application/json-patch+json",
//       },
//     });
//     return response.data;
//   } catch (error) {
//     console.error("Error patching book detail:", error);
//     throw error;
//   }
// };

// const deleteBookDetail = async (id) => {
//   try {
//     await axios.delete(`${API_URL}/${id}`);
//   } catch (error) {
//     console.error("Error deleting book detail:", error);
//     throw error;
//   }
// };

// export default {
//   getAllBookDetails,
//   getBookDetailById,
//   getBookDetailByBookId,
//   createBookDetail,
//   updateBookDetail,
//   patchBookDetail,
//   deleteBookDetail,
// };

// https://34.110.214.123.nip.io/proxy4grp10sec003/api/books?apikey=4rxbLeqJF1gcGSxUhYPBzLgMsP6wm6jYnLTRYRJQpdcJnAuR

import axios from "axios";

const API_URL =
  "https://34.110.214.123.nip.io/proxy4grp10sec003/api/BookDetails";
const API_KEY = "4rxbLeqJF1gcGSxUhYPBzLgMsP6wm6jYnLTRYRJQpdcJnAuR";

// Create axios instance with base settings
const api = axios.create({
  baseURL: API_URL,
  headers: {
    apikey: API_KEY, // => ?apikey=YOUR_API_KEY_HERE on every request
  },
});

// ---------------- CRUD METHODS ----------------

const getAllBookDetails = async () => {
  try {
    const response = await api.get("/");
    return response.data;
  } catch (error) {
    console.error("Error fetching book details:", error);
    throw error;
  }
};

const getBookDetailById = async (id) => {
  try {
    const response = await api.get(`/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching book detail by id:", error);
    throw error;
  }
};

const getBookDetailByBookId = async (bookId) => {
  try {
    const response = await api.get(`/book/${bookId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching book detail by bookId:", error);
    throw error;
  }
};

const createBookDetail = async (bookDetail) => {
  try {
    const response = await api.post("/", bookDetail);
    return response.data;
  } catch (error) {
    console.error("Error creating book detail:", error);
    throw error;
  }
};

const updateBookDetail = async (id, bookDetail) => {
  try {
    const response = await api.put(`/${id}`, bookDetail);
    return response.data;
  } catch (error) {
    console.error("Error updating book detail:", error);
    throw error;
  }
};

const patchBookDetail = async (id, patchOperations) => {
  try {
    const response = await api.patch(`/${id}`, patchOperations, {
      headers: {
        "Content-Type": "application/json-patch+json",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error patching book detail:", error);
    throw error;
  }
};

const deleteBookDetail = async (id) => {
  try {
    await api.delete(`/${id}`);
  } catch (error) {
    console.error("Error deleting book detail:", error);
    throw error;
  }
};

export default {
  getAllBookDetails,
  getBookDetailById,
  getBookDetailByBookId,
  createBookDetail,
  updateBookDetail,
  patchBookDetail,
  deleteBookDetail,
};
