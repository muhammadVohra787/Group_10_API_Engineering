import React, { useState, useEffect } from 'react'; 
import InventoryService from '../services/InventoryService';
import BookService from '../services/BookService';
import { useParams, useNavigate } from 'react-router-dom';
import './EditInventory.css';

const EditInventory = () => {
  const { id } = useParams();
  const [bookId, setBookId] = useState('');
  const [quantity, setQuantity] = useState('');
  const [price, setPrice] = useState('');
  const [initialInventory, setInitialInventory] = useState(null);
  const [books, setBooks] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const history = useNavigate();

  // Fetch inventory details and book list
  useEffect(() => {
    const fetchInventory = async () => {
      try {
        const inventory = await InventoryService.getInventoryById(id);
        setBookId(inventory.bookId);  // Book cannot be changed
        setQuantity(inventory.quantity);
        setPrice(inventory.price);
        setInitialInventory({
          quantity: inventory.quantity,
          price: inventory.price
        });
        setLoading(false);
      } catch (error) {
        setError('Error fetching inventory details');
        console.error('Error fetching inventory:', error);
        setLoading(false);
      }
    };

    const fetchBooks = async () => {
      try {
        const bookList = await BookService.getAllBooks();
        setBooks(bookList);
      } catch (error) {
        console.error('Error fetching books:', error);
      }
    };

    fetchInventory();
    fetchBooks();
  }, [id]);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check which fields have been updated
    const updatedFields = {
      quantity: parseInt(quantity, 10),
      price: parseFloat(price),
    };

    if (quantity === initialInventory?.quantity && price === initialInventory?.price) {
      setError('No changes were made.');
      return;
    }

    try {
      // If both fields are updated, send PUT request
      if (quantity !== initialInventory?.quantity && price !== initialInventory?.price) {
        await InventoryService.updateInventory(id, updatedFields);  // PUT request
      }
      // If only one field is updated, send PATCH request
      else {
        const patchOperations = [];

        if (quantity !== initialInventory?.quantity) {
          patchOperations.push({
            op: 'replace',
            path: '/quantity',
            value: updatedFields.quantity
          });
        }

        if (price !== initialInventory?.price) {
          patchOperations.push({
            op: 'replace',
            path: '/price',
            value: updatedFields.price
          });
        }

        // Only send PATCH request if there are operations
        if (patchOperations.length > 0) {
          await InventoryService.patchInventory(id, patchOperations);  // PATCH request
        }
      }

      history('/Inventory');
    } catch (error) {
      setError('Failed to update inventory.');
      console.error('Error updating inventory:', error);
    }
  };

  return (
    <div className="edit-inventory-container">
      <h1>Edit Inventory</h1>
      {loading && <p>Loading...</p>}
      {error && <div className="error-message">{error}</div>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Book</label>
          <select value={bookId} disabled>
            {books.map((book) => (
              <option key={book.id} value={book.id}>
                {book.title} by {book.author}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label>Quantity</label>
          <input
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
          />
        </div>
        <div>
          <label>Price</label>
          <input
            type="number"
            step="0.01"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </div>
        <button type="submit">Update Inventory</button>
      </form>
    </div>
  );
};

export default EditInventory;
