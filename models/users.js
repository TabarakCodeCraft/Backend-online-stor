const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const client = require("../DataBase");

async function UserLogin(req, res) {
  let { username, password } = req.body;

  try {
    const result = await client.query(
      `SELECT * FROM users WHERE username = $1`,
      [username]
    );

    if (result.rows.length === 0)
      res.send({ success: false, msg: "User not found" });
    else {
      let user = result.rows[0];
      const match = await bcrypt.compare(password, user.password);
      if (match) {
        var token = jwt.sign(user, "user");
        res.send({ success: true, token, user });
      } else res.send({ success: false, msg: "Wrong password!" });
    }
  } catch (error) {
    console.error("Error in userLogin:", error);
    res.status(500).send({ success: false, msg: "Internal Server Error" });
  }
}

async function UserRegister(req, res) {
  let { name, phone, username, password } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const result = await client.query(
      `INSERT INTO users (name, phone, username, password)
       VALUES ($1, $2, $3, $4) RETURNING *`,
      [name, phone, username, hashedPassword]
    );

    res.send(result.rows);
  } catch (error) {
    console.error("Error in AdminRegister:", error);
    res.status(500).send({ success: false, msg: "Internal Server Error" });
  }
}

module.exports = {
  UserLogin,
  UserRegister,
};
