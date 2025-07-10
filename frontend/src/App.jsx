import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import { HomePage } from "./pages/HomePage";
import { AboutPage } from "./pages/AboutPage";
import { ContactPage } from "./pages/ContactPage";
import { LoginPage } from "./pages/LoginPage";
import { RestaurantsPage } from "./pages/RestaurantsPage";
import { OrdersPage } from "./pages/OrdersPage";
import { PageNav } from "./components/PageNav";
import { RestaurantOrdersPage } from "./pages/RestaurantOrdersPage";
import { RestaurantMenuPage } from "./pages/RestaurantMenuPage";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState("");
  const [orders, setOrders] = useState([]);
  const [loggedInUser, setLoggedInUser] = useState(null);
  function handlePlaceOrder(order) {
    setOrders((prev) => [...prev, order]);
  }
  function handleAcceptOrder(orderId) {
    setOrders((prev) =>
      prev.map((order) =>
        order.id === orderId ? { ...order, status: "delivered" } : order
      )
    );
  }

  return (
    <BrowserRouter>
      <PageNav
        isLoggedIn={isLoggedIn}
        setIsLoggedIn={setIsLoggedIn}
        userRole={userRole}
        userId={loggedInUser?.id}
      />
      <ToastContainer position="top-center" autoClose={3000} />
      <Routes>
        <Route
          path="/"
          element={
            <HomePage
              isLoggedIn={isLoggedIn}
              userRole={userRole}
              setIsLoggedIn={setIsLoggedIn}
            />
          }
        />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route
          path="/restaurants"
          element={
            <RestaurantsPage
              isLoggedIn={isLoggedIn}
              handlePlaceOrder={handlePlaceOrder}
              userId={loggedInUser?.id}
            />
          }
        />
        <Route
          path="/orders"
          element={
            isLoggedIn && userRole === "user" ? (
              <OrdersPage orders={orders} userId={loggedInUser?.id} />
            ) : (
              <LoginPage
                isLoggedIn={isLoggedIn}
                setIsLoggedIn={setIsLoggedIn}
                userRole={userRole}
                setUserRole={setUserRole}
                setLoggedInUser={setLoggedInUser}
              />
            )
          }
        />
        <Route
          path="/restaurant-orders"
          element={
            isLoggedIn && userRole === "owner" ? (
              <RestaurantOrdersPage
                orders={orders}
                onAccept={handleAcceptOrder}
                ownerId={loggedInUser?.id}
              />
            ) : (
              <LoginPage
                setIsLoggedIn={setIsLoggedIn}
                setUserRole={setUserRole}
                setLoggedInUser={setLoggedInUser}
              />
            )
          }
        />
        <Route
          path="/restaurant-menu"
          element={
            isLoggedIn && userRole === "owner" ? (
              <RestaurantMenuPage />
            ) : (
              <LoginPage
                setIsLoggedIn={setIsLoggedIn}
                setUserRole={setUserRole}
                setLoggedInUser={setLoggedInUser}
              />
            )
          }
        />
        <Route
          path="/login"
          element={
            <LoginPage
              setIsLoggedIn={setIsLoggedIn}
              setUserRole={setUserRole}
              setLoggedInUser={setLoggedInUser}
            />
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
