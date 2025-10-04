import mongoose from "mongoose";

const analyticsSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  songTitle: { type: String, required: true },
  artist: { type: String },
  genre: { type: String },
  album: { type: String },
  duration: { type: Number },
  playedAt: { type: Date, default: Date.now },
  moodDuringListening: { type: String },
  sessionId: { type: String },
});

const Analytics = mongoose.model("Analytics", analyticsSchema);

export default Analytics;