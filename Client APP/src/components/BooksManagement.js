// BooksManagement.js
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom"; // ⬅ add useNavigate
import BookService from "../services/BookService";
import "./InventoryManagement.css";

const BooksManagement = () => {
  const [books, setBooks] = useState([]);
  const navigate = useNavigate(); // ⬅ create navigate

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const data = await BookService.getAllBooks();
        setBooks(data);
      } catch (error) {
        console.error("Error fetching books:", error);
      }
    };

    fetchBooks();
  }, []);

  const handleDelete = async (id) => {
    try {
      await BookService.deleteBook(id);
      setBooks(books.filter((book) => book.id !== id));
    } catch (error) {
      console.error("Error deleting book:", error);
    }
  };

  const handleAddDetailsClick = (bookId) => {
    // go to /book-details/{bookId}
    navigate(`/book-details/${bookId}`);
  };

  return (
    <div className="inventory-management-container">
      <nav className="navbar">
        <div className="navbar-brand">Book Inventory Management</div>
        <ul className="navbar-links">
          <li>
            <Link to="/books">Book Management</Link>
          </li>
          <li>
            <Link to="/inventory">Inventory Management</Link>
          </li>
          <li>
            <Link to="/book-details">Book Details</Link>
          </li>
        </ul>
      </nav>

      <div className="content-wrapper">
        <h1>Books Management</h1>
        <Link to="/add-book" className="btn btn-add">
          Add New Book
        </Link>
        <ul className="books-list">
          {books.map((book) => (
            <li key={book.id} className="book-item">
              <span>
                {book.title} - {book.author}
              </span>
              <div className="actions">
                <button
                  onClick={() => handleDelete(book.id)}
                  className="btn btn-delete"
                >
                  Delete
                </button>
                <Link to={`/edit-book/${book.id}`} className="btn btn-edit">
                  Edit
                </Link>

                {/* ✅ new button */}
                <button
                  onClick={() => handleAddDetailsClick(book.id)}
                  className="btn btn-add"
                >
                  Add Details
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default BooksManagement;
