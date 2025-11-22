import React from "react";
import { Link } from "react-router-dom";
import "./HomePage.css";

const tabs = [
  {
    title: "Book Management",
    description: "Add, edit, and organize every title in your catalog.",
    to: "/books",
  },
  {
    title: "Inventory Management",
    description: "Monitor quantities, restock levels, and fulfillment.",
    to: "/inventory",
  },
  {
    title: "Book Details",
    description: "Capture rich metadata like genre, language, and format.",
    to: "/book-details",
  },
];

const highlights = [
  { label: "Active Titles", value: "240+" },
  { label: "In Stock", value: "5.2k" },
  { label: "Vendors", value: "18" },
];

const HomePage = () => {
  return (
    <div className="home-shell">
      <header className="hero">
        <div className="hero__content">
          <p className="eyebrow">Book Inventory Suite</p>
          <h1>
            Manage your library
            <span className="accent"> effortlessly</span>
          </h1>
          <p className="lede">
            A streamlined console to keep books, inventory, and detailed
            metadata perfectly in sync. Stay organized with a modern, dark-blue
            accented workspace.
          </p>
          <div className="hero__actions">
            <Link to="/books" className="button primary">
              Go to Book Management
            </Link>
            <Link to="/inventory" className="button ghost">
              View Inventory
            </Link>
          </div>
          <div className="hero__highlights">
            {highlights.map((item) => (
              <div key={item.label} className="highlight">
                <div className="highlight__value">{item.value}</div>
                <div className="highlight__label">{item.label}</div>
              </div>
            ))}
          </div>
        </div>
        <div className="hero__panel">
          <div className="panel-card">
            <p className="panel-title">Quick shortcuts</p>
            <ul>
              <li>✔️ Register new arrivals</li>
              <li>✔️ Track stock variations</li>
              <li>✔️ Attach cover art & metadata</li>
            </ul>
          </div>
        </div>
      </header>

      <section className="tabs-section">
        <div className="tabs-header">
          <h2>Workspaces</h2>
          <p>Choose a tab to jump into the area you want to manage.</p>
        </div>
        <div className="tabs-grid">
          {tabs.map((tab) => (
            <Link key={tab.title} to={tab.to} className="tab-card">
              <div className="tab-card__body">
                <h3>{tab.title}</h3>
                <p>{tab.description}</p>
              </div>
              <div className="tab-card__cta">Open →</div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
};

export default HomePage;
