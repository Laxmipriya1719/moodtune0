// // "use client";

// // import { useState, useRef, useEffect } from "react";
// // // import Link from "next/link";
// // // import { Link } from "react-router-dom";

// // export default function MoodDetection() {
// //   const [isAnalyzing, setIsAnalyzing] = useState(false);
// //   const [detectedMood, setDetectedMood] = useState("");
// //   const [confidence, setConfidence] = useState(0);
// //   const [cameraActive, setCameraActive] = useState(false);
// //   const [textMood, setTextMood] = useState("");
// //   const [analysisMode, setAnalysisMode] = useState("camera"); // 'camera' or 'text'
// //   const videoRef = useRef(null); // <-- JavaScript-friendly now

// //   const mockAnalyze = () => {
// //     setIsAnalyzing(true);

// //     setTimeout(() => {
// //       const moods = ["happy", "relaxed", "energetic", "calm", "contemplative"];
// //       const randomMood = moods[Math.floor(Math.random() * moods.length)];
// //       const randomConfidence = Math.floor(Math.random() * 30) + 70; // 70-100%

// //       setDetectedMood(randomMood);
// //       setConfidence(randomConfidence);
// //       setIsAnalyzing(false);
// //     }, 3000);
// //   };

// //   const startCamera = async () => {
// //     try {
// //       setCameraActive(true);
// //       // Mock camera activation
// //       setTimeout(() => {
// //         mockAnalyze();
// //       }, 1000);
// //     } catch (error) {
// //       console.error("Camera access denied");
// //       setCameraActive(false);
// //     }
// //   };

// //   const analyzeText = () => {
// //     if (!textMood.trim()) return;

// //     setIsAnalyzing(true);

// //     setTimeout(() => {
// //       let mood = "contemplative";
// //       let conf = 85;

// //       const text = textMood.toLowerCase();
// //       if (
// //         text.includes("happy") ||
// //         text.includes("joy") ||
// //         text.includes("excited")
// //       ) {
// //         mood = "happy";
// //         conf = 92;
// //       } else if (
// //         text.includes("sad") ||
// //         text.includes("tired") ||
// //         text.includes("stressed")
// //       ) {
// //         mood = "calm";
// //         conf = 88;
// //       } else if (
// //         text.includes("energy") ||
// //         text.includes("workout") ||
// //         text.includes("motivated")
// //       ) {
// //         mood = "energetic";
// //         conf = 90;
// //       } else if (
// //         text.includes("relax") ||
// //         text.includes("chill") ||
// //         text.includes("peaceful")
// //       ) {
// //         mood = "relaxed";
// //         conf = 87;
// //       }

// //       setDetectedMood(mood);
// //       setConfidence(conf);
// //       setIsAnalyzing(false);
// //     }, 2000);
// //   };

// //   const getMoodColor = (mood) => {
// //     switch (mood) {
// //       case "happy":
// //         return "from-yellow-500 to-orange-500";
// //       case "relaxed":
// //         return "from-blue-500 to-cyan-500";
// //       case "energetic":
// //         return "from-red-500 to-pink-500";
// //       case "calm":
// //         return "from-green-500 to-emerald-500";
// //       case "contemplative":
// //         return "from-purple-500 to-indigo-500";
// //       default:
// //         return "from-gray-500 to-gray-600";
// //     }
// //   };

// //   const getRecommendedSongs = (mood) => {
// //     const recommendations = {
// //       happy: [
// //         "Happy Days - Sunshine Collective",
// //         "Bright Morning - Joy Wave",
// //         "Celebration Time - Party People",
// //       ],
// //       relaxed: [
// //         "Midnight Vibes - Luna Eclipse",
// //         "Summer Breeze - Coastal Winds",
// //         "Gentle Flow - River Sounds",
// //       ],
// //       energetic: [
// //         "Energy Rush - Beat Masters",
// //         "Power Up - Electric Storm",
// //         "Adrenaline - High Voltage",
// //       ],
// //       calm: [
// //         "Peaceful Mind - Zen Harmony",
// //         "Quiet Moments - Serenity",
// //         "Meditation Flow - Inner Peace",
// //       ],
// //       contemplative: [
// //         "Deep Thoughts - Introspective Soul",
// //         "Reflection - Mindful Music",
// //         "Inner Journey - Soul Search",
// //       ],
// //     };
// //     return recommendations[mood] || [];
// //   };

