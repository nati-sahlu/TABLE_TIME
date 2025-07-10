// User Orders Page
import React, { useState, useEffect } from "react";

export function OrdersPage({ userId }) {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    async function fetchOrders() {
      try {
        const response = await fetch(
          `http://localhost:4000/api/orders/${userId}`
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
  }, [userId]);

  return (
    <div className="orders-page">
      <h2>Your Orders</h2>
      {orders.length === 0 ? (
        <p>No orders yet.</p>
      ) : (
        <ul className="orders-list">
          {orders.map((order) => (
            <li key={order.order_id} className="order-card">
              <h3>Restaurant: {order.restaurant_name}</h3>
              <p>Items: {order.menu_name}</p>
              <p
                style={{
                  color: order.status === "pending" ? "orange" : "green",
                  fontWeight: "bold",
                }}
              >
                Status: {order.status}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
