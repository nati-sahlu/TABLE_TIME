import React, { useState } from "react";

export function RestaurantMenuPage() {
  const [menuItems, setMenuItems] = useState([]);
  const [form, setForm] = useState({
    name: "",
    image: "",
    location: "",
    restaurant: "",
  });

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleAddItem(e) {
    e.preventDefault();
    const newItem = {
      id: Date.now(),
      ...form,
    };
    setMenuItems((prev) => [...prev, newItem]);
    setForm({ name: "", image: "", location: "", restaurant: "" });
  }

  function handleDeleteItem(id) {
    setMenuItems((prev) => prev.filter((item) => item.id !== id));
  }

  return (
    <div className="menu-management" style={{ padding: "2rem" }}>
      <h2>🍽️ Manage Your Menu</h2>

      {/* Existing Menu Items */}
      {menuItems.length === 0 ? (
        <p>No menu items yet.</p>
      ) : (
        <div className="menu-grid">
          {menuItems.map((item) => (
            <div key={item.id} className="menu-card">
              <img src={item.image} alt={item.name} className="menu-image" />
              <h4>{item.name}</h4>
              <p>{item.restaurant} — {item.location}</p>
              <button
                onClick={() => handleDeleteItem(item.id)}
                className="delete-button"
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Form to Add New Item */}
      <h3 style={{ marginTop: "2rem" }}>➕ Add New Menu Item</h3>
      <form className="add-form" onSubmit={handleAddItem}>
        <input
          name="name"
          type="text"
          placeholder="Food Name"
          value={form.name}
          onChange={handleChange}
          required
        />
        <input
          name="image"
          type="url"
          placeholder="Image URL"
          value={form.image}
          onChange={handleChange}
          required
        />
        <input
          name="restaurant"
          type="text"
          placeholder="Restaurant Name"
          value={form.restaurant}
          onChange={handleChange}
          required
        />
        <input
          name="location"
          type="text"
          placeholder="Location"
          value={form.location}
          onChange={handleChange}
          required
        />
        <button type="submit" className="add-button">Add Menu Item</button>
      </form>
    </div>
  );
}
