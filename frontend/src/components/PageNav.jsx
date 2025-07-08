import React from "react";
import { NavLink } from "react-router-dom";

export function PageNav({ isLoggedIn, setIsLoggedIn, userRole }) {
  function handleLogout() {
    setIsLoggedIn(false);
    // localStorage.removeItem("token");
  }

  return (
    <nav className="nav">
      <NavLink to="/">
        <div className="logo-container">
          <img className="logo-image" src="/logo.png" />
          <p>TableTime</p>
        </div>
      </NavLink>

      <ul>
        {/* Not logged in */}
        {!isLoggedIn && (
          <>
            <li><NavLink to="/restaurants">Restaurants</NavLink></li>
            <li><NavLink to="/about">About</NavLink></li>
            <li><NavLink to="/contact">Contact</NavLink></li>
            <li>
              <NavLink to="/login">
                <button className="login-register-button">Login</button>
              </NavLink>
            </li>
          </>
        )}

        {/* Logged in as USER */}
        {isLoggedIn && userRole === "user" && (
          <>
            <li><NavLink to="/restaurants">Restaurants</NavLink></li>
            <li><NavLink to="/orders">My Orders</NavLink></li>
            <li><NavLink to="/contact">Contact</NavLink></li>
            <li>
              <button onClick={handleLogout} className="login-register-button">Logout</button>
            </li>
          </>
        )}

        {/* Logged in as RESTAURANT */}
        {isLoggedIn && userRole === "owner" && (
          <>
            <li><NavLink to="/restaurant-orders">Orders In</NavLink></li>
            <li><NavLink to="/restaurant-menu">Menu</NavLink></li>
            <li><NavLink to="/contact">Contact</NavLink></li>
            <li>
              <button onClick={handleLogout} className="login-register-button">Logout</button>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
}
