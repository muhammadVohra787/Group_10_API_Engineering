import React, { useState } from 'react';
import BookService from '../services/BookService';
import { useNavigate } from 'react-router-dom';
import './AddBook.css';  // Import a CSS file for styling

const AddBook = () => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [isbn, setIsbn] = useState('');
  const [price, setPrice] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const book = { title, author, isbn, price: parseFloat(price) };

    try {
      await BookService.createBook(book); // Post request to create the book
      navigate('/books'); // Navigate to the books page
    } catch (error) {
      console.error('Error creating book:', error);
    }
  };

  return (
    <div className="add-book-container">
      <h1>Add New Book</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="form-input"
          />
        </div>
        <div className="form-group">
          <label>Author</label>
          <input
            type="text"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            required
            className="form-input"
          />
        </div>
        <div className="form-group">
          <label>ISBN</label>
          <input
            type="text"
            value={isbn}
            onChange={(e) => setIsbn(e.target.value)}
            required
            className="form-input"
          />
        </div>
        <div className="form-group">
          <label>Price</label>
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
            className="form-input"
          />
        </div>
        
        <button type="submit" className="submit-button">Add Book</button>
      </form>
    </div>
  );
};

export default AddBook;
