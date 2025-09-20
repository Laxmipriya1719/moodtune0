import express from "express";
import Analytics from "../models/Analytics.js";
import SpotifyWebApi from "spotify-web-api-node";

const router = express.Router();

// // CREATE analytics entry
// router.post("/", async (req, res) => {
//   try {
//     const analytics = new Analytics(req.body);
//     await analytics.save();
//     res.status(201).json(analytics);
//   } catch (err) {
//     res.status(400).json({ error: err.message });
//   }
// });

// // READ all analytics of a user
// router.get("/:userId", async (req, res) => {
//   const data = await Analytics.find({ userId: req.params.userId });
//   res.json(data);
// });

// // DELETE analytics entry
// router.delete("/:id", async (req, res) => {
//   await Analytics.findByIdAndDelete(req.params.id);
//   res.json({ message: "Analytics entry deleted" });
// });

// Setup Spotify API client
const spotifyApi = new SpotifyWebApi({
  clientId: process.env.SPOTIFY_CLIENT_ID,
  clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
  redirectUri: process.env.SPOTIFY_REDIRECT_URI,
});

// Middleware to attach token
function setAccessToken(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ error: "No token provided" });

  const token = authHeader.split(" ")[1];
  spotifyApi.setAccessToken(token);
  next();
}

// ✅ Get user profile
router.get("/me", setAccessToken, async (req, res) => {
  try {
    const me = await spotifyApi.getMe();
    res.json(me.body);
  } catch (err) {
    console.error("Error fetching profile:", err);
    res.status(500).json({ error: "Failed to fetch profile" });
  }
});

// ✅ Top Artists
router.get("/top-artists", setAccessToken, async (req, res) => {
  try {
    const artists = await spotifyApi.getMyTopArtists({
      limit: 10,
      time_range: "medium_term",
    });
    res.json(artists.body.items);
  } catch (err) {
    console.error("Error fetching top artists:", err);
    res.status(500).json({ error: "Failed to fetch top artists" });
  }
});

// ✅ Top Tracks
router.get("/top-tracks", setAccessToken, async (req, res) => {
  try {
    const tracks = await spotifyApi.getMyTopTracks({
      limit: 10,
      time_range: "medium_term",
    });
    res.json(tracks.body.items);
  } catch (err) {
    console.error("Error fetching top tracks:", err);
    res.status(500).json({ error: "Failed to fetch top tracks" });
  }
});

// ✅ Recently Played
router.get("/recently-played", setAccessToken, async (req, res) => {
  try {
    const history = await spotifyApi.getMyRecentlyPlayedTracks({ limit: 20 });
    res.json(history.body.items);
  } catch (err) {
    console.error("Error fetching recently played:", err);
    res.status(500).json({ error: "Failed to fetch history" });
  }
});

export default router;
