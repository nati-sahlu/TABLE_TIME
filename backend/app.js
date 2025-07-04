require("dotenv").config();

const express = require("express");
const cors = require("cors");

const registerRoute = require("./routes/register.route");
const loginRoute = require("./routes/login.route");

const app = express();

app.use(cors());
app.use(express.json());

// routes
app.use('/api', registerRoute);
app.use('/api', loginRoute);

const PORT= process.env.PORT;
app.listen(PORT, () => {
	console.log(` working on port ${PORT}`);
});
