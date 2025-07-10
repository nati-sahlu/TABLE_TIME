import React from "react";
import { useNavigate } from "react-router-dom";
import { PageNav } from "../components/PageNav";
export function HomePage({ isLoggedIn, userRole, setIsLoggedIn }) {
  const navigate = useNavigate();

  return (
    <div className="home-page">
      <PageNav
        isLoggedIn={isLoggedIn}
        userRole={userRole}
        setIsLoggedIn={setIsLoggedIn}
      />

      <div className="home">
        <h1>
          Welcome To Table Time
          <br /> Foods !
        </h1>
        <div className="home-nav">
          <span onClick={() => navigate("/restaurants")}>
            Browse Restaurants
          </span>
          <span onClick={() => navigate("/login")}>Register</span>
        </div>
      </div>

      <section className="how-it-works">
        <h2>How It Works</h2>
        <div className="how-it-works-texts">
          <div>
            <h3>🔍 Discover</h3>
            <p>Find nearby restaurants by location, cuisine, or rating.</p>
          </div>
          <div>
            <h3>🛒 Order / Reserve</h3>
            <p>Order food or reserve tables online in seconds.</p>
          </div>
          <div>
            <h3>🍴 Enjoy</h3>
            <p>Get real-time updates and enjoy your meal stress-free.</p>
          </div>
        </div>
      </section>

      <section className="top-restaurants">
        <h2>⭐ Top-Rated Restaurants</h2>
        <div className="top-restaurants-container">
          <div
            className="top-restaurants-card"
            onClick={() => navigate("/restaurants")}
            style={{ cursor: "pointer" }}
          >
            <h4>Habesha Delight</h4>
            <p>Injera • Addis Ababa • 4.8⭐</p>
          </div>
          <div
            className="top-restaurants-card"
            onClick={() => navigate("/restaurants")}
            style={{ cursor: "pointer" }}
          >
            <h4>Spice Garden</h4>
            <p>Indian • Bole • 4.6⭐</p>
          </div>
          <div
            className="top-restaurants-card"
            onClick={() => navigate("/restaurants")}
            style={{ cursor: "pointer" }}
          >
            <h4>La Piazza</h4>
            <p>Italian • Sarbet • 4.7⭐</p>
          </div>
        </div>
      </section>

      <section className="delivery-and-pricing">
        <h2>Delivery and Pricing</h2>
        <div className="delivery-container">
          <p>
            Once we have your order, we'll contact the restaurant and send a
            driver. We aim to deliver in an hour or less but please be patient
            if you order during peak hours. <br />
            Each order can contain up to eight items so ordering with friends or
            colleagues is encouraged! If you'd like to order more than eight
            items, you can place additional orders. Deliveries are priced
            depending on your distance from the restaurant. Once you've logged
            in and saved your location, you'll be able to see which restaurants
            you can order from or click on "See restaurants near you" above.
          </p>
          <div className="pricing">
            <ul>
              <li>0-4km ➡️ 100 ETB</li>
            </ul>
            <ul>
              <li>5-9km ➡️ 150 ETB</li>
            </ul>
            <ul>
              <li>10-14km ➡️ 200 ETB</li>
            </ul>
            <ul>
              <li>15-20km ➡️ 250 ETB</li>
            </ul>
          </div>
        </div>
      </section>

      <footer className="footer">
        <p>
          &copy; {new Date().getFullYear()} TableTime Foods. All rights
          reserved.
        </p>
      </footer>
    </div>
  );
}
