import express from "express";
import Mood from "../models/Mood.js";

const router = express.Router();

// CREATE mood entry
router.post("/", async (req, res) => {
  try {
    const mood = new Mood(req.body);
    await mood.save();
    res.status(201).json(mood);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// READ all moods of a user
router.get("/:userId", async (req, res) => {
  const moods = await Mood.find({ userId: req.params.userId });
  res.json(moods);
});

// UPDATE mood
router.put("/:id", async (req, res) => {
  const mood = await Mood.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.json(mood);
});

// DELETE mood
router.delete("/:id", async (req, res) => {
  await Mood.findByIdAndDelete(req.params.id);
  res.json({ message: "Mood deleted" });
});

export default router;
