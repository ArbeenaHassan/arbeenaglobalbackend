const express = require("express");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(express.json());
app.use(cors());

// MongoDB connection
mongoose.connect("mongodb://localhost:27017/userAuthDB", {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log("Connected to MongoDB"))
.catch((err) => console.error("MongoDB connection error:", err));

// User Schema
const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true }  // Store password as cipher text
});

const User = mongoose.model("User", userSchema);

// Register route
app.post("/register", async (req, res) => {
    try {
        const { username, password } = req.body;

        // Check if user already exists
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.status(400).json({ message: "Username already exists" });
        }

        // Encrypt password using JWT sign (cipher text)
        const cipherPassword = jwt.sign({ password }, process.env.JWT_SECRET);

        const newUser = new User({ username, password: cipherPassword });
        await newUser.save();

        res.status(201).json({ message: "User registered successfully" });
    } catch (error) {
        console.error("Error registering user:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});

// Login route
app.post("/login", async (req, res) => {
    try {
        const { username, password } = req.body;

        // Check if user exists
        const user = await User.findOne({ username });
        if (!user) {
            return res.json({ success: false });
        }

        // Decrypt stored password using JWT verify
        try {
            const decrypted = jwt.verify(user.password, process.env.JWT_SECRET);
            if (password !== decrypted.password) {
                return res.json({ success: false });
            }
            return res.json({ success: true });
        } catch (err) {
            return res.status(400).json({ message: "Invalid credentials" });
        }
    } catch (error) {
        console.error("Error during login:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});

// Start the server
app.listen(3000, () => {
    console.log("Server running on port 3000");
});
