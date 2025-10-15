const express = require("express");
const mysql = require("mysql2");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(bodyParser.json());

// MySQL connection
const db = mysql.createConnection({
  host: process.env.DB_HOST || "database",
  user: process.env.DB_USER || "myuser",
  password: process.env.DB_PASSWORD || "mypassword",
  database: process.env.DB_NAME || "mydb",
  port: process.env.DB_PORT || 3306,
});


db.connect(err => {
  if (err) {
    console.error("DB connection failed:", err);
  } else {
    console.log("✅ Connected to MySQL");
  }
});

// Routes
app.get("/", (req, res) => {
  res.send("Welcome to backend");
});

// Register user
app.post("/register", (req, res) => {
  const { email, password } = req.body;
  const sql = "INSERT INTO users (email, password) VALUES (?, ?)";
  db.query(sql, [email, password], (err, result) => {
    if (err) {
        console.error("❌ Error registering user:", err);
        return res.status(500).send("Error registering user");
    }

    res.send("User registered successfully");
  });
});

// Login user
app.post("/login", (req, res) => {
  const { email, password } = req.body;
  const sql = "SELECT * FROM users WHERE email = ? AND password = ?";
  db.query(sql, [email, password], (err, result) => {
    if (err) return res.status(500).send("Error logging in");
    if (result.length > 0) res.send("Login successful");
    else res.status(401).send("Invalid credentials");
  });
});

// Start server
const PORT = 8080;
app.listen(PORT, () => console.log(`🚀 Backend running on port ${PORT}`));

