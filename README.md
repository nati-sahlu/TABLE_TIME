# 🍽️ TableTime

**TableTime** is a full-stack restaurant ordering platform developed by **Natan Sahlu** and **Abdulmelik Shemsedin** as part of the **ALX Software Engineering Portfolio Project**.

The platform allows users to browse restaurants, view menus, place orders, and pay using a virtual wallet. Restaurant owners can log in to manage their menus and process customer orders via a dedicated dashboard.

---

## 🚀 Features

### 👥 Role-Based Access
- Separate login for `Customers` and `Restaurant Owners`
- Conditional navigation based on role

### 🍴 Customer Features
- Browse a list of available restaurants
- View menus and add items to cart
- Place orders and simulate payment with a virtual balance

### 🧑‍🍳 Restaurant Owner Features
- Manage menu items for their restaurant
- View incoming orders from customers
- Mark orders as completed to receive virtual credit

---

## 🧱 Tech Stack

### 🌐 Frontend
- **React.js** (Functional Components)
- **React Router DOM** – Routing and page navigation
- **Vite** – Development server and build tool
- **LocalStorage** – For persisting login status and user balance

### ⚙️ Backend
- **Node.js + Express.js** – RESTful API
- **MySQL** – Hosted via Railway
- **dotenv** – Environment configuration
- **CORS + JSON middleware** – API communication support

> 🔐 **Note:** JWT authentication is planned but not yet implemented. Currently using mock login tokens.

---

## ☁️ Deployment

- **Backend + MySQL Database:** Deployed on [Railway](https://railway.app)
- **Version Control & CI/CD:** Integrated with GitHub for auto-deployment

> The frontend can be deployed separately on platforms like **Netlify** or **Vercel**.

---

## 📁 Project Structure

```

TableTime/
├── backend/
│   ├── routes/
│   ├── controllers/
│   └── server.js
└── frontend/
└── src/
├── components/
├── pages/
└── App.jsx

````

---

 🧪 Getting Started

 1. Clone the Repository


git clone https://github.com/nati-sahlu/TableTime.git
cd TABLE_TIME


2. Setup Backend

cd backend
npm install


Create a `.env` file:

env
DB_HOST=your_mysql_host
DB_USER=your_mysql_user
DB_PASSWORD=your_mysql_password
DB_NAME=your_database_name


Start the backend:


npm start


 3. Setup Frontend

bash
cd ../frontend
npm install
npm run dev




 🎓 Lessons Learned

* Built and connected a full-stack app using RESTful APIs
* Deployed backend and MySQL database to Railway
* Implemented multi-role login and state persistence
* Learned to debug deployment issues and configure environments
* Improved modular code organization and development workflow

---

## 🔮 Next Steps

* ✅ Separate frontend deployment (Vercel or Netlify)
* 🔜 Implement secure JWT-based authentication
* 🔜 Add order history and user profile views
* 🔜 Enable image uploads for restaurant profiles
* 🔜 Introduce an admin role for approving new restaurants

---

## 👨‍💻 Authors

**Abdulmelik Shemsedin**
[GitHub](https://github.com/AbdulmelikShemsedin) • [LinkedIn](https://www.linkedin.com/in/abdulmelik-shemsedin-shifa)

**Natan Sahlu**
[GitHub](https://github.com/nati-sahlu) • [LinkedIn](https://www.linkedin.com/in/natan-sahlu-9712642b1)

---

## 🧠 ALX Project Goal

This project showcases full-stack development skills such as:

* REST API design and deployment
* Frontend-backend integration
* Multi-role user flows
* Real-world debugging and deployment with Railway
* Modular, maintainable project architecture
