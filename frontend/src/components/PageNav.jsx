import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { BalancePopup } from "./BalancePopup";

export function PageNav({ isLoggedIn, setIsLoggedIn, userRole, userId }) {
  const [isPopupVisible, setPopupVisible] = useState(false);

  const togglePopup = () => setPopupVisible(!isPopupVisible);

  function handleLogout() {
    setIsLoggedIn(false);
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

        {isLoggedIn && userRole === "user" && (
          <>
            <li><NavLink to="/restaurants">Restaurants</NavLink></li>
            <li><NavLink to="/orders">My Orders</NavLink></li>
            <li><NavLink to="/contact">Contact</NavLink></li>
             <li><p onClick={togglePopup} className="balance-button">Balance</p></li>
            <li>
              <button onClick={handleLogout} className="login-register-button">Logout</button>
            </li>
          </>
        )}

        {isLoggedIn && userRole === "owner" && (
          <>
            <li><NavLink to="/restaurant-orders">Orders In</NavLink></li>
            <li><NavLink to="/restaurant-menu">Menu</NavLink></li>
            <li><NavLink to="/contact">Contact</NavLink></li>
            <li><p onClick={togglePopup} className="balance-button">Balance</p></li>
            <li>
              <button onClick={handleLogout} className="login-register-button">Logout</button>
            </li>
          </>
        )}
      </ul>

      {isPopupVisible && <BalancePopup userId={userId} userRole={userRole}   onClose={togglePopup} />}
    </nav>
  );
}
