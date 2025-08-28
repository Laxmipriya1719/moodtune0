import express from "express";
import Playlist from "../models/Playlist.js";

const router = express.Router();

// CREATE playlist
router.post("/", async (req, res) => {
  try {
    const playlist = new Playlist(req.body);
    await playlist.save();
    res.status(201).json(playlist);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// READ all playlists of a user
router.get("/:userId", async (req, res) => {
  const playlists = await Playlist.find({ userId: req.params.userId });
  res.json(playlists);
});

// UPDATE playlist
router.put("/:id", async (req, res) => {
  const playlist = await Playlist.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.json(playlist);
});

// DELETE playlist
router.delete("/:id", async (req, res) => {
  await Playlist.findByIdAndDelete(req.params.id);
  res.json({ message: "Playlist deleted" });
});

export default router;
