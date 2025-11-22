// import React, { useState } from 'react';
// import BookService from '../services/BookService';
// import { useNavigate } from 'react-router-dom';
// import './AddBook.css';  // Import a CSS file for styling
import React, { useState } from "react";
import BookService from "../services/BookService";
import { Link, useNavigate } from "react-router-dom";
import "./BookForms.css";

const AddBook = () => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [isbn, setIsbn] = useState("");
  const [price, setPrice] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const book = { title, author, isbn, price: parseFloat(price) };

    try {
      await BookService.createBook(book); // Post request to create the book

      // Navigate back WITH toast meta for BooksManagement
      navigate("/books", {
        state: {
          toastMessage: "Book created.",
          toastType: "success",
        },
      });
    } catch (error) {
      console.error("Error creating book:", error);
      // optional: later you can add local error UI here
    }
  };

  return (
    <div className="book-form-page">
      <div className="book-form-shell">
        <header className="form-header">
          <div className="header-text">
            <p className="eyebrow">Workspace</p>
            <h1>Add Book</h1>
            <p className="subhead">
              Introduce a new title to the catalog with clean, consistent
              metadata to keep your shelf organized.
            </p>
          </div>
          <div className="header-actions">
            <Link to="/books" className="btn ghost">
              Back to Books
            </Link>
            <Link to="/inventory" className="btn subtle">
              Inventory View
            </Link>
          </div>
        </header>

        <nav className="form-nav">
          <Link to="/books" className="nav-pill">
            Book Management
          </Link>
          <Link to="/inventory" className="nav-pill">
            Inventory Management
          </Link>
          <Link to="/book-details" className="nav-pill">
            Book Details
          </Link>
          <span className="nav-pill active">Add Book</span>
        </nav>

        <form className="form-card" onSubmit={handleSubmit}>
          <div className="form-grid">
            <div className="form-group">
              <label>Title</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                className="input-shell"
                placeholder="e.g., The Midnight Library"
              />
            </div>
            <div className="form-group">
              <label>Author</label>
              <input
                type="text"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                required
                className="input-shell"
                placeholder="e.g., Matt Haig"
              />
            </div>
            <div className="form-group">
              <label>ISBN</label>
              <input
                type="text"
                value={isbn}
                onChange={(e) => setIsbn(e.target.value)}
                required
                className="input-shell"
                placeholder="978-0062315007"
              />
              <p className="helper">Use the 13-digit ISBN when available.</p>
            </div>
            <div className="form-group">
              <label>Price</label>
              <input
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                required
                className="input-shell"
                min="0"
                step="0.01"
                placeholder="19.99"
              />
              <p className="helper">
                Set the list price in your store currency.
              </p>
            </div>
          </div>

          <div className="form-footer">
            <span className="badge">Catalog entry</span>
            <div className="actions">
              <Link to="/books" className="btn subtle">
                Cancel
              </Link>
              <button type="submit" className="btn primary">
                Add Book
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddBook;
