import React, { useState, useEffect } from 'react';
import InventoryService from '../services/InventoryService';
import BookService from '../services/BookService';
import { useNavigate } from 'react-router-dom';
import './AddInventory.css';  // Import a CSS file for styling

const AddInventory = () => {
  const [bookId, setBookId] = useState('');
  const [quantity, setQuantity] = useState('');
  const [price, setPrice] = useState('');
  const [books, setBooks] = useState([]);
  const history = useNavigate();

  // Fetch the list of books for the dropdown
  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const bookList = await BookService.getAllBooks(); // Replace with actual method to get books
        setBooks(bookList);
      } catch (error) {
        console.error('Error fetching books:', error);
      }
    };

    fetchBooks();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const inventory = { bookId: parseInt(bookId), quantity: parseInt(quantity, 10), price: parseFloat(price) };

    try {
      await InventoryService.createInventory(inventory);
      history('/Inventory');
    } catch (error) {
      console.error('Error creating inventory:', error);
    }
  };

  return (
    <div className="add-inventory-container">
      <h1>Add New Inventory</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Book</label>
          <select
            value={bookId}
            onChange={(e) => setBookId(e.target.value)}
            required
            className="form-input"
          >
            <option value="">Select a Book</option>
            {books.map((book) => (
              <option key={book.id} value={book.id}>
                {book.title} by {book.author}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label>Quantity</label>
          <input
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            required
            className="form-input"
          />
        </div>
        <div className="form-group">
          <label>Price</label>
          <input
            type="number"
            step="0.01"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
            className="form-input"
          />
        </div>
        <button type="submit" className="submit-button">Add Inventory</button>
      </form>
    </div>
  );
};

export default AddInventory;