// //   return (
// //     <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
// //       {/* All your JSX stays the same... */}
// //       {/* I’ve left the component body unchanged, since it was already JS-friendly */}
// //       {/* Feel free to paste the remaining JSX code from your original component here – no change needed! */}
// //       <p>hi</p>
// //     </div>
// //   );
// // }
// "use client";

// import { useState, useRef } from "react";

// export default function MoodDetection() {
//   const [isAnalyzing, setIsAnalyzing] = useState(false);
//   const [detectedMood, setDetectedMood] = useState("");
//   const [confidence, setConfidence] = useState(0);
//   const [cameraActive, setCameraActive] = useState(false);
//   const [textMood, setTextMood] = useState("");
//   const [analysisMode, setAnalysisMode] = useState("camera"); // 'camera' or 'text'
//   const videoRef = useRef(null);

//   // ---------------- MOCK ANALYSIS ----------------
//   const mockAnalyze = () => {
//     setIsAnalyzing(true);

//     setTimeout(() => {
//       const moods = ["happy", "relaxed", "energetic", "calm", "contemplative"];
//       const randomMood = moods[Math.floor(Math.random() * moods.length)];
//       const randomConfidence = Math.floor(Math.random() * 30) + 70; // 70–100%

//       setDetectedMood(randomMood);
//       setConfidence(randomConfidence);
//       setIsAnalyzing(false);
//     }, 3000);
//   };

//   const startCamera = async () => {
//     try {
//       setCameraActive(true);
//       // Mock camera activation
//       setTimeout(() => {
//         mockAnalyze();
//       }, 1000);
//     } catch (error) {
//       console.error("Camera access denied");
//       setCameraActive(false);
//     }
//   };

//   const analyzeText = () => {
//     if (!textMood.trim()) return;
//     setIsAnalyzing(true);

//     setTimeout(() => {
//       let mood = "contemplative";
//       let conf = 85;

//       const text = textMood.toLowerCase();
//       if (
//         text.includes("happy") ||
//         text.includes("joy") ||
//         text.includes("excited")
//       ) {
//         mood = "happy";
//         conf = 92;
//       } else if (
//         text.includes("sad") ||
//         text.includes("tired") ||
//         text.includes("stressed")
//       ) {
//         mood = "calm";
//         conf = 88;
//       } else if (
//         text.includes("energy") ||
//         text.includes("workout") ||
//         text.includes("motivated")
//       ) {
//         mood = "energetic";
//         conf = 90;
//       } else if (
//         text.includes("relax") ||
//         text.includes("chill") ||
//         text.includes("peaceful")
//       ) {
//         mood = "relaxed";
//         conf = 87;
//       }

//       setDetectedMood(mood);
//       setConfidence(conf);
//       setIsAnalyzing(false);
//     }, 2000);
//   };

//   // ---------------- STYLE HELPERS ----------------
//   const getMoodColor = (mood) => {
//     switch (mood) {
//       case "happy":
//         return "from-yellow-500 to-orange-500";
//       case "relaxed":
//         return "from-blue-500 to-cyan-500";
//       case "energetic":
//         return "from-red-500 to-pink-500";
//       case "calm":
//         return "from-green-500 to-emerald-500";
//       case "contemplative":
//         return "from-purple-500 to-indigo-500";
//       default:
//         return "from-gray-500 to-gray-600";
//     }
//   };

//   const getRecommendedSongs = (mood) => {
//     const recommendations = {
//       happy: [
//         "Happy Days - Sunshine Collective",
//         "Bright Morning - Joy Wave",
//         "Celebration Time - Party People",
//       ],
//       relaxed: [
//         "Midnight Vibes - Luna Eclipse",
//         "Summer Breeze - Coastal Winds",
//         "Gentle Flow - River Sounds",
//       ],
//       energetic: [
//         "Energy Rush - Beat Masters",
//         "Power Up - Electric Storm",
//         "Adrenaline - High Voltage",
//       ],
//       calm: [
//         "Peaceful Mind - Zen Harmony",
//         "Quiet Moments - Serenity",
//         "Meditation Flow - Inner Peace",
//       ],
//       contemplative: [
//         "Deep Thoughts - Introspective Soul",
//         "Reflection - Mindful Music",
//         "Inner Journey - Soul Search",
//       ],
//     };
//     return recommendations[mood] || [];
//   };

