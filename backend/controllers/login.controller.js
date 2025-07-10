const { logIn } = require("../services/login.service");
const db = require("../config/db.config");

async function login(req, res) {
  const { email, password } = req.body;
  const role = req.params.role;


  if (!role || !["user", "owner"].includes(role)) {
    return res.status(400).json({
      status: "error",
      message: "Invalid or missing role in URL path",
    });
  }

  try {
    const result = await logIn({ email, password, role });

    if (result && result.length > 0) {
      const user = result[0];

  
      let restaurant = null;
      if (role === "owner") {
        const [restaurantRows] = await db.query(
          `SELECT id, name, location FROM restaurants WHERE owner_id = ?`,
          [user.id]
        );
        restaurant = restaurantRows[0];
      }

      res.status(200).json({
        status: "success",
        message: "login successful",
        token: "mockToken123",
        user,
        restaurant, //  Send restaurant info if owner
      });
    } else {
      res.status(401).json({ status: "failure", message: "login failed" });
    }
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
}

module.exports = { login };
