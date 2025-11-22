// BookDetailsComponent.js
import React, { useEffect, useState } from "react";

import { Link, useParams } from "react-router-dom";
import BookDetailsService from "../services/BookDetailsService";
import BookService from "../services/BookService";
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
  const { bookId } = useParams();

  const [bookDetails, setBookDetails] = useState([]);
  const [books, setBooks] = useState([]);
  const [formData, setFormData] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [toast, setToast] = useState(null);

  const showToast = (message, type = "success") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 2400);
  };

  const loadBookDetails = async () => {
    try {
      setLoading(true);
      setErrorMsg("");
      const data = await BookDetailsService.getAllBookDetails();
      setBookDetails(data);
    } catch (error) {
      console.error(error);
      setErrorMsg("Failed to load book details.");
      showToast("Unable to load book details right now.", "error");
    } finally {
      setLoading(false);
    }
  };

  const loadBooks = async () => {
    try {
      const data = await BookService.getAllBooks();
      setBooks(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error(error);
      showToast("Unable to load books for selection.", "error");
    }
  };

  useEffect(() => {
    loadBookDetails();
    loadBooks();
  }, []);

  const syncFormWithSelection = (selectedBookId) => {
    const parsedId = selectedBookId ? parseInt(selectedBookId, 10) : null;

    if (!parsedId) {
      setEditingId(null);
      setFormData({ ...emptyForm, bookId: "" });
      return;
    }

    const existingDetail = bookDetails.find(
      (detail) => detail.bookId === parsedId
    );

    if (existingDetail) {
      setEditingId(existingDetail.id ?? null);
      setFormData({
        bookId: parsedId.toString(),
        genre: existingDetail.genre ?? "",
        language: existingDetail.language ?? "",
        pageCount: existingDetail.pageCount ?? "",
        format: existingDetail.format ?? "",
        coverImageUrl: existingDetail.coverImageUrl ?? "",
      });
    } else {
      setEditingId(null);
      setFormData({ ...emptyForm, bookId: parsedId.toString() });
    }
  };

  useEffect(() => {
    if (bookId) {
      syncFormWithSelection(bookId);
    }
  }, [bookId, bookDetails]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "bookId") {
      syncFormWithSelection(value);
      return;
    }

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
        showToast("Book detail updated.");
      } else {
        await BookDetailsService.createBookDetail(payload);
        showToast("Book detail added.");
      }

      await loadBookDetails();
      resetForm();
    } catch (error) {
      console.error(error);
      setErrorMsg("Failed to save book detail. Check required fields.");
      showToast("Unable to save book detail.", "error");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (detail) => {
    setEditingId(detail.id);
    setFormData({
      bookId: detail.bookId?.toString() ?? "",
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
      showToast("Book detail deleted.");
    } catch (error) {
      console.error(error);
      setErrorMsg("Failed to delete book detail.");
      showToast("Unable to delete book detail.", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="details-page">
      <div className="details-shell">
        <header className="details-header">
          <div className="header-text">
            <p className="eyebrow">Metadata</p>
            <h1>Book Details</h1>
            <p className="subhead">
              Maintain formats, languages, and covers with a focused workspace
              that mirrors the refreshed book and inventory experience.
            </p>
          </div>
          <div className="header-actions">
            <Link to="/" className="btn btn-ghost">
              Homepage
            </Link>
          </div>
        </header>

        <div className="details-nav">
          <Link to="/books" className="nav-pill">
            Book Management
          </Link>
          <Link to="/inventory" className="nav-pill">
            Inventory Management
          </Link>
          <Link to="/book-details" className="nav-pill active">
            Book Details
          </Link>
        </div>

        <section className="workspace-card form-card">
          <div className="workspace-head">
            <div>
              <p className="eyebrow">{editingId ? "Update" : "Create"}</p>
              <h2>{editingId ? "Edit book detail" : "Add book detail"}</h2>
              <p className="muted">
                Link metadata to a book ID and keep formats, page count, and
                cover images consistent.
              </p>
            </div>
            <button type="button" className="btn btn-ghost" onClick={resetForm}>
              Clear form
            </button>
          </div>

          {errorMsg && <div className="alert error">{errorMsg}</div>}
          {loading && <div className="alert muted">Working...</div>}

          <form className="book-details-form" onSubmit={handleSubmit}>
            <div className="form-row">
              <label htmlFor="bookId">Book *</label>
              <div className="select-wrap">
                <select
                  id="bookId"
                  name="bookId"
                  value={formData.bookId}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select a book</option>
                  {books.map((book) => (
                    <option key={book.id} value={book.id}>
                      {book.title}
                    </option>
                  ))}
                </select>
              </div>
              <span className="help-text">
                Pick a book to auto-fill existing details.
              </span>
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
                placeholder="e.g., Fantasy"
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
                placeholder="e.g., English"
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
                placeholder="Total pages"
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
                placeholder="https://example.com/cover.jpg"
              />
              <span className="help-text">
                Optional. Use a direct link to the cover image.
              </span>
            </div>

            <div className="button-row">
              <button type="submit" className="btn btn-primary">
                {editingId ? "Update detail" : "Create detail"}
              </button>
              <button
                type="button"
                className="btn btn-secondary"
                onClick={resetForm}
              >
                Reset
              </button>
            </div>
          </form>
        </section>

        <section className="workspace-card list-card">
          <div className="workspace-head">
            <div>
              <p className="eyebrow">Library</p>
              <h2>Book details</h2>
              <p className="muted">
                Review all enriched book metadata and manage quick edits.
              </p>
            </div>
          </div>

          <div className="details-grid">
            {bookDetails && bookDetails.length > 0 ? (
              bookDetails.map((detail) => {
                const relatedBook = books.find((b) => b.id === detail.bookId);
                const bookTitle =
                  relatedBook?.title || `Book #${detail.bookId}`;
                return (
                  <div key={detail.id} className="detail-card">
                    <div className="card-meta">
                      <div className="badge">ID #{detail.id}</div>
                    </div>

                    <h3 className="detail-title">{bookTitle}</h3>

                    <p className="muted">
                      {detail.genre || "Genre not set"} ·{" "}
                      {detail.language || "Language not set"}
                    </p>

                    <div className="detail-stats">
                      <div className="stat">
                        <span className="label">Pages:</span>
                        <span className="value">{detail.pageCount || "-"}</span>
                      </div>
                      <div className="stat">
                        <span className="label">Format:</span>
                        <span className="value">{detail.format || "-"}</span>
                      </div>
                    </div>

                    <div className="cover-link">
                      {detail.coverImageUrl ? (
                        <a
                          href={detail.coverImageUrl}
                          target="_blank"
                          rel="noreferrer"
                        >
                          View cover
                        </a>
                      ) : (
                        <span className="muted">No cover URL</span>
                      )}
                    </div>

                    <div className="card-actions">
                      <button
                        type="button"
                        className="btn btn-ghost"
                        onClick={() => handleEdit(detail)}
                      >
                        Edit
                      </button>
                      <button
                        type="button"
                        className="btn btn-danger"
                        onClick={() => handleDelete(detail.id)}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="empty-state">
                <div>
                  <p className="eyebrow">No details yet</p>
                  <h3>Add enriched book data</h3>
                  <p className="muted">
                    Capture genres, languages, formats, and cover links to power
                    your catalog.
                  </p>
                </div>
                <button
                  className="btn btn-primary"
                  onClick={() => document.getElementById("bookId")?.focus()}
                >
                  Start adding details
                </button>
              </div>
            )}
          </div>
        </section>
      </div>

      {toast && (
        <div className={`toast ${toast.type}`}>
          <span>{toast.message}</span>
        </div>
      )}
    </div>
  );
};

export default BookDetailsComponent;
