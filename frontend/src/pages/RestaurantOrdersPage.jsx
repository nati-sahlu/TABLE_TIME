// Restaurant Owner Orders Page
import React, { useState, useEffect } from "react";

export function RestaurantOrdersPage({ ownerId }) {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    async function fetchOrders() {
      try {
        const response = await fetch(
          `http://localhost:4000/api/orders/restaurant-owner/${ownerId}`
        );
        const data = await response.json();
        if (data.status === "success") {
          setOrders(data.orders);
        }
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    }

    fetchOrders();
  }, [ownerId]);

  const handleAccept = async (orderId) => {
    try {
      const response = await fetch(
        `http://localhost:4000/api/orders/accept/${orderId}`,
        {
          method: "PUT",
        }
      );
      const data = await response.json();
      if (data.status === "success") {
        setOrders((prevOrders) =>
          prevOrders.map((order) =>
            order.order_id === orderId
              ? { ...order, status: "accepted" }
              : order
          )
        );
      }
    } catch (error) {
      console.error("Error accepting order:", error);
    }
  };

  return (
    <div className="restaurant-orders">
      <h2>Incoming Orders</h2>
      <ul>
        {orders.length === 0 ? (
          <p>No orders yet.</p>
        ) : (
          orders.map((order) => (
            <li key={order.order_id} className="order-item">
              <strong>{order.menu_name}</strong> - Ordered by user
              <span
                style={{
                  color: order.status === "pending" ? "orange" : "green",
                  fontWeight: "bold",
                  marginLeft: "1rem",
                }}
              >
                {order.status}
              </span>
              {order.status === "pending" && (
                <button
                  style={{ marginLeft: "1rem" }}
                  onClick={() => handleAccept(order.order_id)}
                >
                  Accept
                </button>
              )}
            </li>
          ))
        )}
      </ul>
    </div>
  );
}
