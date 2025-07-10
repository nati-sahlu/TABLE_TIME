// src/pages/RegisterPage.jsx
import React from "react";
import { PageNav } from "../components/PageNav";
import { useNavigate } from "react-router-dom";

export function RegisterPage() {
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    const form = e.target;

    const payload = {
      name: form.name.value,
      email: form.email.value,
      password: form.password.value,
    };

    try {
      const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/user/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (res.ok) {
        alert("✅ Registration successful!");
        navigate("/login");
      } else {
        alert("❌ Registration failed: " + (data.message || "Try again"));
      }
    } catch (err) {
      alert("❌ Server error");
      console.error(err);
    }
  }

  return (
    <div className="auth-page">
      <PageNav />
      <div className="auth-form">
        <h2>Register at TableTime</h2>
        <form onSubmit={handleSubmit}>
          <label>Full Name:</label>
          <input name="name" type="text" required />

          <label>Email:</label>
          <input name="email" type="email" required />

          <label>Password:</label>
          <input name="password" type="password" required />

          <button type="submit">Register</button>
        </form>
        <p style={{ marginTop: "1rem", color: "black" }}>
          Already have an account?{" "}
          <a href="/login" style={{ color: "blue", textDecoration: "underline" }}>
            Login
          </a>
        </p>
      </div>
    </div>
  );
}
