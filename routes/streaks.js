const express = require("express");
const Streak = require("../models/streaks");
const auth = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/", auth, async (req, res) => {
    const { title, icon } = req.body;

    const streak = new Streak({
        user: req.user.id,
        title,
        icon,
        type
    });

    await streak.save();
    res.json(streak);
});

router.get("/", auth, async (req, res) => {
    const streaks = await Streak.find({ user: req.user.id });
    res.json(streaks);
});

router.put("/:id/done", auth, async (req, res) => {
  const streak = await Streak.findById(req.params.id);
  const today = new Date();

  if (!streak) return res.status(404).json({ message: "Streak not found" });

  if (streak.type === "daily") {
    const yesterday = new Date(today);
    yesterday.setDate(today.getDate() - 1);

    if (streak.lastCompleted && streak.lastCompleted.toDateString() === yesterday.toDateString()) {
      streak.currentStreak += 1;
    } else if (!streak.lastCompleted || streak.lastCompleted.toDateString() !== today.toDateString()) {
      streak.currentStreak = 1;
    }

    streak.lastCompleted = today;

  } else if (streak.type === "weekly") {
    const lastWeek = streak.lastCompleted
      ? getWeekNumber(streak.lastCompleted)
      : null;
    const currentWeek = getWeekNumber(today);

    if (lastWeek === currentWeek - 1) {
      streak.currentStreak += 1;
    } else if (lastWeek !== currentWeek) {
      streak.currentStreak = 1;
    }

    streak.lastCompleted = today;

  } else if (streak.type === "monthly") {
    const lastMonth = streak.lastCompleted ? streak.lastCompleted.getMonth() : null;
    const currentMonth = today.getMonth();

    if (lastMonth === currentMonth - 1) {
      streak.currentStreak += 1;
    } else if (lastMonth !== currentMonth) {
      streak.currentStreak = 1;
    }

    streak.lastCompleted = today;
  }

  await streak.save();
  res.json(streak);
});

// Helper: get week number in the year
function getWeekNumber(d) {
  const date = new Date(d.getFullYear(), d.getMonth(), d.getDate());
  const firstJan = new Date(date.getFullYear(), 0, 1);
  const dayOfYear = ((date - firstJan + 86400000) / 86400000);
  return Math.ceil(dayOfYear / 7);
}


module.exports = router;
