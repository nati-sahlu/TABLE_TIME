import React from "react";
// tempOrders.js



export function OrdersPage({ orders }) {
  return (
    <div className="orders-page">
      <h2>Your Orders</h2>
      {orders.length === 0 ? (
        <p>No orders yet.</p>
      ) : (
        <ul className="orders-list">
          {orders.map((order) => (
            <li key={order.id} className="order-card">
              <h3>Restaurant: {order.restaurant}</h3>
              <p>Items: {order.items.join(", ")}</p>
              <p style={{
                color: order.status === "pending" ? "orange" : "green",
                fontWeight: "bold",
              }}>
                Status: {order.status}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