//   // ---------------- UI ----------------
//   return (
//     <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 text-white flex flex-col items-center justify-center p-6">
//       <h1 className="text-4xl font-bold mb-6">🎶 Mood Detection</h1>

//       {/* Mode Switch */}
//       <div className="flex gap-4 mb-6">
//         <button
//           onClick={() => setAnalysisMode("camera")}
//           className={`px-6 py-2 rounded-lg ${
//             analysisMode === "camera" ? "bg-blue-600" : "bg-white/20"
//           }`}
//         >
//           Camera Mode
//         </button>
//         <button
//           onClick={() => setAnalysisMode("text")}
//           className={`px-6 py-2 rounded-lg ${
//             analysisMode === "text" ? "bg-blue-600" : "bg-white/20"
//           }`}
//         >
//           Text Mode
//         </button>
//       </div>

//       {/* CAMERA MODE */}
//       {analysisMode === "camera" && (
//         <div className="flex flex-col items-center space-y-4">
//           {!cameraActive ? (
//             <button
//               onClick={startCamera}
//               className="bg-green-500 px-6 py-3 rounded-xl font-semibold hover:bg-green-600"
//             >
//               🎥 Start Camera & Detect Mood
//             </button>
//           ) : (
//             <div className="w-64 h-40 bg-black flex items-center justify-center rounded-lg">
//               <p className="text-gray-400">[Mock Camera Feed]</p>
//             </div>
//           )}
//         </div>
//       )}

//       {/* TEXT MODE */}
//       {analysisMode === "text" && (
//         <div className="flex flex-col items-center space-y-4 w-full max-w-md">
//           <input
//             type="text"
//             placeholder="Type how you feel..."
//             className="w-full px-4 py-2 rounded-lg text-black"
//             value={textMood}
//             onChange={(e) => setTextMood(e.target.value)}
//           />
//           <button
//             onClick={analyzeText}
//             className="bg-purple-500 px-6 py-3 rounded-xl font-semibold hover:bg-purple-600"
//           >
//             ✍️ Analyze Mood
//           </button>
//         </div>
//       )}

//       {/* RESULTS */}
//       {isAnalyzing && (
//         <p className="mt-6 text-lg animate-pulse">Analyzing your mood...</p>
//       )}

//       {!isAnalyzing && detectedMood && (
//         <div
//           className={`mt-8 p-6 rounded-xl bg-gradient-to-r ${getMoodColor(
//             detectedMood
//           )} shadow-xl w-full max-w-lg`}
//         >
//           <h2 className="text-2xl font-bold capitalize">
//             Mood: {detectedMood} 🎧
//           </h2>
//           <p className="text-white/90">Confidence: {confidence}%</p>

//           <h3 className="mt-4 text-xl font-semibold">✨ Song Picks for You:</h3>
//           <ul className="list-disc list-inside mt-2 space-y-1">
//             {getRecommendedSongs(detectedMood).map((song, idx) => (
//               <li key={idx}>{song}</li>
//             ))}
//           </ul>
//         </div>
//       )}
//     </div>
//   );
// }
// import React, { useRef, useState } from "react";
// import axios from "axios";

// export default function CameraEmotion() {
//   const videoRef = useRef(null);
//   const canvasRef = useRef(null);
//   const [streaming, setStreaming] = useState(false);
//   const [emotion, setEmotion] = useState(null);

//   // Start Camera
//   const startCamera = async () => {
//     try {
//       const stream = await navigator.mediaDevices.getUserMedia({ video: true });
//       videoRef.current.srcObject = stream;
//       setStreaming(true);
//     } catch (err) {
//       console.error("Error accessing camera:", err);
//     }
//   };

//   // Capture photo from video
//   const capturePhoto = async () => {
//     const video = videoRef.current;
//     const canvas = canvasRef.current;
//     const ctx = canvas.getContext("2d");

//     canvas.width = video.videoWidth;
//     canvas.height = video.videoHeight;
//     ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

//     canvas.toBlob(async (blob) => {
//       const formData = new FormData();
//       formData.append("image", blob, "capture.jpg");

//       try {
//         const res = await axios.post(
//           "http://127.0.0.1:8000/detect-emotion",
//           formData,
//           {
//             headers: { "Content-Type": "multipart/form-data" },
//           }
//         );
//         setEmotion(res.data);
//       } catch (error) {
//         console.error("Error detecting emotion:", error);
//       }
//     }, "image/jpeg");
//   };

