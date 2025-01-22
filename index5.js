const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MongoDB Connection
mongoose.connect("mongodb://localhost:27017/usernameDB", { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Define a Schema and Model for users
const userSchema = new mongoose.Schema({
  username: String,
});
const User = mongoose.model("User", userSchema);

// API to check if username exists
app.post("/check-username", async (req, res) => {
  const { username } = req.body;

  try {
    const user = await User.findOne({ username });
    if (user) {
      return res.json({ match: true });
    } else {
      return res.json({ match: false });
    }
  } catch (error) {
    console.error("Error checking username:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Server
app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});
