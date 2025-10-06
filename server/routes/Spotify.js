// // backend/routes/Spotify.js
// import express from "express";
// import SpotifyWebApi from "spotify-web-api-node";
// import dotenv from "dotenv";
// import querystring from "querystring";

// dotenv.config();

// const router = express.Router();

// // Helper to create a new SpotifyWebApi instance with token
// function getSpotifyApi(token, refreshToken = null) {
//   const api = new SpotifyWebApi({
//     clientId: process.env.SPOTIFY_CLIENT_ID,
//     clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
//     redirectUri: process.env.SPOTIFY_REDIRECT_URI,
//   });
//   if (token) api.setAccessToken(token);
//   if (refreshToken) api.setRefreshToken(refreshToken);
//   return api;
// }

// // --- ROUTE: Spotify Login ---
// router.get("/login", (req, res) => {
//   const scopes = [
//     "user-read-private",
//     "user-read-email", // REQUIRED for /me
//     "user-top-read",
//     "user-library-read",
//     "playlist-read-private",
//     "playlist-read-collaborative",
//   ];

//   const authUrl = getSpotifyApi().createAuthorizeURL(scopes, "state123");
//   console.log("Redirecting to Spotify:", authUrl);
//   res.redirect(authUrl);
// });

// // --- ROUTE: Spotify Callback ---
// router.get("/callback", async (req, res) => {
//   const code = req.query.code || null;
//   if (!code) return res.status(400).send("No code received from Spotify");

//   try {
//     const api = getSpotifyApi();
//     const data = await api.authorizationCodeGrant(code);

//     const accessToken = data.body.access_token;
//     const refreshToken = data.body.refresh_token;
//     const expiresIn = data.body.expires_in;

//     console.log("✅ Received Spotify tokens.");

//     // Redirect to frontend with tokens
//     res.redirect(
//       `http://localhost:3000/spotify/callback?${querystring.stringify({
//         accessToken,
//         refreshToken,
//         expiresIn,
//       })}`
//     );
//   } catch (err) {
//     console.error("Spotify callback error:", err.body || err.message);
//     res.status(400).send("Error getting tokens");
//   }
// });

// // --- ROUTE: Refresh Token ---
// router.get("/refresh_token", async (req, res) => {
//   const refreshToken = req.query.refreshToken;
//   if (!refreshToken)
//     return res.status(400).json({ error: "No refresh token provided" });

//   try {
//     const api = getSpotifyApi(null, refreshToken);
//     const data = await api.refreshAccessToken();
//     res.json({
//       accessToken: data.body.access_token,
//       expiresIn: data.body.expires_in,
//     });
//   } catch (err) {
//     console.error("Error refreshing token:", err.body || err);
//     res.status(500).json({ error: "Failed to refresh token" });
//   }
// });

// // --- ROUTE: Get Spotify Profile ---
// // --- ROUTE: Get Spotify Profile ---
// router.get("/me", async (req, res) => {
//   const authHeader = req.headers.authorization;
//   if (!authHeader || !authHeader.startsWith("Bearer ")) {
//     // 🚨 Redirect instead of 401
//     return res.redirect("/api/spotify/login");
//   }

//   const token = authHeader.split(" ")[1];
//   const api = getSpotifyApi(token);

//   try {
//     const response = await api.getMe();
//     res.json(response.body);
//   } catch (err) {
//     console.error("Error fetching Spotify profile:", err.body || err);
//     // If token invalid or expired, force login
//     return res.redirect("/api/spotify/login");
//   }
// });

// // --- ROUTE: User Library (Tracks + Playlists) ---
// router.get("/library", async (req, res) => {
//   const authHeader = req.headers.authorization;
//   if (!authHeader || !authHeader.startsWith("Bearer ")) {
//     return res.status(401).json({ error: "No valid access token provided" });
//   }
//   const token = authHeader.split(" ")[1];
//   const api = getSpotifyApi(token);

//   try {
//     const [tracksRes, playlistsRes] = await Promise.all([
//       api.getMySavedTracks({ limit: 20 }),
//       api.getUserPlaylists({ limit: 20 }),
//     ]);

