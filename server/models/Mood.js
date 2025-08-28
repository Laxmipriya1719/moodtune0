import mongoose from "mongoose";

const moodSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  mood: { type: String, required: true },
  confidence: { type: Number, required: true },
  type: { type: String }, // e.g. happy, sad, energetic
  createdAt: { type: Date, default: Date.now },
});

// module.exports = mongoose.model("Mood", moodSchema);
const Mood = mongoose.model("Mood", moodSchema);

export default Mood;
