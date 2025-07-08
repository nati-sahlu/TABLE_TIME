import React from "react";

export function RestaurantOrdersPage({ orders, onAccept }) {
  return (
    <div className="restaurant-orders">
      <h2>Incoming Orders</h2>
      <ul>
        {orders.length === 0 ? (
          <p>No orders yet.</p>
        ) : (
          orders.map((order) => (
            <li key={order.id} className="order-item">
              <strong>{order.items.join(", ")}</strong> - Ordered by user
              <span style={{
                color: order.status === "pending" ? "orange" : "green",
                fontWeight: "bold",
                marginLeft: "1rem",
              }}>
                {order.status}
              </span>
              {order.status === "pending" && (
                <button
                  style={{ marginLeft: "1rem" }}
                  onClick={() => onAccept(order.id)}
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