//     res.json({
//       savedTracks: tracksRes.body.items.map((item) => ({
//         name: item.track.name,
//         artist: item.track.artists.map((a) => a.name).join(", "),
//         url: item.track.external_urls.spotify,
//       })),
//       playlists: playlistsRes.body.items.map((pl) => ({
//         name: pl.name,
//         id: pl.id,
//         url: pl.external_urls.spotify,
//       })),
//     });
//   } catch (err) {
//     console.error("Error fetching library:", err.body || err);
//     res.status(500).json({ error: "Failed to fetch library" });
//   }
// });

// // --- ROUTE: Mood-Based Recommendations (Dynamic) ---

// // Mood mappings for recommendations
// const moodMappings = {
//   happy: {
//     min_energy: 0.6,
//     min_valence: 0.7,
//     seed_genres: ["pop", "dance", "indie"],
//   },
//   sad: {
//     max_energy: 0.5,
//     max_valence: 0.4,
//     seed_genres: ["acoustic", "piano", "indie"],
//   },
//   angry: {
//     min_energy: 0.8,
//     max_valence: 0.3,
//     seed_genres: ["rock", "metal", "hip-hop"],
//   },
//   calm: { max_energy: 0.5, seed_genres: ["chill", "jazz", "ambient"] },
//   relaxed: { max_energy: 0.5, seed_genres: ["chill", "lo-fi", "soul"] },
//   neutral: { seed_genres: ["pop", "rock", "hip-hop"] },
// };

// // --- Helper: Spotify API Client Credentials Flow ---
// async function getSpotifyApiClientCredentials() {
//   const api = new SpotifyWebApi({
//     clientId: process.env.SPOTIFY_CLIENT_ID,
//     clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
//   });

//   const data = await api.clientCredentialsGrant();
//   api.setAccessToken(data.body.access_token);
//   return api;
// }

// // --- Route: Get mood-based recommendations ---
// // router.get("/recommendations/:mood", async (req, res) => {
// //   try {
// //     const mood = req.params.mood.toLowerCase();
// //     const moodParams = moodMappings[mood];

// //     if (!moodParams)
// //       return res.status(400).json({ error: `Invalid mood: ${mood}` });

// //     const api = await getSpotifyApiClientCredentials();

// //     const data = await api.getRecommendations({
// //       limit: 10,
// //       market: "IN",
// //       ...moodParams,
// //     });

// //     const tracks = data.body.tracks.map((track) => ({
// //       name: track.name,
// //       artist: track.artists.map((a) => a.name).join(", "),
// //       url: track.external_urls.spotify,
// //       preview_url: track.preview_url,
// //     }));

// //     res.json({ mood, tracks });
// //   } catch (err) {
// //     console.error("Failed to fetch recommendations:", err.body || err);
// //     res.status(500).json({ error: "Failed to fetch recommendations" });
// //   }
// // });
// const moodMap = {
//   happy: "pop",
//   sad: "acoustic",
//   angry: "rock",
//   calm: "ambient",
//   energetic: "dance",
//   relaxed: "chill",
// };

// // Replace with your Spotify logic if needed
// // backend/routes/Spotify.js
// // Helper function to get client credentials token
// async function getClientCredentialsToken() {
//   const clientId = process.env.SPOTIFY_CLIENT_ID;
//   const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;

//   const authString = Buffer.from(`${clientId}:${clientSecret}`).toString(
//     "base64"
//   );

//   const response = await fetch("https://accounts.spotify.com/api/token", {
//     method: "POST",
//     headers: {
//       Authorization: `Basic ${authString}`,
//       "Content-Type": "application/x-www-form-urlencoded",
//     },
//     body: "grant_type=client_credentials",
//   });

//   if (!response.ok) {
//     throw new Error(`Failed to get token: ${response.status}`);
//   }

//   const data = await response.json();
//   return data.access_token;
// }

// // Updated recommend route
// router.get("/recommend/:emotion", async (req, res) => {
//   try {
//     const emotion = req.params.emotion.toLowerCase();
//     console.log("🎵 Emotion param:", emotion);

//     // Search queries based on mood
//     const moodQueries = {
//       happy: "genre:pop mood:happy",
//       sad: "genre:sad mood:melancholy",
//       angry: "genre:rock mood:aggressive",
//       relaxed: "genre:chill mood:peaceful",
//       neutral: "genre:pop",
//       excited: "genre:dance mood:energetic",
//     };

