// "use client";

// import { useState, useRef, useEffect } from "react";
// // import Link from "next/link";
// // import { Link } from "react-router-dom";

// export default function MoodDetection() {
//   const [isAnalyzing, setIsAnalyzing] = useState(false);
//   const [detectedMood, setDetectedMood] = useState("");
//   const [confidence, setConfidence] = useState(0);
//   const [cameraActive, setCameraActive] = useState(false);
//   const [textMood, setTextMood] = useState("");
//   const [analysisMode, setAnalysisMode] = useState("camera"); // 'camera' or 'text'
//   const videoRef = useRef(null); // <-- JavaScript-friendly now

//   const mockAnalyze = () => {
//     setIsAnalyzing(true);

//     setTimeout(() => {
//       const moods = ["happy", "relaxed", "energetic", "calm", "contemplative"];
//       const randomMood = moods[Math.floor(Math.random() * moods.length)];
//       const randomConfidence = Math.floor(Math.random() * 30) + 70; // 70-100%

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

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
//       {/* All your JSX stays the same... */}
//       {/* I’ve left the component body unchanged, since it was already JS-friendly */}
//       {/* Feel free to paste the remaining JSX code from your original component here – no change needed! */}
//       <p>hi</p>
//     </div>
//   );
// }
"use client";

import { useState, useRef } from "react";

export default function MoodDetection() {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [detectedMood, setDetectedMood] = useState("");
  const [confidence, setConfidence] = useState(0);
  const [cameraActive, setCameraActive] = useState(false);
  const [textMood, setTextMood] = useState("");
  const [analysisMode, setAnalysisMode] = useState("camera"); // 'camera' or 'text'
  const videoRef = useRef(null);

  // ---------------- MOCK ANALYSIS ----------------
  const mockAnalyze = () => {
    setIsAnalyzing(true);

    setTimeout(() => {
      const moods = ["happy", "relaxed", "energetic", "calm", "contemplative"];
      const randomMood = moods[Math.floor(Math.random() * moods.length)];
      const randomConfidence = Math.floor(Math.random() * 30) + 70; // 70–100%

      setDetectedMood(randomMood);
      setConfidence(randomConfidence);
      setIsAnalyzing(false);
    }, 3000);
  };

  const startCamera = async () => {
    try {
      setCameraActive(true);
      // Mock camera activation
      setTimeout(() => {
        mockAnalyze();
      }, 1000);
    } catch (error) {
      console.error("Camera access denied");
      setCameraActive(false);
    }
  };

  const analyzeText = () => {
    if (!textMood.trim()) return;
    setIsAnalyzing(true);

    setTimeout(() => {
      let mood = "contemplative";
      let conf = 85;

      const text = textMood.toLowerCase();
      if (
        text.includes("happy") ||
        text.includes("joy") ||
        text.includes("excited")
      ) {
        mood = "happy";
        conf = 92;
      } else if (
        text.includes("sad") ||
        text.includes("tired") ||
        text.includes("stressed")
      ) {
        mood = "calm";
        conf = 88;
      } else if (
        text.includes("energy") ||
        text.includes("workout") ||
        text.includes("motivated")
      ) {
        mood = "energetic";
        conf = 90;
      } else if (
        text.includes("relax") ||
        text.includes("chill") ||
        text.includes("peaceful")
      ) {
        mood = "relaxed";
        conf = 87;
      }

      setDetectedMood(mood);
      setConfidence(conf);
      setIsAnalyzing(false);
    }, 2000);
  };

  // ---------------- STYLE HELPERS ----------------
  const getMoodColor = (mood) => {
    switch (mood) {
      case "happy":
        return "from-yellow-500 to-orange-500";
      case "relaxed":
        return "from-blue-500 to-cyan-500";
      case "energetic":
        return "from-red-500 to-pink-500";
      case "calm":
        return "from-green-500 to-emerald-500";
      case "contemplative":
        return "from-purple-500 to-indigo-500";
      default:
        return "from-gray-500 to-gray-600";
    }
  };

  const getRecommendedSongs = (mood) => {
    const recommendations = {
      happy: [
        "Happy Days - Sunshine Collective",
        "Bright Morning - Joy Wave",
        "Celebration Time - Party People",
      ],
      relaxed: [
        "Midnight Vibes - Luna Eclipse",
        "Summer Breeze - Coastal Winds",
        "Gentle Flow - River Sounds",
      ],
      energetic: [
        "Energy Rush - Beat Masters",
        "Power Up - Electric Storm",
        "Adrenaline - High Voltage",
      ],
      calm: [
        "Peaceful Mind - Zen Harmony",
        "Quiet Moments - Serenity",
        "Meditation Flow - Inner Peace",
      ],
      contemplative: [
        "Deep Thoughts - Introspective Soul",
        "Reflection - Mindful Music",
        "Inner Journey - Soul Search",
      ],
    };
    return recommendations[mood] || [];
  };

  // ---------------- UI ----------------
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 text-white flex flex-col items-center justify-center p-6">
      <h1 className="text-4xl font-bold mb-6">🎶 Mood Detection</h1>

      {/* Mode Switch */}
      <div className="flex gap-4 mb-6">
        <button
          onClick={() => setAnalysisMode("camera")}
          className={`px-6 py-2 rounded-lg ${
            analysisMode === "camera" ? "bg-blue-600" : "bg-white/20"
          }`}
        >
          Camera Mode
        </button>
        <button
          onClick={() => setAnalysisMode("text")}
          className={`px-6 py-2 rounded-lg ${
            analysisMode === "text" ? "bg-blue-600" : "bg-white/20"
          }`}
        >
          Text Mode
        </button>
      </div>

      {/* CAMERA MODE */}
      {analysisMode === "camera" && (
        <div className="flex flex-col items-center space-y-4">
          {!cameraActive ? (
            <button
              onClick={startCamera}
              className="bg-green-500 px-6 py-3 rounded-xl font-semibold hover:bg-green-600"
            >
              🎥 Start Camera & Detect Mood
            </button>
          ) : (
            <div className="w-64 h-40 bg-black flex items-center justify-center rounded-lg">
              <p className="text-gray-400">[Mock Camera Feed]</p>
            </div>
          )}
        </div>
      )}

      {/* TEXT MODE */}
      {analysisMode === "text" && (
        <div className="flex flex-col items-center space-y-4 w-full max-w-md">
          <input
            type="text"
            placeholder="Type how you feel..."
            className="w-full px-4 py-2 rounded-lg text-black"
            value={textMood}
            onChange={(e) => setTextMood(e.target.value)}
          />
          <button
            onClick={analyzeText}
            className="bg-purple-500 px-6 py-3 rounded-xl font-semibold hover:bg-purple-600"
          >
            ✍️ Analyze Mood
          </button>
        </div>
      )}

      {/* RESULTS */}
      {isAnalyzing && (
        <p className="mt-6 text-lg animate-pulse">Analyzing your mood...</p>
      )}

      {!isAnalyzing && detectedMood && (
        <div
          className={`mt-8 p-6 rounded-xl bg-gradient-to-r ${getMoodColor(
            detectedMood
          )} shadow-xl w-full max-w-lg`}
        >
          <h2 className="text-2xl font-bold capitalize">
            Mood: {detectedMood} 🎧
          </h2>
          <p className="text-white/90">Confidence: {confidence}%</p>

          <h3 className="mt-4 text-xl font-semibold">✨ Song Picks for You:</h3>
          <ul className="list-disc list-inside mt-2 space-y-1">
            {getRecommendedSongs(detectedMood).map((song, idx) => (
              <li key={idx}>{song}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
