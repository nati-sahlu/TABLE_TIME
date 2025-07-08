import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
const tempRestaurants = [
  {
    id: 1,
    name: "Habesha Delight",
    location: "Addis Ababa",
    menu: [
      {
        name: "Injera Firfir",
        image:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR8e2qMlbOaEIp-A3JHihF1KCUrSs2UDho1QQ&s",
      },
      {
        name: "Doro Wat",
        image:
          "https://images.unsplash.com/photo-1586190848861-99aa4a171e90?&w=400",
      },
      {
        name: "Kitfo",
        image:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSXTOrkZiWpdZ72SVh87eQSkXctDEzrZRSC_g&s",
      },
    ],
  },
  {
    id: 2,
    name: "Spice Garden",
    location: "Bole",
    menu: [
      {
        name: "Chicken Biryani",
        image:
          "https://images.unsplash.com/photo-1600891964579-6d93197a153a?&w=400",
      },
      {
        name: "Paneer Butter Masala",
        image:
          "https://images.unsplash.com/photo-1601004890684-d8cbf643f5f2?&w=400",
      },
      {
        name: "Garlic Naan",
        image:
          "https://images.unsplash.com/photo-1627308595229-7830a5c91ffe?&w=400",
      },
    ],
  },
  {
    id: 3,
    name: "La Piazza",
    location: "Sarbet",
    menu: [
      {
        name: "Margherita Pizza",
        image:
          "https://images.unsplash.com/photo-1548365328-88ee327c37a3?&w=400",
      },
      {
        name: "Pasta Carbonara",
        image:
          "https://images.unsplash.com/photo-1603052875762-41efb6fa5a65?&w=400",
      },
      {
        name: "Bruschetta",
        image:
          "https://images.unsplash.com/photo-1559056199-641f1b3c2bb3?&w=400",
      },
    ],
  },
  {
    id: 4,
    name: "Sushi Express",
    location: "CMC",
    menu: [
      {
        name: "Salmon Roll",
        image:
          "https://images.unsplash.com/photo-1562158070-620ed3ee2dac?&w=400",
      },
      {
        name: "Tuna Sashimi",
        image:
          "https://images.unsplash.com/photo-1562158070-620ed3ee2dac?&w=400",
      },
      {
        name: "Avocado Maki",
        image:
          "https://images.unsplash.com/photo-1553621042-f6e147245754?&w=400",
      },
    ],
  },
  {
    id: 5,
    name: "Burger Town",
    location: "Mexico",
    menu: [
      {
        name: "Classic Burger",
        image:
          "https://images.unsplash.com/photo-1550547660-d9450f859349?&w=400",
      },
      {
        name: "Double Cheese",
        image:
          "https://images.unsplash.com/photo-1550547660-d9450f859349?&w=400",
      },
      {
        name: "Chicken Wings",
        image:
          "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?&w=400",
      },
    ],
  },
  {
    id: 6,
    name: "Vegan Vibes",
    location: "Bole Atlas",
    menu: [
      {
        name: "Tofu Bowl",
        image:
          "https://images.unsplash.com/photo-1504674900247-0877df9cc836?&w=400",
      },
      {
        name: "Avocado Salad",
        image:
          "https://images.unsplash.com/photo-1504754524776-8f4f37790ca0?&w=400",
      },
      {
        name: "Vegan Pasta",
        image:
          "https://images.unsplash.com/photo-1523986371872-9d3ba2e2f5b3?&w=400",
      },
    ],
  },
];
const fallbackMenu = [
  { name: "Placeholder Dish", image: "https://via.placeholder.com/150" },
];

export function RestaurantsPage({ isLoggedIn, handlePlaceOrder }) {
  const [selectedRestaurant, setSelectedRestaurant] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [restaurants, setRestaurants] = useState(tempRestaurants);
  //const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  
 /*useEffect(() => {
  async function fetchRestaurants() {
    try {
      const response = await fetch(
        "https://table-time-uwi8.onrender.com/api/restaurants"
      );

      const text = await response.text(); // Read response as plain text first
      console.log("RAW RESPONSE TEXT:\n", text);

      const data = JSON.parse(text); // Try parsing manually
      setRestaurants(data);
    } catch (error) {
      console.error("🔥 Failed to fetch restaurants:", error);
    } finally {
      setLoading(false);
    }
  }

  fetchRestaurants();
}, []);

*/
  const filteredRestaurants = restaurants.filter(
    (rest) =>
      rest.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      rest.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <div className="restaurant-page">
        <div className="restaurant-list">
          <h2>Restaurants</h2>
          <input
            type="text"
            placeholder="Search by name or location..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-bar"
          />

          {filteredRestaurants.length > 0 ? (
            filteredRestaurants.map((rest) => (
              <div
                key={rest.id}
                className={`restaurant-card ${
                  selectedRestaurant?.id === rest.id ? "selected" : ""
                }`}
                onClick={() => setSelectedRestaurant(rest)}
              >
                <h3>{rest.name}</h3>
                <p>{rest.location}</p>
              </div>
            ))
          ) : (
            <p>No matching restaurants found.</p>
          )}
        </div>

        <div className="restaurant-menu">
          {selectedRestaurant ? (
            <>
              <h2>{selectedRestaurant.name} - Menu</h2>
              <div className="menu-grid">
                {selectedRestaurant.menu.map((item, index) => (
                  <div key={index} className="menu-cards">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="menu-images"
                    />
                    <h4>{item.name}</h4>
                    <button
                      className="order-button"
                      onClick={() => {
                        if (!isLoggedIn) {
                          alert("Please log in to place an order.");
                          navigate("/login");
                          return;
                        }

                        handlePlaceOrder({
                          id: Date.now(),
                          restaurant: selectedRestaurant.name,
                          items: [item.name],
                          status: "pending",
                        });
                      }}
                    >
                      Order
                    </button>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <p>Click a restaurant to view its menu</p>
          )}
        </div>
      </div>
    </div>
  );
}