//     const query = moodQueries[emotion] || "genre:pop";

//     const token = await getClientCredentialsToken();

//     const params = new URLSearchParams({
//       q: query,
//       type: "track",
//       limit: "10",
//     });

//     const url = `https://api.spotify.com/v1/search?${params}`;
//     console.log("🌐 Searching:", url);

//     const response = await fetch(url, {
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     });

//     if (!response.ok) {
//       throw new Error(`Search failed: ${response.status}`);
//     }

//     const data = await response.json();

//     const tracks = data.tracks.items.map((t) => ({
//       id: t.id,
//       name: t.name,
//       artist: t.artists[0]?.name || "Unknown",
//       url: t.external_urls.spotify,
//       preview: t.preview_url,
//       image: t.album.images[0]?.url || null,
//     }));

//     res.json({ emotion, tracks });
//   } catch (err) {
//     console.error("Spotify search error:", err.message);
//     res.status(500).json({
//       error: "Could not fetch recommendations",
//       details: err.message,
//     });
//   }
// });
// // ---- ADD THIS ROUTE ----
// // Add this route to check available genres
// router.get("/available-genres", async (req, res) => {
//   try {
//     const spotifyApi = await getSpotifyApiClientCredentials();
//     const data = await spotifyApi.getAvailableGenreSeeds();
//     res.json({ genres: data.body.genres });
//   } catch (err) {
//     console.error("Error fetching genres:", err);
//     res.status(500).json({ error: "Failed to fetch genres" });
//   }
// });

// export default router;
// backend/routes/Spotify.js
import express from "express";
import SpotifyWebApi from "spotify-web-api-node";
import dotenv from "dotenv";
import querystring from "querystring";

dotenv.config();

const router = express.Router();

// Helper to create a new SpotifyWebApi instance with token
function getSpotifyApi(token, refreshToken = null) {
  const api = new SpotifyWebApi({
    clientId: process.env.SPOTIFY_CLIENT_ID,
    clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
    redirectUri: process.env.SPOTIFY_REDIRECT_URI,
  });
  if (token) api.setAccessToken(token);
  if (refreshToken) api.setRefreshToken(refreshToken);
  return api;
}

// --- ROUTE: Spotify Login ---
router.get("/login", (req, res) => {
  const scopes = [
    "user-read-private",
    "user-read-email",
    "user-top-read",
    "user-library-read",
    "playlist-read-private",
    "playlist-read-collaborative",
  ];

  const authUrl = getSpotifyApi().createAuthorizeURL(scopes, "state123");
  console.log("Redirecting to Spotify:", authUrl);
  res.redirect(authUrl);
});

// --- ROUTE: Spotify Callback ---
router.get("/callback", async (req, res) => {
  const code = req.query.code || null;
  if (!code) return res.status(400).send("No code received from Spotify");

  try {
    const api = getSpotifyApi();
    const data = await api.authorizationCodeGrant(code);

    const accessToken = data.body.access_token;
    const refreshToken = data.body.refresh_token;
    const expiresIn = data.body.expires_in;

    console.log("✅ Received Spotify tokens.");

    res.redirect(
      `http://localhost:3000/spotify/callback?${querystring.stringify({
        accessToken,
        refreshToken,
        expiresIn,
      })}`
    );
  } catch (err) {
    console.error("Spotify callback error:", err.body || err.message);
    res.status(400).send("Error getting tokens");
  }
});

// --- ROUTE: Refresh Token ---
router.get("/refresh_token", async (req, res) => {
  const refreshToken = req.query.refreshToken;
  if (!refreshToken)
    return res.status(400).json({ error: "No refresh token provided" });

  try {
    const api = getSpotifyApi(null, refreshToken);
    const data = await api.refreshAccessToken();
    res.json({
      accessToken: data.body.access_token,
      expiresIn: data.body.expires_in,
    });
  } catch (err) {
    console.error("Error refreshing token:", err.body || err);
    res.status(500).json({ error: "Failed to refresh token" });
  }
});

// --- ROUTE: Get Spotify Profile ---
router.get("/me", async (req, res) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.redirect("/api/spotify/login");
  }

  const token = authHeader.split(" ")[1];
  const api = getSpotifyApi(token);

  try {
    const response = await api.getMe();
    res.json(response.body);
  } catch (err) {
    console.error("Error fetching Spotify profile:", err.body || err);
    return res.redirect("/api/spotify/login");
  }
});

