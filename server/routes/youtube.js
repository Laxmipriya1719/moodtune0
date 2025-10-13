// server/routes/youtube.js - SIMPLIFIED VERSION
import express from "express";
import fetch from "node-fetch";
import ytSearch from "yt-search";
const router = express.Router();
const YT_API_KEY = process.env.YT_API_KEY;

// Example: GET /api/youtube/download?query=Happy%20Nation%20Ace%20of%20Base
// server/routes/youtube.js

// GET /api/youtube/download?query=Song+Name
router.get("/download", async (req, res) => {
  try {
    const query = req.query.query;
    if (!query) {
      return res.status(400).json({ error: "Missing query parameter" });
    }

    console.log("🎵 YouTube download request for:", query);

    // Search YouTube
    const searchResult = await ytSearch(query);
    if (!searchResult.videos?.length) {
      return res.status(404).json({ error: "No video found for query" });
    }

    const video = searchResult.videos[0];
    console.log("Found video:", video.title, video.url);

    // Make safe filename
    const safeName =
      video.title.replace(/[^\w\s]/gi, "").replace(/\s+/g, "_") + ".mp3";

    // Set response headers
    res.header("Content-Disposition", `attachment; filename="${safeName}"`);
    res.header("Content-Type", "audio/mpeg");

    // Stream audio to client
    ytdl(video.url, { filter: "audioonly", quality: "highestaudio" })
      .on("error", (err) => {
        console.error("❌ ytdl error:", err);
        if (!res.headersSent) res.status(500).send("Failed to download audio");
      })
      .pipe(res);
  } catch (err) {
    console.error("❌ Download route error:", err);
    if (!res.headersSent) res.status(500).json({ error: err.message });
  }
});

// Simple search endpoint - returns video ID
router.get("/search", async (req, res) => {
  try {
    const { query } = req.query;
    if (!query) return res.status(400).json({ error: "Query required" });

    console.log("🔍 Searching YouTube for:", query);

    const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&maxResults=1&q=${encodeURIComponent(
      query
    )}&key=${YT_API_KEY}`;

    const response = await fetch(url);
    const data = await response.json();

    if (data.items && data.items.length > 0) {
      const video = data.items[0];
      res.json({
        videoId: video.id.videoId,
        title: video.snippet.title,
        thumbnail: video.snippet.thumbnails.default.url,
      });
    } else {
      res.status(404).json({ error: "No results found" });
    }
  } catch (err) {
    console.error("❌ Search error:", err);
    res.status(500).json({ error: "Search failed", details: err.message });
  }
});

export default router;
