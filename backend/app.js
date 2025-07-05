require("dotenv").config();

const express = require("express");
const cors = require("cors");
const registerRoute = require("./routes/register.route");
const loginRoute = require("./routes/login.route");
const restaurantRoutes = require('./routes/restaurant.route');
const menuRoutes = require('./routes/menu.route');

const app = express();

app.use(cors());
app.use(express.json());

// routes
app.use('/api', registerRoute);
app.use('/api', loginRoute);
app.use('/api/restaurants', restaurantRoutes);
app.use('/api', menuRoutes);


const PORT= process.env.PORT;
app.listen(PORT, () => {
	console.log(` working on port ${PORT}`);
});