// --- ROUTE: User Library (Tracks + Playlists) ---
router.get("/library", async (req, res) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ error: "No valid access token provided" });
  }
  const token = authHeader.split(" ")[1];
  const api = getSpotifyApi(token);

  try {
    const [tracksRes, playlistsRes] = await Promise.all([
      api.getMySavedTracks({ limit: 20 }),
      api.getUserPlaylists({ limit: 20 }),
    ]);

    res.json({
      savedTracks: tracksRes.body.items.map((item) => ({
        name: item.track.name,
        artist: item.track.artists.map((a) => a.name).join(", "),
        url: item.track.external_urls.spotify,
      })),
      playlists: playlistsRes.body.items.map((pl) => ({
        name: pl.name,
        id: pl.id,
        url: pl.external_urls.spotify,
      })),
    });
  } catch (err) {
    console.error("Error fetching library:", err.body || err);
    res.status(500).json({ error: "Failed to fetch library" });
  }
});

// --- Helper: Get Client Credentials Token ---
async function getClientCredentialsToken() {
  const clientId = process.env.SPOTIFY_CLIENT_ID;
  const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;

  const authString = Buffer.from(`${clientId}:${clientSecret}`).toString(
    "base64"
  );

  const response = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      Authorization: `Basic ${authString}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: "grant_type=client_credentials",
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Failed to get token: ${response.status} - ${error}`);
  }

  const data = await response.json();
  return data.access_token;
}

// --- ROUTE: Mood-Based Recommendations using Search API ---
router.get("/recommend/:emotion", async (req, res) => {
  try {
    const emotion = req.params.emotion.toLowerCase();
    console.log("🎵 Emotion param:", emotion);

    // Simplified search - just use basic keywords
    const moodKeywords = {
      happy: "happy",
      sad: "sad",
      angry: "rock",
      relaxed: "chill",
      neutral: "pop",
      excited: "dance",
    };

    const keyword = moodKeywords[emotion] || "pop";
    console.log("🔍 Using keyword:", keyword);

    // Get token
    const token = await getClientCredentialsToken();
    console.log("🔑 Got access token");

    // Simple direct search
    const params = new URLSearchParams({
      q: keyword,
      type: "track",
      limit: "20",
    });

    const url = `https://api.spotify.com/v1/search?${params}`;
    console.log("🌐 Calling:", url);

    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    console.log("📡 Response status:", response.status);

    if (!response.ok) {
      const errorText = await response.text();
      console.error("❌ API Error:", errorText);
      throw new Error(`Spotify returned ${response.status}: ${errorText}`);
    }

    const data = await response.json();
    console.log("📊 Tracks found:", data.tracks?.items?.length || 0);

    if (!data.tracks || !data.tracks.items || data.tracks.items.length === 0) {
      console.warn("⚠️ No tracks found in response");
      return res.json({
        emotion,
        tracks: [],
        count: 0,
        message: "No songs found for this mood. Try another emotion!",
      });
    }

    const tracks = data.tracks.items.map((t) => ({
      id: t.id,
      name: t.name,
      artist: t.artists[0]?.name || "Unknown Artist",
      url: t.external_urls.spotify,
      preview: t.preview_url,
      image: t.album.images[0]?.url || null,
      album: t.album.name,
    }));

    console.log(`✅ Returning ${tracks.length} tracks for ${emotion}`);
    res.json({ emotion, tracks, count: tracks.length });
  } catch (err) {
    console.error("❌ Spotify recommendation error:", err.message);
    console.error("Full error:", err);
    res.status(500).json({
      error: "Could not fetch recommendations",
      details: err.message,
    });
  }
});

// --- ROUTE: Get available genres (for debugging) ---
router.get("/genres", async (req, res) => {
  try {
    const token = await getClientCredentialsToken();

    const response = await fetch(
      "https://api.spotify.com/v1/recommendations/available-genre-seeds",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error(`Failed to fetch genres: ${response.status}`);
    }

    const data = await response.json();
    res.json({ genres: data.genres });
  } catch (err) {
    console.error("Error fetching genres:", err.message);
    res.status(500).json({ error: err.message });
  }
});

export default router;
