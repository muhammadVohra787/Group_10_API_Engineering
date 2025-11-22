import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import InventoryService from "../services/InventoryService";
import BookService from "../services/BookService";
import "./InventoryManagement.css";

const InventoryManagement = () => {
  const [inventories, setInventories] = useState([]);
  const [toast, setToast] = useState(null);

  useEffect(() => {
    const fetchInventories = async () => {
      try {
        const data = await InventoryService.getAllInventories();
        const inventoriesWithBooks = await Promise.all(
          data.map(async (inventory) => {
            const book = await BookService.getBookById(inventory.bookId);
            return { ...inventory, book };
          })
        );
        setInventories(inventoriesWithBooks);
      } catch (error) {
        console.error("Error fetching inventories:", error);
        showToast("Unable to load inventories right now.", "error");
      }
    };

    fetchInventories();
  }, []);

  const showToast = (message, type = "success") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 2400);
  };

  const handleDelete = async (id) => {
    try {
      await InventoryService.deleteInventory(id);
      setInventories(inventories.filter((inventory) => inventory.id !== id));
      showToast("Inventory entry deleted.");
    } catch (error) {
      console.error("Error deleting inventory:", error);
      showToast("Failed to delete inventory.", "error");
    }
  };

  return (
    <div className="inventory-page">
      <div className="inventory-shell">
        <header className="inventory-header">
          <div className="header-text">
            <p className="eyebrow">Inventory Ops</p>
            <h1>Inventory Management</h1>
            <p className="subhead">
              Review quantities, pricing, and book assignments with a clean
              workspace that mirrors the refreshed book experience.
            </p>
          </div>
          <div className="header-actions">
            <Link to="/add-inventory" className="btn btn-primary">
              + Add inventory
            </Link>
            <Link to="/" className="btn btn-ghost">
              Homepage
            </Link>
          </div>
        </header>

        <div className="inventory-nav">
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

        <section className="workspace-card">
          <div className="workspace-head">
            <div>
              <h2>Inventory list</h2>
              <p className="muted">
                All inventory entries are displayed with their linked book
                details.
              </p>
            </div>
          </div>

          <div className="inventory-grid">
            {inventories.map((inventory) => (
              <div key={inventory.id} className="inventory-card">
                <div className="inventory-meta">
                  <div className="badge">ID #{inventory.id}</div>
                  {inventory.book?.genre && (
                    <p className="muted">{inventory.book.genre}</p>
                  )}
                </div>
                <h3>{inventory.book?.title || "Unknown Title"}</h3>
                <p className="muted">
                  by {inventory.book?.author || "Unknown author"}
                </p>

                <div className="inventory-stats">
                  <div className="stat">
                    <span className="label">
                      Quantity: {inventory.quantity}
                    </span>
                  </div>
                  <div className="stat">
                    <span className="label">
                      Price: $
                      {inventory.price?.toFixed
                        ? inventory.price.toFixed(2)
                        : inventory.price}
                    </span>
                  </div>
                </div>

                <div className="inventory-actions">
                  <Link
                    to={`/edit-inventory/${inventory.id}`}
                    className="btn btn-ghost"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => handleDelete(inventory.id)}
                    className="btn btn-danger"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>

          {inventories.length === 0 && (
            <div className="empty-state">
              <div>
                <p className="eyebrow">No inventory yet</p>
                <h3>Add your first inventory item</h3>
                <p className="muted">
                  Start tracking quantities and pricing by adding a book to
                  inventory.
                </p>
              </div>
              <Link to="/add-inventory" className="btn btn-primary">
                Add inventory
              </Link>
            </div>
          )}
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

export default InventoryManagement;
