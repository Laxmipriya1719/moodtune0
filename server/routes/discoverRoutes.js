import express from "express";
import SpotifyWebApi from "spotify-web-api-node";

const router = express.Router();

const spotifyApi = new SpotifyWebApi({
  clientId: process.env.SPOTIFY_CLIENT_ID,
  clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
  redirectUri: process.env.SPOTIFY_REDIRECT_URI,
});

function setAccessToken(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ error: "No token provided" });

  const token = authHeader.split(" ")[1];
  spotifyApi.setAccessToken(token);
  next();
}

// ✅ Recommendations (based on seeds)
router.get("/recommendations", setAccessToken, async (req, res) => {
  try {
    const { artistId, trackId, genre } = req.query;

    const recs = await spotifyApi.getRecommendations({
      seed_artists: artistId ? [artistId] : undefined,
      seed_tracks: trackId ? [trackId] : undefined,
      seed_genres: genre ? [genre] : ["pop"], // default genre
      limit: 20,
    });

    res.json(recs.body.tracks);
  } catch (err) {
    console.error("Error fetching recommendations:", err);
    res.status(500).json({ error: "Failed to fetch recommendations" });
  }
});

export default router;
