const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user");

const router = express.Router();

router.post("/signup", async (req, res) => {
    console.log("entered here")
  try {
    const { username, email, password } = req.body;

    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: "Username already exists" });
    }
    const hashedPwd = await bcrypt.hash(password, 10);

    const user = new User({ username, email, password: hashedPwd });

    await user.save();
    res.status(201).json({ message: "User signed up" });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }
    const validPwd = await bcrypt.compare(password, user.password);
    if (!validPwd) {
      return res.status(400).json({ message: "Invalid Password" });
    }
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });
    res.status(200).json({ token, message: "User logged in" });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