//   return (
//     <div className="flex flex-col items-center gap-4 p-4">
//       {/* Video preview */}
//       <video
//         ref={videoRef}
//         autoPlay
//         playsInline
//         className="rounded-xl border shadow-md w-[400px] h-[300px] bg-black"
//       ></video>

//       <canvas ref={canvasRef} style={{ display: "none" }}></canvas>

//       {/* Buttons */}
//       {!streaming ? (
//         <button
//           onClick={startCamera}
//           className="px-4 py-2 bg-blue-600 text-white rounded-lg shadow"
//         >
//           Start Camera
//         </button>
//       ) : (
//         <button
//           onClick={capturePhoto}
//           className="px-4 py-2 bg-green-600 text-white rounded-lg shadow"
//         >
//           Capture & Detect
//         </button>
//       )}

//       {/* Result */}
//       {emotion && (
//         <div className="mt-4 p-4 bg-gray-100 rounded-lg shadow w-[400px]">
//           <h2 className="text-lg font-bold">Detected Emotion:</h2>
//           <p>{emotion.emotion}</p>
//         </div>
//       )}
//     </div>
//   );
// }
import React, { useState, useRef, useEffect } from "react";
import axios from "axios";

export default function MoodDetection() {
  const [mode, setMode] = useState("text"); // text or camera
  const [text, setText] = useState("");
  const [faces, setFaces] = useState([]); // multiple faces
  const [loading, setLoading] = useState(false);

  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  // Start camera when in camera mode
  useEffect(() => {
    if (mode === "camera") {
      navigator.mediaDevices
        .getUserMedia({ video: true })
        .then((stream) => {
          if (videoRef.current) {
            videoRef.current.srcObject = stream;
          }
        })
        .catch((err) => console.error("Camera error:", err));
    }
    return () => {
      if (videoRef.current && videoRef.current.srcObject) {
        let tracks = videoRef.current.srcObject.getTracks();
        tracks.forEach((track) => track.stop());
      }
    };
  }, [mode]);

  // dummy NLP analysis for text
  const handleTextSubmit = async () => {
    setLoading(true);
    try {
      setFaces([
        {
          emotion: "Happy",
          probabilities: { Happy: 0.9, Neutral: 0.07, Sad: 0.03 },
          box: null,
        },
      ]);
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };

  const handleCapture = async () => {
    if (!videoRef.current || !canvasRef.current) return;
    const context = canvasRef.current.getContext("2d");
    context.drawImage(videoRef.current, 0, 0, 320, 240);

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

        if (res.data.faces) {
          setFaces(res.data.faces);

          // Draw bounding boxes
          const ctx = canvasRef.current.getContext("2d");
          ctx.clearRect(
            0,
            0,
            canvasRef.current.width,
            canvasRef.current.height
          );
          ctx.drawImage(videoRef.current, 0, 0, 320, 240);
          ctx.strokeStyle = "red";
          ctx.lineWidth = 3;

          res.data.faces.forEach((face) => {
            const { x, y, w, h } = face.box;
            ctx.strokeRect(x, y, w, h);
          });
        } else {
          setFaces([]);
        }
      } catch (err) {
        console.error(err);
      }
      setLoading(false);
    }, "image/jpeg");
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
          <canvas ref={canvasRef} width="320" height="240" className="border" />
          <button
            onClick={handleCapture}
            className="px-5 py-2 bg-green-500 text-white rounded-lg shadow-md hover:bg-green-600 transition mt-4"
          >
            Capture & Analyze
          </button>
        </div>
      )}

      {/* Results */}
      {loading && (
        <p className="mt-6 text-gray-600 animate-pulse">Analyzing...</p>
      )}

      {faces.length > 0 && (
        <div className="mt-6 w-full max-w-md bg-gray-50 p-6 rounded-xl shadow-lg border">
          <h2 className="text-xl font-semibold text-gray-800">
            Detected Faces
          </h2>
          {faces.map((face, idx) => (
            <div key={idx} className="mt-4">
              <p className="text-lg">
                Emotion: <span className="text-blue-600">{face.emotion}</span>
              </p>
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
            </div>
          ))}
        </div>
      )}

      {faces.length === 0 && !loading && (
        <p className="mt-6 text-gray-600">No face detected.</p>
      )}
    </div>
  );
}
