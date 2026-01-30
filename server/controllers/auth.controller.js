const pool = require("../config/db");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.register = async (req, res) => {
  const { name, email, password, role } = req.body;

  const hash = await bcrypt.hash(password, 10);

  await pool.execute(
    "INSERT INTO users (name, email, password_hash, role) VALUES (?,?,?,?)",
    [name, email, hash, role]
  );

  res.json({ message: "User registered. Await verification." });
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  const [[user]] = await pool.execute(
    "SELECT * FROM users WHERE email = ?",
    [email]
  );

  if (!user) return res.status(404).json({ message: "User not found" });

  const match = await bcrypt.compare(password, user.password_hash);
  if (!match) return res.status(401).json({ message: "Invalid credentials" });

  const token = jwt.sign(
    { id: user.id, role: user.role, group_id: user.group_id },
    process.env.JWT_SECRET,
    { expiresIn: "1d" }
  );

  res.json({ token, role: user.role });
};
