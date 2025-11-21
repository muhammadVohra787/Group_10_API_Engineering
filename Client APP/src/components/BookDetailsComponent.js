// BookDetailsComponent.js
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import BookDetailsService from "../services/BookDetailsService";
import "./BookDetailsComponent.css";

const emptyForm = {
  bookId: "",
  genre: "",
  language: "",
  pageCount: "",
  format: "",
  coverImageUrl: "",
};

const BookDetailsComponent = () => {
  const { bookId } = useParams(); // for /book-details/:bookId

  const [bookDetails, setBookDetails] = useState([]);
  const [formData, setFormData] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const loadBookDetails = async () => {
    try {
      setLoading(true);
      setErrorMsg("");
      const data = await BookDetailsService.getAllBookDetails();
      setBookDetails(data);
    } catch (error) {
      console.error(error);
      setErrorMsg("Failed to load book details.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadBookDetails();
  }, []);

  // Prefill BookId when coming from /book-details/:bookId
  useEffect(() => {
    if (bookId) {
      setFormData((prev) => ({
        ...prev,
        bookId: bookId,
      }));
    }
  }, [bookId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const resetForm = () => {
    setFormData(emptyForm);
    setEditingId(null);
    setErrorMsg("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      setErrorMsg("");

      const payload = {
        bookId: formData.bookId ? parseInt(formData.bookId, 10) : null,
        genre: formData.genre || null,
        language: formData.language || null,
        pageCount: formData.pageCount ? parseInt(formData.pageCount, 10) : null,
        format: formData.format || null,
        coverImageUrl: formData.coverImageUrl || null,
      };

      if (editingId) {
        await BookDetailsService.updateBookDetail(editingId, payload);
      } else {
        await BookDetailsService.createBookDetail(payload);
      }

      await loadBookDetails();
      resetForm();
    } catch (error) {
      console.error(error);
      // you can inspect error.response?.data here if you want
      setErrorMsg("Failed to save book detail. Check required fields.");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (detail) => {
    setEditingId(detail.id);
    setFormData({
      bookId: detail.bookId ?? "",
      genre: detail.genre ?? "",
      language: detail.language ?? "",
      pageCount: detail.pageCount ?? "",
      format: detail.format ?? "",
      coverImageUrl: detail.coverImageUrl ?? "",
    });
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this book detail?")) {
      return;
    }
    try {
      setLoading(true);
      setErrorMsg("");
      await BookDetailsService.deleteBookDetail(id);
      await loadBookDetails();
      if (editingId === id) {
        resetForm();
      }
    } catch (error) {
      console.error(error);
      setErrorMsg("Failed to delete book detail.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="book-details-container">
      <h2>Book Details</h2>

      {errorMsg && <div className="error-message">{errorMsg}</div>}
      {loading && <div className="loading-message">Loading...</div>}

      <form className="book-details-form" onSubmit={handleSubmit}>
        <div className="form-row">
          <label htmlFor="bookId">Book ID *</label>
          <input
            type="number"
            id="bookId"
            name="bookId"
            value={formData.bookId}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-row">
          <label htmlFor="genre">Genre</label>
          <input
            type="text"
            id="genre"
            name="genre"
            value={formData.genre}
            onChange={handleChange}
            maxLength={100}
          />
        </div>

        <div className="form-row">
          <label htmlFor="language">Language</label>
          <input
            type="text"
            id="language"
            name="language"
            value={formData.language}
            onChange={handleChange}
            maxLength={50}
          />
        </div>

        <div className="form-row">
          <label htmlFor="pageCount">Page Count *</label>
          <input
            type="number"
            id="pageCount"
            name="pageCount"
            value={formData.pageCount}
            onChange={handleChange}
            min={1}
            required
          />
        </div>

        <div className="form-row">
          <label htmlFor="format">Format *</label>
          <input
            type="text"
            id="format"
            name="format"
            value={formData.format}
            onChange={handleChange}
            placeholder="Hardcover / Paperback / eBook"
            maxLength={20}
            required
          />
        </div>

        <div className="form-row">
          <label htmlFor="coverImageUrl">Cover Image URL</label>
          <input
            type="url"
            id="coverImageUrl"
            name="coverImageUrl"
            value={formData.coverImageUrl}
            onChange={handleChange}
            maxLength={500}
          />
        </div>

        <div className="button-row">
          <button type="submit" className="btn primary">
            {editingId ? "Update" : "Create"}
          </button>
          <button
            type="button"
            className="btn secondary"
            onClick={resetForm}
          >
            Clear
          </button>
        </div>
      </form>

      <hr />

      <h3>All Book Details</h3>
      <div className="table-wrapper">
        <table className="book-details-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Book ID</th>
              <th>Genre</th>
              <th>Language</th>
              <th>Page Count</th>
              <th>Format</th>
              <th>Cover Image</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {bookDetails && bookDetails.length > 0 ? (
              bookDetails.map((detail) => (
                <tr key={detail.id}>
                  <td>{detail.id}</td>
                  <td>{detail.bookId}</td>
                  <td>{detail.genre}</td>
                  <td>{detail.language}</td>
                  <td>{detail.pageCount}</td>
                  <td>{detail.format}</td>
                  <td>
                    {detail.coverImageUrl ? (
                      <a
                        href={detail.coverImageUrl}
                        target="_blank"
                        rel="noreferrer"
                      >
                        View
                      </a>
                    ) : (
                      "-"
                    )}
                  </td>
                  <td>
                    <button
                      type="button"
                      className="btn small"
                      onClick={() => handleEdit(detail)}
                    >
                      Edit
                    </button>
                    <button
                      type="button"
                      className="btn small danger"
                      onClick={() => handleDelete(detail.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="8" className="no-data">
                  No book details found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BookDetailsComponent;
