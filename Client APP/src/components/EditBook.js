// import React, { useState, useEffect } from 'react';
// import BookService from '../services/BookService';
// import { useParams, useNavigate } from 'react-router-dom';
// import './EditBook.css'; // Add a separate CSS file for better styling
import React, { useState, useEffect } from "react";
import BookService from "../services/BookService";
import { Link, useParams, useNavigate } from "react-router-dom";
import "./BookForms.css";

const EditBook = () => {
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [isbn, setIsbn] = useState("");
  const [price, setPrice] = useState("");
  //const [stock, setStock] = useState('');
  const [isFullUpdate, setIsFullUpdate] = useState(true); // Toggle between PUT and PATCH
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const book = await BookService.getBookById(id);
        setTitle(book.title);
        setAuthor(book.author);
        setIsbn(book.isbn);
        setPrice(book.price);
        //setStock(book.stock);
      } catch (error) {
        console.error("Error fetching book:", error);
      }
    };

    fetchBook();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (isFullUpdate) {
        const book = {
          title,
          author,
          isbn,
          price: parseFloat(price),
        };
        await BookService.updateBook(id, book); // PUT request to update all fields
      } else {
        // Construct the JSON Patch document
        const patchData = [];
        if (title)
          patchData.push({ op: "replace", path: "/title", value: title });
        if (author)
          patchData.push({ op: "replace", path: "/author", value: author });
        if (isbn) patchData.push({ op: "replace", path: "/isbn", value: isbn });
        if (price)
          patchData.push({
            op: "replace",
            path: "/price",
            value: parseFloat(price),
          });

        await BookService.patchBook(id, patchData); // PATCH request for partial updates
      }

      // Navigate back WITH toast meta for BooksManagement
      navigate("/books", {
        state: {
          toastMessage: "Book updated.",
          toastType: "success",
        },
      });
    } catch (error) {
      console.error("Error updating book:", error);
      // optionally stay and show local error UI if you add one later
    }
  };

  return (
    //   <div className="edit-book-container">
    //     <h1>Edit Book</h1>
    //     <form className="edit-book-form" onSubmit={handleSubmit}>
    //       <div className="form-group">
    //         <label>Title</label>
    //         <input
    //           type="text"
    //           value={title}
    //           onChange={(e) => setTitle(e.target.value)}
    //         />
    //       </div>
    //       <div className="form-group">
    //         <label>Author</label>
    //         <input
    //           type="text"
    //           value={author}
    //           onChange={(e) => setAuthor(e.target.value)}
    //         />
    //       </div>
    //       <div className="form-group">
    //         <label>ISBN</label>
    //         <input
    //           type="text"
    //           value={isbn}
    //           onChange={(e) => setIsbn(e.target.value)}
    //         />
    //       </div>
    //       <div className="form-group">
    //         <label>Price</label>
    //         <input
    //           type="number"
    //           step="0.01"
    //           value={price}
    //           onChange={(e) => setPrice(e.target.value)}
    //         />
    //       </div>

    //       <div className="form-group toggle-update">
    //         <label>Full Update</label>
    //         <input
    //           type="checkbox"
    //           checked={isFullUpdate}
    //           onChange={() => setIsFullUpdate(!isFullUpdate)}
    //         />
    //         <span> Update all fields</span>
    //       </div>
    //       <button type="submit" className="btn">
    //         {isFullUpdate ? 'Update Book' : 'Update Partial'}
    //       </button>
    //     </form>
    <div className="book-form-page">
      <div className="book-form-shell">
        <header className="form-header">
          <div className="header-text">
            <p className="eyebrow">Workspace</p>
            <h1>Edit Book</h1>
            <p className="subhead">
              Refresh book details, correct typos, or adjust pricing while
              keeping the catalog consistent.
            </p>
          </div>
          <div className="header-actions">
            <Link to="/books" className="btn ghost">
              Back to Books
            </Link>
            <Link to="/add-book" className="btn subtle">
              Add Another
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
          <span className="nav-pill active">Edit Book</span>
        </nav>

        <form className="form-card" onSubmit={handleSubmit}>
          <div className="form-grid">
            <div className="form-group">
              <label>Title</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="input-shell"
                placeholder="Book title"
              />
            </div>
            <div className="form-group">
              <label>Author</label>
              <input
                type="text"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                className="input-shell"
                placeholder="Author name"
              />
            </div>
            <div className="form-group">
              <label>ISBN</label>
              <input
                type="text"
                value={isbn}
                onChange={(e) => setIsbn(e.target.value)}
                className="input-shell"
                placeholder="978-..."
              />
              <p className="helper">We recommend using the 13-digit format.</p>
            </div>
            <div className="form-group">
              <label>Price</label>
              <input
                type="number"
                step="0.01"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="input-shell"
                min="0"
              />
              <p className="helper">Adjust for sales or updated pricing.</p>
            </div>
          </div>

          <div className="form-footer">
            <label className="toggle">
              <input
                type="checkbox"
                checked={isFullUpdate}
                onChange={() => setIsFullUpdate(!isFullUpdate)}
              />
              {isFullUpdate
                ? "Update all fields"
                : "Patch only the changed fields"}
            </label>
            <div className="actions">
              <Link to="/books" className="btn subtle">
                Cancel
              </Link>
              <button type="submit" className="btn primary">
                {isFullUpdate ? "Save Changes" : "Save Patch"}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditBook;
