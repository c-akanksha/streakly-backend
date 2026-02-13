const mongoose = require("mongoose");
const express = require("express");

const router = express.Router();

let isDbReady = false;

mongoose.connection.on("connected", () => {
  console.log("MongoDB connected");
  isDbReady = true;
});

mongoose.connection.on("disconnected", () => {
  isDbReady = false;
});

// health route
router.get("/health", (req, res) => {
  if (!isDbReady) {
    return res.status(503).json({
      status: "starting",
      message: "Server is waking up...",
    });
  }

  res.status(200).json({
    status: "ok",
    uptime: process.uptime(),
    timestamp: new Date(),
  });
});

module.exports = router;
