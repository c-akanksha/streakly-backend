const mongoose = require("mongoose");

const streakSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    title: {
      type: String,
      required: true,
    },
    icon: {
      type: String,
      requried: true,
    },
    type: {
      type: String,
      enum: ['daily', 'weekly', 'monthly'],
      default: "daily",
    },
    currentStreak: {
      type: Number,
      default: 0,
    },
    lastCompleted: {
      type: Date,
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Streak", streakSchema);
