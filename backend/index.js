const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");

const app = express();

const PORT = 3000;
const usersFile = path.join(__dirname, 'user.json');

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("Backend is running");
});

app.post("/signup", (req, res) => {
  const { email, password, phone } = req.body;

  // basic validation
  if (!email || !password || !phone) {
    return res.status(400).json({
      success: false,
      message: "Email, password, and phone are required",
    });
  }

  try {
    // Read existing users from user.json
    let users = [];
    if (fs.existsSync(usersFile)) {
      const data = fs.readFileSync(usersFile, 'utf-8');
      users = JSON.parse(data);
    }

    // Check if user already exists
    const userExists = users.some(user => user.email === email);
    if (userExists) {
      return res.json({
        success: false,
        exists: true,
        message: "User already exists",
      });
    }

    // Create new user
    const newUser = {
      id: users.length + 1,
      email: email,
      password: password,
      phone: phone,
      createdAt: new Date().toISOString(),
    };

    // Add user to array and save to file
    users.push(newUser);
    fs.writeFileSync(usersFile, JSON.stringify(users, null, 2));

    return res.json({
      success: true,
      message: "User created successfully",
    });
  } catch (error) {
    console.error("Error during signup:", error);
    return res.status(500).json({
      success: false,
      message: "Error during signup. Please try again later.",
    });
  }
});

app.post("/login", (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  // basic validation
  if (!email || !password) {
    return res.status(400).json({
      message: "Email and password are required",
    });
  }

  // fake authentication (for now)
  if (email === "vibhorkapoor123@gmail.com" && password === "vib@123") {
    return res.json({
      success: true,
      message: "Login successful",
    });
  }

  return res.status(401).json({
    message: "Invalid credentials",
  });
});

app.listen(PORT, () => {
  console.log("Server running on port", PORT);
});