import React, { useState, useRef, useEffect } from "react";
import axios from "axios";

export default function MoodDetection() {
  const [mode, setMode] = useState("text"); // text or camera
  const [text, setText] = useState("");
  const [faces, setFaces] = useState([]);
  const [loading, setLoading] = useState(false);
  const [cameraActive, setCameraActive] = useState(false);
  const [detectedMood, setDetectedMood] = useState(null);
  const [playlists, setPlaylists] = useState([]);

  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  // Start/Stop Camera
  const startCamera = () => {
    navigator.mediaDevices
      .getUserMedia({ video: true })
      .then((stream) => {
        if (videoRef.current) videoRef.current.srcObject = stream;
        setCameraActive(true);
      })
      .catch((err) => console.error("Camera error:", err));
  };

  const stopCamera = () => {
    if (videoRef.current?.srcObject) {
      videoRef.current.srcObject.getTracks().forEach((track) => track.stop());
      videoRef.current.srcObject = null;
      setCameraActive(false);
    }
  };

  const toggleCamera = () => (cameraActive ? stopCamera() : startCamera());

  useEffect(() => {
    if (mode !== "camera" && cameraActive) stopCamera();
  }, [mode]);

const handleTextSubmit = async () => {
  if (!text.trim()) {
    alert("Please enter some text first!");
    return;
  }

  setLoading(true);
  try {
    const res = await axios.post("http://127.0.0.1:8000/analyze-text", {
      text,
    });

    if (res.data.status === "success" && res.data.faces?.length > 0) {
      setFaces(res.data.faces);
      setDetectedMood(res.data.faces[0].emotion);
    } else {
      setFaces([]);
      setDetectedMood(null);
      alert("No emotion detected from text.");
    }
  } catch (err) {
    console.error("Text analysis failed:", err);
    alert("Error analyzing text. Check backend logs.");
  }
  setLoading(false);
};
 

  // Camera capture
  const handleCapture = async () => {
    if (!videoRef.current || !canvasRef.current) return;
    const ctx = canvasRef.current.getContext("2d");
    ctx.drawImage(videoRef.current, 0, 0, 320, 240);

    canvasRef.current.toBlob(async (blob) => {
      const formData = new FormData();
      formData.append("image", blob, "capture.jpg");
      setLoading(true);

      try {
        const res = await axios.post(
          "http://127.0.0.1:8000/detect-emotion",
          formData,
          {
            headers: { "Content-Type": "multipart/form-data" },
          }
        );

        if (res.data.faces?.length > 0) {
          setFaces(res.data.faces);
          setDetectedMood(res.data.faces[0].emotion);
        } else {
          setFaces([]);
          setDetectedMood(null);
        }
      } catch (err) {
        console.error(err);
      }

      setLoading(false);
    }, "image/jpeg");
  };

  // Fetch Spotify playlists by mood
  // const fetchPlaylists = async (mood) => {
  //   const token = localStorage.getItem("spotifyToken");
  //   if (!token) return alert("Please login with Spotify first!");

  //   setLoading(true);
  //   try {
  //     // Spotify API: search playlists by mood keyword
  //     const res = await axios.get(
  //       `https://api.spotify.com/v1/search?q=${encodeURIComponent(
  //         mood
  //       )}&type=playlist&limit=5`,
  //       {
  //         headers: { Authorization: `Bearer ${token}` },
  //       }
  //     );
  //     setPlaylists(res.data.playlists.items || []);
  //   } catch (err) {
  //     console.error(err);
  //     alert("Failed to fetch playlists. Check Spotify token.");
  //   }
  //   setLoading(false);
  // };
  // Fetch Spotify playlists by mood
  // const fetchPlaylists = async (mood) => {
  //   const accessToken = localStorage.getItem("spotifyAccessToken");
  //   if (!accessToken) {
  //     alert("Connect Spotify first!");
  //     return;
  //   }

  //   try {
  //     const res = await fetch(
  //       `http://localhost:5000/spotify/recommend/${mood.toLowerCase()}`,
  //       {
  //         headers: { Authorization: `Bearer ${accessToken}` },
  //       }
  //     );

  //     const data = await res.json();
  //     if (!res.ok) throw new Error(data.error || "Failed to fetch");
  //     setPlaylists(data.playlists || []);
  //   } catch (err) {
  //     console.error(err);
  //     alert("Failed to fetch playlists");
  //   }
  // };
  const fetchPlaylists = async (mood) => {
    const accessToken = localStorage.getItem("spotifyAccessToken");
    if (!accessToken) {
      alert("Connect Spotify first!");
      return;
    }

    try {
      const res = await fetch(
        `http://localhost:5000/spotify/recommend/${mood.toLowerCase()}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`, // ✅ must be here
          },
        }
      );

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to fetch");
      console.log("Playlists:", data.playlists);
      setPlaylists(data.playlists || []);
    } catch (err) {
      console.error(err);
      alert("Failed to fetch playlists");
    }
  };

  const downloadSong = async (title, artist) => {
    try {
      const query = `${title} ${artist}`;
      const res = await fetch(
        `http://localhost:5000/download?query=${encodeURIComponent(query)}`
      );
      const data = await res.json();

      if (data.success && data.file) {
        alert(`Downloaded: ${title}\nSaved to ${data.file}`);
      } else {
        alert("Download failed. Try again!");
      }
    } catch (err) {
      console.error(err);
      alert("Error while downloading.");
    }
  };

  // Add playlist to Player page
  const addToPlayer = (playlist) => {
    if (window.addMoodPlaylist) {
      window.addMoodPlaylist(playlist);
      alert(`Playlist "${playlist.name}" added to Player!`);
    } else {
      alert("Player not ready.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white flex flex-col items-center py-10 px-4">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Mood Detection</h1>

      {/* Mode Toggle */}
      <div className="flex gap-4 mb-6">
        <button
          className={`px-5 py-2 rounded-xl shadow-md transition ${
            mode === "text"
              ? "bg-blue-600 text-white"
              : "bg-white border border-gray-300 text-gray-700 hover:bg-gray-100"
          }`}
          onClick={() => setMode("text")}
        >
          Text Mode
        </button>
        <button
          className={`px-5 py-2 rounded-xl shadow-md transition ${
            mode === "camera"
              ? "bg-blue-600 text-white"
              : "bg-white border border-gray-300 text-gray-700 hover:bg-gray-100"
          }`}
          onClick={() => setMode("camera")}
        >
          Camera Mode
        </button>
      </div>

      {/* Text Mode */}
      {mode === "text" && (
        <div className="w-full max-w-md bg-white p-6 rounded-xl shadow-lg">
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="w-full p-3 border rounded-lg mb-4 focus:ring-2 focus:ring-blue-400"
            placeholder="Type how you feel..."
          />
          <button
            onClick={handleTextSubmit}
            className="w-full px-4 py-2 bg-green-500 text-white rounded-lg shadow-md hover:bg-green-600 transition"
          >
            Analyze
          </button>
        </div>
      )}

      {/* Camera Mode */}
      {mode === "camera" && (
        <div className="flex flex-col items-center bg-white p-6 rounded-xl shadow-lg">
          <video
            ref={videoRef}
            autoPlay
            playsInline
            width="320"
            height="240"
            className="border rounded-lg shadow mb-4"
          />
          <canvas
            ref={canvasRef}
            width="320"
            height="240"
            className="border mb-4"
          />
          <div className="flex gap-4 mt-2">
            <button
              onClick={handleCapture}
              className="px-5 py-2 bg-green-500 text-white rounded-lg shadow-md hover:bg-green-600 transition"
            >
              Capture & Analyze
            </button>
            <button
              onClick={toggleCamera}
              className={`px-5 py-2 rounded-lg shadow-md transition ${
                cameraActive
                  ? "bg-red-500 text-white hover:bg-red-600"
                  : "bg-blue-500 text-white hover:bg-blue-600"
              }`}
            >
              {cameraActive ? "Stop Camera" : "Start Camera"}
            </button>
          </div>
        </div>
      )}

      {playlists.length > 0 && (
        <div className="mt-6 w-full max-w-lg bg-gray-50 p-6 rounded-xl shadow-lg border">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Playlists for mood: {detectedMood}
          </h2>
          <ul className="space-y-3">
            {playlists.map((pl) => (
              <li
                key={pl.id}
                className="flex justify-between items-center border-b pb-2"
              >
                <a
                  href={pl.external_urls.spotify}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  {pl.name}
                </a>
                <button
                  onClick={() => addToPlayer(pl)}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700"
                >
                  Add to Player
                </button>
                // Inside playlist rendering
                <li key={pl.id} className="flex flex-col gap-2 border-b pb-2">
                  <div className="flex justify-between items-center">
                    <a
                      href={pl.external_urls.spotify}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline"
                    >
                      {pl.name}
                    </a>
                    <div className="flex gap-2">
                      <button
                        onClick={() => addToPlayer(pl)}
                        className="px-3 py-1 bg-blue-600 text-white rounded-md text-sm hover:bg-blue-700"
                      >
                        Add
                      </button>
                      <button
                        onClick={() =>
                          downloadSong(pl.name, pl.artists?.[0]?.name)
                        }
                        className="px-3 py-1 bg-green-600 text-white rounded-md text-sm hover:bg-green-700"
                      >
                        Download
                      </button>
                    </div>
                  </div>
                </li>
              </li>
            ))}
          </ul>
        </div>
      )}
      {detectedMood && (
        <button
          onClick={() => fetchPlaylists(detectedMood)}
          className="mt-6 px-6 py-3 bg-purple-600 text-white rounded-lg shadow-md hover:bg-purple-700 transition"
        >
          Generate Playlist for "{detectedMood}"
        </button>
      )}

      {loading && (
        <p className="mt-6 text-gray-600 animate-pulse">Loading...</p>
      )}

      {faces.length > 0 && (
        <div className="mt-6 w-full max-w-md bg-gray-50 p-6 rounded-xl shadow-lg border">
          <h2 className="text-xl font-semibold text-gray-800">
            Detected Faces
          </h2>
          {faces.map((face, idx) => (
            <div key={idx} className="mt-4">
              <p className="text-lg">
                Emotion:{" "}
                <span className="text-blue-600">{face?.emotion || "N/A"}</span>
              </p>
              {face?.probabilities && (
                <ul className="mt-2 space-y-1 text-gray-700">
                  {Object.entries(face.probabilities).map(([emo, prob]) => (
                    <li key={emo} className="flex justify-between">
                      <span>{emo}</span>
                      <span className="font-medium">
                        {(prob * 100).toFixed(2)}%
                      </span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      )}

      {!faces.length && !loading && (
        <p className="mt-6 text-gray-600">No face detected.</p>
      )}
    </div>
  );
}
