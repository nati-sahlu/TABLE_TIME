import React, { useState } from "react";
import { PageNav } from "../components/PageNav";
import { useNavigate } from "react-router-dom";

export function LoginPage({
  setIsLoggedIn,
  setUserRole,
  setLoggedInUser,
  isLoggedIn,
  userRole,
}) {
  const [isRegistering, setIsRegistering] = useState(false);
  const [role, setRole] = useState("user");
  const navigate = useNavigate();

  function toggleForm() {
    setIsRegistering((prev) => !prev);
  }

  function handleSubmit(e) {
    e.preventDefault();
    const form = e.target;

    const payload = {
      name: form.name?.value,
      email: form.email.value,
      password: form.password.value,
      role,
    };
    if (isRegistering && role === "owner") {
      payload.location = form.location.value;
    }

    const API_BASE_URL = "http://localhost:4000/api";
    const endpoint = isRegistering
      ? `${API_BASE_URL}/${role}/register`
      : `${API_BASE_URL}/${role}/login`;

    fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("RESPONSE:", data);

        if (isRegistering) {
          if (data.status === "success") {
            alert("Registered successfully!");
            setIsRegistering(false);
          } else {
            alert("Registration failed.");
          }
        } else {
          if (data.token) {
            localStorage.setItem("token", data.token);
            setIsLoggedIn(true);
            setUserRole(role);
            setLoggedInUser(data.user);
            if (role === "owner" && data.restaurant) {
              localStorage.setItem("restaurantId", data.restaurant.id);
            }
            alert("Logged in successfully!");
            navigate(role === "owner" ? "/restaurant-menu" : "/restaurants");
          } else {
            alert("Login failed.");
          }
        }
      })
      .catch((err) => {
        console.error(err);
        alert("Server error.");
      });
  }

  return (
    <div className="auth-page">
      <PageNav
        isLoggedIn={isLoggedIn}
        userRole={userRole}
        setIsLoggedIn={setIsLoggedIn}
      />

      <div className="auth-form">
        <h2>
          {isRegistering ? "Register at TableTime" : "Login to TableTime"}
        </h2>

        <div className="role-toggle">
          <button
            className={role === "user" ? "active" : ""}
            onClick={() => setRole("user")}
            type="button"
          >
            User
          </button>
          <button
            className={role === "owner" ? "active" : ""}
            onClick={() => setRole("owner")}
            type="button"
          >
            Restaurant
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          {isRegistering && (
            <>
              <label>{role === "user" ? "Full Name" : "Restaurant Name"}</label>
              <input
                name="name"
                type="text"
                placeholder={
                  role === "user" ? "Enter your name" : "Enter Restaurant Name"
                }
                required
              />

              {/*restaurant owner */}
              {role === "owner" && (
                <>
                  <label>Restaurant Location:</label>
                  <input
                    name="location"
                    type="text"
                    placeholder="Enter restaurant location"
                    required
                  />
                </>
              )}
            </>
          )}

          <label>Email:</label>
          <input
            name="email"
            type="email"
            placeholder="Enter your email"
            required
          />

          <label>Password:</label>
          <input
            name="password"
            type="password"
            placeholder="Enter your password"
            required
          />

          <button type="submit">{isRegistering ? "Register" : "Login"}</button>
        </form>

        <p className="auth-toggle">
          {isRegistering
            ? "Already have an account?"
            : "Don't have an account?"}{" "}
          <span className="toggle-link" onClick={toggleForm}>
            {isRegistering ? "Login" : "Register"}
          </span>
        </p>
      </div>
    </div>
  );
}
