import React from "react";
import { NavLink } from "react-router-dom";
export function PageNav() {
  return (
    <nav className="nav">
      <NavLink to="/">
      <div className="logo-container">
        <img className="logo-image" src="public/logo.png" />
        <p>Tabletime</p>
        </div>
      </NavLink>
      <ul>
        <li>
          <NavLink to="/restaurants">Restaurants</NavLink>
        </li>
        <li>
          <NavLink to="/about">About</NavLink>
        </li>
        <li>
          <NavLink to="/contact">Contact</NavLink>
        </li>
        <li>
          <NavLink to="/login">
            <button className="login-register-button">Login</button>
          </NavLink>
        </li>
        <li>
          <NavLink to="/about">
            <button className="login-register-button">Register</button>
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}
