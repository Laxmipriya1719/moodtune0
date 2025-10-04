import express from "express";
import SpotifyWebApi from "spotify-web-api-node";
import dotenv from "dotenv";
import path from "path";
import querystring from "querystring";
import axios from "axios";

dotenv.config({ path: path.resolve("../.env") }); // make sure .env path is correct

const router = express.Router();

// Initialize Spotify API
const spotifyApi = new SpotifyWebApi({
  clientId: process.env.SPOTIFY_CLIENT_ID,
  clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
  redirectUri: process.env.SPOTIFY_REDIRECT_URI,
});

// Example mood-to-genre mapping
const moodGenres = {
  happy: "pop",
  sad: "acoustic",
  energetic: "workout",
  relaxed: "chill",
};

// ===== ROUTE: Spotify Login =====
router.get("/login", (req, res) => {
  const clientId = process.env.SPOTIFY_CLIENT_ID;
  const redirectUri = process.env.SPOTIFY_REDIRECT_URI; // from .env
  const scope = "user-read-private playlist-read-private";

  const authUrl = `https://accounts.spotify.com/authorize?${querystring.stringify(
    {
      client_id: clientId,
      response_type: "code",
      redirect_uri: redirectUri,
      scope,
    }
  )}`;

  console.log("Redirecting to Spotify:", authUrl);
  res.redirect(authUrl);
});

// ===== ROUTE: Spotify Callback =====
router.get("/callback", async (req, res) => {
  const code = req.query.code;
  const clientId = process.env.SPOTIFY_CLIENT_ID;
  const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;
  const redirectUri = process.env.SPOTIFY_REDIRECT_URI; // from .env
  const frontendRedirect = "http://localhost:3000/spotify/callback"; // frontend where React listens

  if (!code) return res.redirect(`${frontendRedirect}?error=missing_code`);

  try {
    const response = await axios.post(
      "https://accounts.spotify.com/api/token",
      querystring.stringify({
        grant_type: "authorization_code",
        code,
        redirect_uri: redirectUri,
      }),
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization:
            "Basic " +
            Buffer.from(clientId + ":" + clientSecret).toString("base64"),
        },
      }
    );

    const { access_token, refresh_token, expires_in } = response.data;

    // ✅ Redirect frontend with tokens
    const redirectUrl = `${frontendRedirect}?accessToken=${access_token}&refreshToken=${refresh_token}&expiresIn=${expires_in}`;
    res.redirect(redirectUrl);
  } catch (err) {
    console.error("Spotify callback error:", err.response?.data || err);
    res.redirect(`${frontendRedirect}?error=spotify_callback_failed`);
  }
});

// ===== ROUTE: Get Current User Profile =====
router.get("/me", async (req, res) => {
  try {
    spotifyApi.setAccessToken(req.headers.authorization.split(" ")[1]); // "Bearer token"

    const me = await spotifyApi.getMe(); // Spotify user profile
    res.json(me.body);
  } catch (err) {
    console.error("Error fetching user profile:", err);
    res.status(500).json({ error: "Failed to fetch profile" });
  }
});

// ===== ROUTE: Get Recommendations (seeded by genres) =====
router.get("/recommendations", async (req, res) => {
  try {
    const accessToken = req.headers.authorization?.split(" ")[1];
    if (!accessToken) {
      return res.status(401).json({ error: "No access token provided" });
    }

    spotifyApi.setAccessToken(accessToken);

    // You can tweak this to use top artists/tracks instead of fixed genres
    const data = await spotifyApi.getRecommendations({
      seed_genres: ["pop", "rock", "hip-hop"],
      limit: 10,
    });

    res.json(data.body.tracks);
  } catch (err) {
    console.error("Error fetching recommendations:", err);
    res.status(500).json({ error: "Failed to fetch recommendations" });
  }
});

// ===== ROUTE: Recommend Playlist Based on Mood =====
router.get("/recommend/:mood", async (req, res) => {
  const mood = req.params.mood.toLowerCase();
  const genre = moodGenres[mood] || "pop"; // fallback

  try {
    const accessToken = req.headers.authorization?.split(" ")[1];
    if (!accessToken) {
      return res.status(401).json({ error: "No access token provided" });
    }

    spotifyApi.setAccessToken(accessToken);

    const data = await spotifyApi.searchPlaylists(genre, { limit: 10 });

    // return only clean playlists (no nulls)
    const playlists = (data.body.playlists.items || []).filter(Boolean);

    res.json({ playlists });
  } catch (err) {
    console.error(
      "Failed to fetch playlists:",
      err.response?.data || err.message || err
    );
    res.status(500).json({ error: "Failed to fetch from Spotify" });
  }
});

export default router;
