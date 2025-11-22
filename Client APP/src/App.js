import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import BooksManagement from "./components/BooksManagement";
import InventoryManagement from "./components/InventoryManagement";
import AddInventory from "./components/AddInventory";
import EditInventory from "./components/EditInventory";
import AddBook from "./components/AddBook";
import EditBook from "./components/EditBook";
// import ProtectedRoute from './components/ProtectedRoute';  // Import the ProtectedRoute component

// 👉 Import Book Details component
import BookDetailsComponent from "./components/BookDetailsComponent";
import HomePage from "./components/HomePage";

const App = () => {
  return (
    <Router>
      <Routes>
        {/* <Route path="/" element={<BooksManagement />} /> */}
        <Route path="/" element={<HomePage />} />
        <Route path="/books" element={<BooksManagement />} />
        <Route path="/inventory" element={<InventoryManagement />} />
        <Route path="/add-inventory" element={<AddInventory />} />
        <Route path="/edit-inventory/:id" element={<EditInventory />} />
        <Route path="/add-book" element={<AddBook />} />
        <Route path="/edit-book/:id" element={<EditBook />} />
        {/* default Book Details page */}
        <Route path="/book-details" element={<BookDetailsComponent />} />
        {/* Book Details prefilled for a specific book */}
        <Route
          path="/book-details/:bookId"
          element={<BookDetailsComponent />}
        />
      </Routes>
    </Router>
  );
};

export default App;
