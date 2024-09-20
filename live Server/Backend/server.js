const express = require("express");
const jwt = require("jsonwebtoken");

const app = express();
const SECRET_KEY = "supersecretkey"; // Secret key for JWT

const users = {};

app.use(express.json());

app.post("/register", (req, res) => {
  const { username, password } = req.body;

  if (users[username]) {
    return res.status(400).json({ message: "User already exists!" });
  }

  users[username] = { password }; // Store the user

  return res.json({ message: "User registered successfully!" });
});

app.post("/login", (req, res) => {
  const { username, password } = req.body;

  const user = users[username];
  if (!user || user.password !== password) {
    return res.status(401).json({ message: "Invalid username or password!" });
  }


  const token = jwt.sign({ username }, SECRET_KEY, { expiresIn: "1h" });

  return res.json({ message: "Login successful!", token });
});

function verifyToken(req, res, next) {
  const token = req.headers["authorization"]; // Expect token in 'Authorization' header

  if (!token) {
    return res.status(403).json({ message: "No token provided!" });
  }

  jwt.verify(token, SECRET_KEY, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: "Failed to authenticate token!" });
    }

    req.username = decoded.username; 
    next(); 
  });
}


app.get("/audio-room", verifyToken, (req, res) => {
  res.json({ message: `Welcome to the audio room, ${req.username}!` });
});

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
