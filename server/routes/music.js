// server/routes/music.js
import express from "express";
import yts from "yt-search";
import multer from "multer";
import path from "path";
import fs from "fs";

const router = express.Router();

// 1) Search YouTube for a track and return video info (safe: streaming/embed)
router.get("/search", async (req, res) => {
  const q = (req.query.q || "").trim();
  if (!q) return res.status(400).json({ error: "Missing query param 'q'" });

  try {
    const r = await yts(q);
    const video = r.videos && r.videos.length ? r.videos[0] : null;
    if (!video) return res.status(404).json({ error: "No video found" });

    res.json({
      title: video.title,
      url: video.url,
      videoId: video.videoId,
      duration: video.timestamp,
      author: video.author.name,
      thumbnail: video.thumbnail,
    });
  } catch (err) {
    console.error("YouTube search error:", err);
    res.status(500).json({ error: "YouTube search failed" });
  }
});

/*
  2) Upload endpoint (legal) for users to add local files to the app library.
     Files are stored on the server (or you can forward to CDN). This is the
     legitimate way to add full songs the user owns to the app.
*/
const uploadDir = path.resolve("./uploads");
if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir);

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadDir),
  filename: (req, file, cb) => {
    const safeName = Date.now() + "-" + file.originalname.replace(/\s+/g, "_");
    cb(null, safeName);
  },
});
const upload = multer({ storage });

router.post("/upload", upload.single("file"), (req, res) => {
  if (!req.file) return res.status(400).json({ error: "No file uploaded" });
  const fileUrl = `/uploads/${req.file.filename}`; // serve statically in main server
  res.json({
    title: req.file.originalname,
    filename: req.file.filename,
    url: fileUrl,
  });
});

export default router;
