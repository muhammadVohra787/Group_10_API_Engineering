import React, { useEffect, useState } from 'react';
import InventoryService from '../services/InventoryService';
import { Link } from 'react-router-dom';

const InventoryList = () => {
  const [inventories, setInventories] = useState([]);

  useEffect(() => {
    const fetchInventories = async () => {
      try {
        const data = await InventoryService.getAllInventories();
        setInventories(data);
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
    <div>
      <h1>Inventory List</h1>
      <Link to="/add">Add New Inventory</Link>
      <ul>
        {inventories.map((inventory) => (
          <li key={inventory.id}>
            {inventory.name} - {inventory.quantity}
            <button onClick={() => handleDelete(inventory.id)}>Delete</button>
            <Link to={`/edit/${inventory.id}`}>Edit</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default InventoryList;
