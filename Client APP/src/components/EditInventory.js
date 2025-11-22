import React, { useState, useEffect } from "react";
import InventoryService from "../services/InventoryService";
import BookService from "../services/BookService";
// import { useParams, useNavigate } from "react-router-dom";
import { useParams, useNavigate, Link } from "react-router-dom";
import "./EditInventory.css";

const EditInventory = () => {
  const { id } = useParams();
  const [bookId, setBookId] = useState("");
  const [quantity, setQuantity] = useState("");
  const [price, setPrice] = useState("");
  const [initialInventory, setInitialInventory] = useState(null);
  const [books, setBooks] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState(null);
  const history = useNavigate();

  // Fetch inventory details and book list
  useEffect(() => {
    const fetchInventory = async () => {
      try {
        const inventory = await InventoryService.getInventoryById(id);
        setBookId(inventory.bookId);
        setQuantity(inventory.quantity);
        setPrice(inventory.price);
        setInitialInventory({
          quantity: inventory.quantity,
          price: inventory.price,
        });
        setLoading(false);
      } catch (error) {
        setError("Error fetching inventory details");
        console.error("Error fetching inventory:", error);
        setLoading(false);
      }
    };

    const fetchBooks = async () => {
      try {
        const bookList = await BookService.getAllBooks();
        setBooks(bookList);
      } catch (error) {
        console.error("Error fetching books:", error);
      }
    };

    fetchInventory();
    fetchBooks();
  }, [id]);

  // Handle form submission
  const showToast = (message, type = "success") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 2200);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check which fields have been updated
    const updatedFields = {
      quantity: parseInt(quantity, 10),
      price: parseFloat(price),
    };

    if (
      quantity === initialInventory?.quantity &&
      price === initialInventory?.price
    ) {
      setError("No changes were made.");
      return;
    }

    try {
      // // If both fields are updated, send PUT request
      if (
        quantity !== initialInventory?.quantity &&
        price !== initialInventory?.price
      ) {
        //   await InventoryService.updateInventory(id, updatedFields); // PUT request
        // }
        // // If only one field is updated, send PATCH request
        // else {
        await InventoryService.updateInventory(id, updatedFields);
      } else {
        const patchOperations = [];

        if (quantity !== initialInventory?.quantity) {
          patchOperations.push({
            op: "replace",
            path: "/quantity",
            value: updatedFields.quantity,
          });
        }

        if (price !== initialInventory?.price) {
          patchOperations.push({
            op: "replace",
            path: "/price",
            value: updatedFields.price,
          });
        }

        // Only send PATCH request if there are operations
        if (patchOperations.length > 0) {
          await InventoryService.patchInventory(id, patchOperations); // PATCH request
        }
      }

      // history("/Inventory");
      showToast("Inventory updated.");
      setTimeout(() => history("/Inventory"), 600);
    } catch (error) {
      setError("Failed to update inventory.");
      console.error("Error updating inventory:", error);
      showToast("Failed to update inventory.", "error");
    }
  };

  return (
    // <div className="edit-inventory-container">
    //   <h1>Edit Inventory</h1>
    //   {loading && <p>Loading...</p>}
    //   {error && <div className="error-message">{error}</div>}
    //   <form onSubmit={handleSubmit}>
    //     <div>
    //       <label>Book</label>
    //       <select value={bookId} disabled>
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
            <h1>Edit Inventory</h1>
            <p className="subhead">
              Adjust quantities or pricing while keeping your linked book
              context visible.
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
        {/* <div>
          <label>Quantity</label>
          <input
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
          /> */}
        <div className="form-card">
          {loading && <p className="muted">Loading...</p>}
          {error && <div className="error-message">{error}</div>}

          {!loading && (
            <form onSubmit={handleSubmit} className="form-grid">
              <div className="form-group">
                <label>Book</label>
                <select value={bookId} disabled className="input-shell">
                  {books.map((book) => (
                    <option key={book.id} value={book.id}>
                      {book.title} by {book.author}
                    </option>
                  ))}
                </select>
                <p className="helper">
                  Book links stay locked to preserve inventory history.
                </p>
              </div>

              <div className="form-group">
                <label>Quantity</label>
                <input
                  type="number"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                  className="input-shell"
                />
                <p className="helper">Update how many copies are available.</p>
              </div>

              <div className="form-group">
                <label>Price</label>
                <input
                  type="number"
                  step="0.01"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  className="input-shell"
                />
                <p className="helper">Adjust the unit price for this entry.</p>
              </div>

              <div className="form-actions">
                <button type="submit" className="btn btn-primary">
                  Update Inventory
                </button>
                <Link to="/inventory" className="btn btn-ghost">
                  Cancel
                </Link>
              </div>
            </form>
          )}
        </div>
        {/* <div>
          <label>Price</label>
          <input
            type="number"
            step="0.01"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          /> */}
      </div>

      {toast && (
        <div className={`toast ${toast.type}`}>
          <span>{toast.message}</span>
        </div>
        //   <button type="submit">Update Inventory</button>
        // </form>
      )}
    </div>
  );
};

export default EditInventory;
