import React from "react";
import { PageNav } from "../components/PageNav";
export function HomePage() {
  return (
    <div className="home-page">

      <div>
        <PageNav />
      </div>

      <div className="home">
        <h1>
          Welcome To Table Time
          <br /> Foods !
        </h1>
       
        <div className="home-nav">
          <span>Browse Restaurants</span>
          <span>Register</span>
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
            <h3>🍴 Eat & Enjoy</h3>
            <p>Get real-time updates and enjoy your meal stress-free.</p>
          </div>
        </div>
      </section>
      
       
    </div>
  );
}
