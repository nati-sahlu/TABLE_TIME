import React, { useState } from "react";
import { PageNav } from "../components/PageNav";

export function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [status, setStatus] = useState(null); // success / error message

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      const res = await fetch("https://your-backend-domain.com/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok) {
        setStatus("✅ Message sent successfully!");
        setFormData({ name: "", email: "", message: "" });
      } else {
        setStatus(" Failed to send message.");
      }
    } catch (err) {
      console.error(err);
      setStatus(" Server error.");
    }
  }

  return (
    <div className="contact-page">
      <PageNav />

      <section className="contact-content">
        <h1>Contact Us 📬</h1>
        <p>
          We’d love to hear from you! Whether you're a customer or a restaurant
          owner.
        </p>

        <div className="contact-info">
          <p>
            <strong>Email:</strong> support@tabletime.com
          </p>
          <p>
            <strong>Phone:</strong> +251 912 345 678
          </p>
          <p>
            <strong>Address:</strong> Bole Road, Addis Ababa, Ethiopia
          </p>
        </div>

        <form className="contact-form" onSubmit={handleSubmit}>
          <label>Name</label>
          <input
            name="name"
            type="text"
            placeholder="Your Name"
            value={formData.name}
            onChange={handleChange}
            required
          />

          <label>Email</label>
          <input
            name="email"
            type="email"
            placeholder="Your Email"
            value={formData.email}
            onChange={handleChange}
            required
          />

          <label>Message</label>
          <textarea
            name="message"
            placeholder="Your message..."
            rows="3"
            value={formData.message}
            onChange={handleChange}
            required
          ></textarea>

          <button type="submit">Send Message</button>
        </form>

        {status && <p className="status-msg">{status}</p>}
      </section>
    </div>
  );
}
