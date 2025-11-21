import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import InventoryService from '../services/InventoryService';
import BookService from '../services/BookService';
import './InventoryManagement.css';

const InventoryManagement = () => {
  const [inventories, setInventories] = useState([]);

  useEffect(() => {
    const fetchInventories = async () => {
      try {
        const data = await InventoryService.getAllInventories();
        // Fetch book details for each inventory
        const inventoriesWithBooks = await Promise.all(data.map(async (inventory) => {
          const book = await BookService.getBookById(inventory.bookId);
          return { ...inventory, book }; // Merge book details with inventory
        }));
        setInventories(inventoriesWithBooks);
      } catch (error) {
        console.error('Error fetching inventories:', error);
      }
    };

    fetchInventories();
  }, []);

  const handleDelete = async (id) => {
    try {
      await InventoryService.deleteInventory(id);
      setInventories(inventories.filter((inventory) => inventory.id !== id));
    } catch (error) {
      console.error('Error deleting inventory:', error);
    }
  };

  return (
    <div className="inventory-management-container">
    <nav className="navbar">
      <div className="navbar-brand">Book Inventory Management</div>
      <ul className="navbar-links">
        <li><Link to="/books">Book Management</Link></li>
        <li><Link to="/inventory">Inventory Management</Link></li>
        <li><Link to="/book-details">Book Details</Link></li> {/* 👈 NEW */}
        <li><Link to="/login">Logout</Link></li>
      </ul>
    </nav>
      <div className="content-wrapper">
        <h1>Inventory Management</h1>
        <Link to="/add-inventory" className="btn btn-add">Add New Inventory</Link>
        <ul className="inventory-list">
          {inventories.map((inventory) => (
            <li key={inventory.id} className="inventory-item">
              <span>
                {inventory.book?.title} - {inventory.book?.author} - {inventory.quantity}
              </span>
              <div className="actions">
                <button onClick={() => handleDelete(inventory.id)} className="btn btn-delete">Delete</button>
                <Link to={`/edit-inventory/${inventory.id}`} className="btn btn-edit">Edit</Link>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default InventoryManagement;
