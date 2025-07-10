import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export function RestaurantsPage({ isLoggedIn, handlePlaceOrder, userId }) {
  const [selectedRestaurant, setSelectedRestaurant] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const isMobile = window.innerWidth <= 768;
  const [showMenuMobile, setShowMenuMobile] = useState(false);

  useEffect(() => {
    async function fetchRestaurants() {
      try {
        const response = await fetch("http://localhost:4000/api/restaurants");
        const data = await response.json();
        setRestaurants(data);
      } catch (error) {
        console.error("Failed to fetch restaurants:", error);
        toast.error("Failed to load restaurants. Please try again later.");
      } finally {
        setLoading(false);
      }
    }

    fetchRestaurants();
  }, []);

  const filteredRestaurants = restaurants.filter((rest) => {
    const name = rest.name || "";
    const location = rest.location || "";
    return (
      name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      location.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  return (
    <div className={`restaurant-page ${showMenuMobile ? "show-menu" : ""}`}>
      <div className="restaurant-list">
        <h2>Restaurants</h2>
        <input
          type="text"
          placeholder="Search by name or location..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-bar"
        />

        {loading ? (
          <p>Loading restaurants...</p>
        ) : filteredRestaurants.length > 0 ? (
          filteredRestaurants.map((rest) => (
            <div
              key={rest.id}
              className={`restaurant-card ${
                selectedRestaurant?.id === rest.id ? "selected" : ""
              }`}
              onClick={async () => {
                try {
                  const res = await fetch(
                    `http://localhost:4000/api/restaurants/${rest.id}/menu`
                  );
                  const menu = await res.json();
                  const formattedMenu = menu.map((item) => ({
                    ...item,
                    id: item.id || item.menu_item_id,
                  }));
                  setSelectedRestaurant({ ...rest, menu: formattedMenu });
                  if (isMobile) setShowMenuMobile(true);
                } catch (err) {
                  console.error("Failed to load menu", err);
                  toast.error("Menu load failed.");
                }
              }}
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
            {selectedRestaurant && isMobile && showMenuMobile && (
              <button
                className="back-button"
                onClick={() => setShowMenuMobile(false)}
              >
                ← Back to Restaurants
              </button>
            )}

            <h2>{selectedRestaurant.name} - Menu</h2>
            <div className="menu-grid">
              {selectedRestaurant.menu && selectedRestaurant.menu.length > 0 ? (
                selectedRestaurant.menu.map((item, index) => (
                  <div key={index} className="menu-cards">
                    <img
                      src={item.image || item.photo_url}
                      alt={item.name}
                      className="menu-images"
                    />
                    <h4>{item.name}</h4>
                    <p>
                      <strong>Price:</strong> {item.price} ETB
                    </p>

                    <button
                      className="order-button"
                      onClick={async () => {
                        if (!isLoggedIn) {
                          toast.warn("Please log in to place an order.");
                          navigate("/login");
                          return;
                        }

                        try {
                          const balanceRes = await fetch(
                            `http://localhost:4000/api/balance/${userId}`
                          );
                          const balanceData = await balanceRes.json();

                          if (!balanceRes.ok) {
                            toast.error("Failed to fetch balance.");
                            return;
                          }

                          if (balanceData.balance < item.price) {
                            toast.error("Insufficient balance to place this order.");
                            return;
                          }
                          console.log("Sending order:", {
                            user_id: userId,
                            menu_item_id: item.id,
                          });

                          const res = await fetch(
                            "http://localhost:4000/api/orders",
                            {
                              method: "POST",
                              headers: {
                                "Content-Type": "application/json",
                              },
                              body: JSON.stringify({
                                user_id: userId,
                                menu_item_id: item.id,
                              }),
                            }
                          );

                          const data = await res.json();
                          if (res.ok && data.status === "success") {
                            toast.success("Order placed!");
                            handlePlaceOrder({
                              id: data.order_id,
                              restaurant: selectedRestaurant.name,
                              items: [item.name],
                              status: "pending",
                            });
                          } else {
                            toast.error("Failed to place order.");
                          }
                        } catch (err) {
                          console.error("Error placing order:", err);
                          toast.error("Order failed. Try again.");
                        }
                      }}
                    >
                      Order
                    </button>
                  </div>
                ))
              ) : (
                <p>No menu items available for this restaurant.</p>
              )}
            </div>
          </>
        ) : (
          <p>Click a restaurant to view its menu</p>
        )}
      </div>
    </div>
  );
}
