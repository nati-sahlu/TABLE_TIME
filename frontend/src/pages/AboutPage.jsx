import React from "react";
import { PageNav } from "../components/PageNav";
import { FaFacebookF, FaInstagram, FaTwitter, FaLinkedin } from "react-icons/fa";

export function AboutPage() {
  return (
    <div className="about-page">
      <PageNav />

      <section className="about-content">
        <h1>About TableTime 🍽️</h1>
        <p>
          <strong>TableTime</strong> is your go-to platform for discovering,
          reserving, and ordering from top restaurants in your area. Whether
          you're craving a local delicacy or international flavor, TableTime
          connects you with the best.
        </p>
        <p>
          Our mission is simple: make dining more accessible, efficient, and
          enjoyable — both for guests and restaurant owners.
        </p>
        <p>
          From <strong>table reservations</strong> to{" "}
          <strong>real-time food orders</strong>, TableTime supports the full
          dining journey.
        </p>
      </section>

      <footer className="about-footer">
        <p>Follow us</p>
        <div className="social-icons">
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
            <FaFacebookF />
          </a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
            <FaInstagram />
          </a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
            <FaTwitter />
          </a>
          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
            <FaLinkedin />
          </a>
        </div>
      </footer>
    </div>
  );
}
