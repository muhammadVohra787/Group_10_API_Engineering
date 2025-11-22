// BooksManagement.js
import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom"; // ⬅ add useLocation
import BookService from "../services/BookService";
// import "./InventoryManagement.css";
import "./BooksManagement.css";

const BooksManagement = () => {
  const [books, setBooks] = useState([]);
  const [toast, setToast] = useState(null); // ⬅ toast state
  const navigate = useNavigate();
  const location = useLocation(); // ⬅ for messages from add/edit pages

  const showToast = (message, type = "success") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 2400);
  };

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const data = await BookService.getAllBooks();
        setBooks(data);
      } catch (error) {
        console.error("Error fetching books:", error);
        showToast("Unable to load books right now.", "error");
      }
    };

    fetchBooks();
  }, []);

  // When navigated here with state from Add/Edit pages, show toast once
  useEffect(() => {
    if (location.state && location.state.toastMessage) {
      showToast(
        location.state.toastMessage,
        location.state.toastType || "success"
      );
      // clear state so refreshing doesn't re-trigger
      navigate(location.pathname, { replace: true, state: {} });
    }
  }, [location, navigate]);

  const handleDelete = async (id) => {
    try {
      await BookService.deleteBook(id);
      setBooks((prev) => prev.filter((book) => book.id !== id));
      showToast("Book deleted.");
    } catch (error) {
      console.error("Error deleting book:", error);
      showToast("Error deleting book.", "error");
    }
  };

  const handleAddDetailsClick = (bookId) => {
    // go to /book-details/{bookId}
    navigate(`/book-details/${bookId}`);
  };

  return (
    <div className="books-page">
      <div className="books-shell">
        <header className="books-header">
          <div className="header-text">
            <p className="eyebrow">Workspace</p>
            <h1>Books Management</h1>
            <p className="subhead">
              Track every title with quick actions to edit, refine details, or
              clear out old records. Keep your catalog looking sharp.
            </p>
          </div>
          <div className="header-actions">
            <Link to="/add-book" className="btn primary">
              + Add New Book
            </Link>
            <Link to="/" className="btn ghost">
              Homepage
            </Link>
          </div>
        </header>

        <nav className="books-nav">
          <Link to="/books" className="nav-pill active">
            Book Management
          </Link>
          <Link to="/inventory" className="nav-pill">
            Inventory Management
          </Link>
          <Link to="/book-details" className="nav-pill">
            Book Details
          </Link>
        </nav>

        <div className="list-card">
          <div className="list-head">
            <div>
              <p className="eyebrow">Active titles</p>
              <h2>Catalog</h2>
            </div>
            <Link to="/add-book" className="btn linkish">
              Add title
            </Link>
          </div>

          <ul className="books-list">
            {books.map((book) => (
              <li key={book.id} className="book-item">
                <div className="book-meta">
                  <p className="book-title">{book.title}</p>
                  <p className="book-author">by {book.author}</p>
                </div>
                <div className="actions">
                  <button
                    onClick={() => handleAddDetailsClick(book.id)}
                    className="btn subtle"
                  >
                    Details
                  </button>
                  <Link
                    to={`/edit-book/${book.id}`}
                    className="btn primary outline"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => handleDelete(book.id)}
                    className="btn danger"
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {toast && (
        <div className={`toast ${toast.type || ""}`}>
          <span>{toast.message}</span>
        </div>
      )}
    </div>
  );
};

export default BooksManagement;
