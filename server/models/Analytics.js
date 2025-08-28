import mongoose from "mongoose";

const analyticsSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  songTitle: { type: String, required: true },
  playedAt: { type: Date, default: Date.now },
  duration: { type: Number }, // in seconds
  moodDuringListening: { type: String },
});

const Analytics = mongoose.model("Analytics", analyticsSchema);

export default Analytics;
