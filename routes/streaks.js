const express = require("express");
const Streak = require("../models/streaks");
const auth = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/", auth, async (req, res) => {
    const { title, icon } = req.body;

    const streak = new Streak({
        user: req.user.id,
        title,
        icon
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
    const yesterday = new Date();
    yesterday.setDate(today.getDate() - 1);

    if (
        streak.lastCompleted &&
        streak.lastCompleted.toDateString() === yesterday.toDateString()
    ) {
        streak.currentStreak += 1;
    } else {
        streak.currentStreak = 1;
    }

    streak.lastCompleted = today;

    await streak.save();
    res.json(streak);
});

module.exports = router;
