import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";

export function RestaurantMenuPage() {
  const restaurantId = localStorage.getItem("restaurantId");
  const [menuItems, setMenuItems] = useState([]);
  const [form, setForm] = useState({
    name: "",
    image: "",
    price: "",
  });

  useEffect(() => {
    async function fetchMenu() {
      try {
        const res = await fetch(
          `http://localhost:4000/api/restaurants/${restaurantId}/menu`
        );
        const data = await res.json();
        setMenuItems(data);
      } catch (err) {
        console.error("Failed to fetch menu:", err);
        toast.error("Could not load menu items.");
      }
    }

    if (restaurantId) fetchMenu();
  }, [restaurantId]);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleAddItem(e) {
    e.preventDefault();

    try {
      const res = await fetch(
        `http://localhost:4000/api/restaurants/${restaurantId}/menu`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: form.name,
            photo_url: form.image,
            price: form.price || 0,
          }),
        }
      );

      const data = await res.json();

      if (res.ok) {
        setMenuItems((prev) => [...prev, { ...form, id: Date.now() }]);
        setForm({ name: "", image: "", price: "" });
        toast.success("Menu item added successfully!");
      } else {
        toast.error("Failed to add menu item: " + data.message);
      }
    } catch (err) {
      console.error("Add item failed:", err);
      toast.error("Could not add menu item.");
    }
  }

  async function handleDeleteItem(id) {
    try {
      const res = await fetch(`http://localhost:4000/api/menu/${id}`, {
        method: "DELETE",
      });

      const data = await res.json();

      if (res.ok) {
        setMenuItems((prev) => prev.filter((item) => item.id !== id));
        toast.success("Menu item removed successfully!");
      } else {
        toast.error("Failed to delete: " + data.message);
      }
    } catch (err) {
      console.error("Delete failed:", err);
      toast.error("Could not delete menu item.");
    }
  }

  return (
    <div className="menu-management" style={{ padding: "2rem" }}>
      <h2>🍽️ Manage Your Menu</h2>

      {menuItems.length === 0 ? (
        <p>No menu items yet.</p>
      ) : (
        <div className="menu-grid">
          {menuItems.map((item) => (
            <div key={item.id} className="menu-card">
              <img
                src={item.photo_url || item.image}
                alt={item.name}
                className="menu-image"
              />
              <h4>{item.name}</h4>
              <p>💲{item.price}</p>
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
          name="price"
          type="number"
          placeholder="Price"
          value={form.price}
          onChange={handleChange}
          required
        />
        <button type="submit" className="add-button">
          Add Menu Item
        </button>
      </form>
    </div>
  );
}
