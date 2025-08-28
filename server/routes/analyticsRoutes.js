import express from "express";
import Analytics from "../models/Analytics.js";

const router = express.Router();

// CREATE analytics entry
router.post("/", async (req, res) => {
  try {
    const analytics = new Analytics(req.body);
    await analytics.save();
    res.status(201).json(analytics);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// READ all analytics of a user
router.get("/:userId", async (req, res) => {
  const data = await Analytics.find({ userId: req.params.userId });
  res.json(data);
});

// DELETE analytics entry
router.delete("/:id", async (req, res) => {
  await Analytics.findByIdAndDelete(req.params.id);
  res.json({ message: "Analytics entry deleted" });
});

export default router;
