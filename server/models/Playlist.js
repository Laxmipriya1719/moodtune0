// const mongoose = require("mongoose");

// module.exports = mongoose.model("Playlist", playlistSchema);
import mongoose from "mongoose";

const songSchema = new mongoose.Schema({
  title: String,
  artist: String,
  moodTags: [String],
  genre: String,
  tempo: String,
});
const playlistSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    name: { type: String, required: true },
    songs: [songSchema],
  },
  { timestamps: true }
);

const Playlist = mongoose.model("Playlist", playlistSchema);

export default Playlist;
