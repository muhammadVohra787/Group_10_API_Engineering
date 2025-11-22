import React, { useState, useEffect } from "react";
import InventoryService from "../services/InventoryService";
import BookService from "../services/BookService";
// import { useNavigate } from 'react-router-dom';
// import './AddInventory.css';  // Import a CSS file for styling
import { useNavigate, Link } from "react-router-dom";
import "./AddInventory.css";

const AddInventory = () => {
  const [bookId, setBookId] = useState("");
  const [quantity, setQuantity] = useState("");
  const [price, setPrice] = useState("");
  const [books, setBooks] = useState([]);
  const [toast, setToast] = useState(null);
  const history = useNavigate();

  // Fetch the list of books for the dropdown
  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const bookList = await BookService.getAllBooks();
        setBooks(bookList);
      } catch (error) {
        console.error("Error fetching books:", error);
        showToast("Unable to load books.", "error");
      }
    };

    fetchBooks();
  }, []);

  const showToast = (message, type = "success") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 2200);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const inventory = {
      bookId: parseInt(bookId),
      quantity: parseInt(quantity, 10),
      price: parseFloat(price),
    };

    try {
      await InventoryService.createInventory(inventory);
      // history("/Inventory");
      showToast("Inventory added successfully.");
      setTimeout(() => history("/Inventory"), 600);
    } catch (error) {
      console.error("Error creating inventory:", error);
      showToast("Error creating inventory.", "error");
    }
  };

  return (
    // <div className="add-inventory-container">
    //   <h1>Add New Inventory</h1>
    //   <form onSubmit={handleSubmit}>
    //     <div className="form-group">
    //       <label>Book</label>
    //       <select
    //         value={bookId}
    //         onChange={(e) => setBookId(e.target.value)}
    //         required
    //         className="form-input"
    //       >
    //         <option value="">Select a Book</option>
    //         {books.map((book) => (
    //           <option key={book.id} value={book.id}>
    //             {book.title} by {book.author}
    //           </option>
    //         ))}
    //       </select>
    <div className="inventory-form-page">
      <div className="inventory-form-shell">
        <header className="form-header">
          <div className="header-text">
            <p className="eyebrow">Inventory Ops</p>
            <h1>Add Inventory</h1>
            <p className="subhead">
              Connect a book to your inventory, set quantity, and track pricing
              in one step.
            </p>
          </div>
          <div className="header-actions">
            <Link to="/inventory" className="btn btn-ghost">
              Back to inventory
            </Link>
          </div>
        </header>

        <div className="form-nav">
          <Link to="/books" className="nav-pill">
            Book Management
          </Link>
          <Link to="/inventory" className="nav-pill active">
            Inventory Management
          </Link>
          <Link to="/book-details" className="nav-pill">
            Book Details
          </Link>
        </div>
        {/* <div className="form-group">
          <label>Quantity</label>
          <input
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            required
            className="form-input"
          /> */}

        <div className="form-card">
          <form onSubmit={handleSubmit} className="form-grid">
            <div className="form-group">
              <label>Book</label>
              <select
                value={bookId}
                onChange={(e) => setBookId(e.target.value)}
                required
                className="input-shell"
              >
                <option value="">Select a Book</option>
                {books.map((book) => (
                  <option key={book.id} value={book.id}>
                    {book.title} by {book.author}
                  </option>
                ))}
              </select>
              <p className="helper">
                Choose the title this inventory record belongs to.
              </p>
            </div>

            <div className="form-group">
              <label>Quantity</label>
              <input
                type="number"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                required
                className="input-shell"
              />
              <p className="helper">Total copies available.</p>
            </div>

            <div className="form-group">
              <label>Price</label>
              <input
                type="number"
                step="0.01"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                required
                className="input-shell"
              />
              <p className="helper">Unit price for this book in inventory.</p>
            </div>

            <div className="form-actions">
              <button type="submit" className="btn btn-primary">
                Add Inventory
              </button>
              <Link to="/inventory" className="btn btn-ghost">
                Cancel
              </Link>
            </div>
          </form>
        </div>
        {/* <div className="form-group">
          <label>Price</label>
          <input
            type="number"
            step="0.01"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
            className="form-input"
          /> */}
      </div>

      {toast && (
        <div className={`toast ${toast.type}`}>
          <span>{toast.message}</span>
        </div>

        //   <button type="submit" className="submit-button">
        //     Add Inventory
        //   </button>
        // </form>
      )}
    </div>
  );
};

export default AddInventory;
