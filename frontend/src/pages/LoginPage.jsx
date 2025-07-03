import React, { useState } from "react";
import { PageNav } from "../components/PageNav";

export function LoginPage() {
  const [isRegistering, setIsRegistering] = useState(false);

  function toggleForm() {
    setIsRegistering((prev) => !prev);
  }
  function handleSubmit(e) {
    e.preventDefault();
    const form = e.target;

    const payload = {
      name: form.name?.value, // only used during registration
      email: form.email.value,
      password: form.password.value,
    };

    const endpoint = isRegistering
      ? "http://localhost:5000/api/register"
      : "http://localhost:5000/api/login";

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
        if (data.token) {
          localStorage.setItem("token", data.token);
          alert("Login/Register successful!");
          navigate("/restaurants"); // go to next page
        } else {
          alert("❌ Something went wrong.");
        }
      })
      .catch((err) => {
        console.error(err);
        alert("❌ Server error.");
      });
  }


  return (
    <div className="auth-page">
      <PageNav />

      <div className="auth-form">
        <h2>{isRegistering ? "Register at TableTime" : "Login to TableTime"}</h2>
        <form onSubmit={handleSubmit}>
          {isRegistering && (
            <>
              <label>Full Name:</label>
              <input type="text" placeholder="Enter your name" required />
            </>
          )}

          <label>Email:</label>
          <input type="email" placeholder="Enter your email" required />

          <label>Password:</label>
          <input type="password" placeholder="Enter your password" required />

          <button type="submit">
            {isRegistering ? "Register" : "Login"}
          </button>
        </form>

        <p style={{ marginTop: "1rem", color:"black"}}>
          {isRegistering ? "Already have an account?" : "Don't have an account?"}{" "}
          <span
            style={{ color: "blue", cursor: "pointer", textDecoration: "underline" }}
            onClick={toggleForm}
          >
            {isRegistering ? "Login" : "Register"}
          </span>
        </p>
      </div>
    </div>
  );
}
