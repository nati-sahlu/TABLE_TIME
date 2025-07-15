require("dotenv").config();
const path = require("path");
const express = require("express");
const app = express();

const express = require("express");
const cors = require("cors");
const registerRoute = require("./routes/register.route");
const loginRoute = require("./routes/login.route");
const restaurantRoutes = require('./routes/restaurant.route');
const menuRoutes = require('./routes/menu.route');
const orderRoutes = require('./routes/order.route');
const balanceRoutes = require('./routes/balance.route');


app.use(express.json());

// routes
app.use('/api', registerRoute);
app.use('/api', loginRoute);
app.use('/api', restaurantRoutes);
app.use('/api', menuRoutes);
app.use('/api', orderRoutes);
app.use('/api', balanceRoutes);

app.use(express.static(path.join(__dirname, "../frontend/dist")));
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/dist/index.html"));
});
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
	console.log(` working on port ${PORT}`);
});
