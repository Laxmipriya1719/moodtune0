// "use client";

// import { useState, useRef } from "react";
// // import Link from "next/link";
// import { Link } from "react-router-dom";
// import PlayerControls from "../components/player/PlayerControls";
// import PlaylistSidebar from "../components/player/PlaylistSidebar";
// import NowPlaying from "../components/player/NowPlaying";
// import VoiceControl from "../components/player/VoiceControl";
// import MoodDetection from "./MoodDetection";

// const mockSongs = [
//   {
//     id: 1,
//     title: "Midnight Vibes",
//     artist: "Luna Eclipse",
//     album: "Nocturnal Dreams",
//     duration: "3:42",
//     mood: "relaxed",
//     genre: "ambient",
//     coverUrl:
//       "https://readdy.ai/api/search-image?query=Album%20cover%20art%20with%20midnight%20purple%20and%20blue%20colors%2C%20abstract%20wave%20patterns%2C%20dreamy%20atmosphere%2C%20modern%20minimalist%20design%20with%20glowing%20effects&width=400&height=400&seq=album-1&orientation=squarish",
//   },
//   {
//     id: 2,
//     title: "Energy Rush",
//     artist: "Beat Masters",
//     album: "Adrenaline",
//     duration: "4:15",
//     mood: "energetic",
//     genre: "electronic",
//     coverUrl:
//       "https://readdy.ai/api/search-image?query=High%20energy%20album%20cover%20with%20bright%20neon%20colors%2C%20electric%20lightning%20effects%2C%20dynamic%20geometric%20shapes%2C%20vibrant%20orange%20and%20yellow%20gradients&width=400&height=400&seq=album-2&orientation=squarish",
//   },
//   {
//     id: 3,
//     title: "Peaceful Mind",
//     artist: "Zen Harmony",
//     album: "Meditation",
//     duration: "5:23",
//     mood: "calm",
//     genre: "ambient",
//     coverUrl:
//       "https://readdy.ai/api/search-image?query=Peaceful%20zen%20album%20cover%20with%20soft%20pastel%20colors%2C%20flowing%20water%20elements%2C%20nature%20inspired%20minimal%20design%2C%20gentle%20blue%20and%20green%20tones&width=400&height=400&seq=album-3&orientation=squarish",
//   },
//   {
//     id: 4,
//     title: "Happy Days",
//     artist: "Sunshine Collective",
//     album: "Positive Vibes",
//     duration: "3:28",
//     mood: "happy",
//     genre: "pop",
//     coverUrl:
//       "https://readdy.ai/api/search-image?query=Cheerful%20album%20cover%20with%20bright%20yellow%20and%20orange%20colors%2C%20sun%20rays%2C%20happy%20uplifting%20elements%2C%20playful%20modern%20design%20with%20warm%20colors&width=400&height=400&seq=album-4&orientation=squarish",
//   },
//   {
//     id: 5,
//     title: "Deep Thoughts",
//     artist: "Introspective Soul",
//     album: "Reflection",
//     duration: "4:56",
//     mood: "contemplative",
//     genre: "indie",
//     coverUrl:
//       "https://readdy.ai/api/search-image?query=Thoughtful%20album%20cover%20with%20deep%20purple%20and%20dark%20blue%20colors%2C%20abstract%20contemplative%20imagery%2C%20minimalist%20artistic%20design%20with%20shadow%20effects&width=400&height=400&seq=album-5&orientation=squarish",
//   },
//   {
//     id: 6,
//     title: "Summer Breeze",
//     artist: "Coastal Winds",
//     album: "Seasonal Moods",
//     duration: "3:18",
//     mood: "relaxed",
//     genre: "acoustic",
//     coverUrl:
//       "https://readdy.ai/api/search-image?query=Summer%20themed%20album%20cover%20with%20light%20blue%20and%20white%20colors%2C%20beach%20and%20ocean%20elements%2C%20breezy%20coastal%20design%2C%20soft%20natural%20tones&width=400&height=400&seq=album-6&orientation=squarish",
//   },
// ];

// export default function PlayerPage() {
//   const [currentSong, setCurrentSong] = useState(mockSongs[0]);
//   const [isPlaying, setIsPlaying] = useState(false);
//   const [currentTime, setCurrentTime] = useState(0);
//   const [volume, setVolume] = useState(0.7);
//   const [isShuffled, setIsShuffled] = useState(false);
//   const [repeatMode, setRepeatMode] = useState("none"); // none, one, all
//   const [showVoiceControl, setShowVoiceControl] = useState(false);
//   const audioRef = useRef(null);

//   const currentIndex = mockSongs.findIndex(
//     (song) => song.id === currentSong.id
//   );

//   const playNext = () => {
//     if (isShuffled) {
//       const randomIndex = Math.floor(Math.random() * mockSongs.length);
//       setCurrentSong(mockSongs[randomIndex]);
//     } else {
//       const nextIndex = (currentIndex + 1) % mockSongs.length;
//       setCurrentSong(mockSongs[nextIndex]);
//     }
//   };

//   const playPrevious = () => {
//     const prevIndex =
//       currentIndex === 0 ? mockSongs.length - 1 : currentIndex - 1;
//     setCurrentSong(mockSongs[prevIndex]);
//   };

//   const selectSong = (song) => {
//     setCurrentSong(song);
//     setCurrentTime(0);
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-indigo-900">
//       {/* Header */}
//       <header className="bg-black/30 backdrop-blur-sm border-b border-white/10 px-6 py-4">
//         <div className="flex items-center justify-between">
//           <Link
//             href="/"
//             className="font-['Pacifico'] text-2xl text-white cursor-pointer"
//           >
//             MelodyMind
//           </Link>

//           <div className="flex items-center space-x-6">
//             <button
//               onClick={() => setShowVoiceControl(!showVoiceControl)}
//               className={`p-3 rounded-full transition-all duration-300 ${
//                 showVoiceControl
//                   ? "bg-purple-600 text-white"
//                   : "bg-white/10 text-purple-300 hover:bg-purple-600 hover:text-white"
//               }`}
//             >
//               <div className="w-6 h-6 flex items-center justify-center">
//                 <i className="ri-mic-line text-xl"></i>
//               </div>
//             </button>

//             <Link
//               to="/MoodDetection"
//               className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-6 py-2 rounded-full font-semibold transition-all duration-300 whitespace-nowrap cursor-pointer"
//             >
//               Mood Detection
//             </Link>

//             {/* <Link
//               href="/analytics"
//               className="text-purple-300 hover:text-white transition-colors cursor-pointer"
//             >
//               <div className="w-8 h-8 flex items-center justify-center">
//                 <i className="ri-bar-chart-line text-xl"></i>
//               </div>
//             </Link> */}
//             <Link
//               to="/analytics"
//               className="text-purple-300 hover:text-white transition-colors cursor-pointer"
//             >
//               <div className="w-8 h-8 flex items-center justify-center">
//                 <i className="ri-bar-chart-line text-xl"></i>
//               </div>
//             </Link>
//           </div>
//         </div>
//       </header>

//       <div className="flex flex-1">
//         {/* Playlist Sidebar */}
//         <PlaylistSidebar
//           songs={mockSongs}
//           currentSong={currentSong}
//           onSongSelect={selectSong}
//         />

//         {/* Main Player Area */}
//         <div className="flex-1 flex flex-col">
//           {showVoiceControl && <VoiceControl />}

//           <div className="flex-1 flex items-center justify-center p-8">
//             <NowPlaying currentSong={currentSong} />
//           </div>

//           <PlayerControls
//             currentSong={currentSong}
//             isPlaying={isPlaying}
//             setIsPlaying={setIsPlaying}
//             currentTime={currentTime}
//             setCurrentTime={setCurrentTime}
//             volume={volume}
//             setVolume={setVolume}
//             isShuffled={isShuffled}
//             setIsShuffled={setIsShuffled}
//             repeatMode={repeatMode}
//             setRepeatMode={setRepeatMode}
//             onNext={playNext}
//             onPrevious={playPrevious}
//           />
//         </div>
//       </div>

//       <audio ref={audioRef} />
//     </div>
//   );
// }
"use client";

import { useState, useRef } from "react";
import { Link } from "react-router-dom";
import PlayerControls from "../components/player/PlayerControls";
import PlaylistSidebar from "../components/player/PlaylistSidebar";
import NowPlaying from "../components/player/NowPlaying";
import VoiceControl from "../components/player/VoiceControl";

const mockSongs = [
  // ... your mockSongs unchanged

  {
    id: 1,
    title: "Midnight Vibes",
    artist: "Luna Eclipse",
    album: "Nocturnal Dreams",
    duration: "3:42",
    mood: "relaxed",
    genre: "ambient",
    coverUrl:
      "https://readdy.ai/api/search-image?query=Album%20cover%20art%20with%20midnight%20purple%20and%20blue%20colors%2C%20abstract%20wave%20patterns%2C%20dreamy%20atmosphere%2C%20modern%20minimalist%20design%20with%20glowing%20effects&width=400&height=400&seq=album-1&orientation=squarish",
  },
  {
    id: 2,
    title: "Energy Rush",
    artist: "Beat Masters",
    album: "Adrenaline",
    duration: "4:15",
    mood: "energetic",
    genre: "electronic",
    coverUrl:
      "https://readdy.ai/api/search-image?query=High%20energy%20album%20cover%20with%20bright%20neon%20colors%2C%20electric%20lightning%20effects%2C%20dynamic%20geometric%20shapes%2C%20vibrant%20orange%20and%20yellow%20gradients&width=400&height=400&seq=album-2&orientation=squarish",
  },
  {
    id: 3,
    title: "Peaceful Mind",
    artist: "Zen Harmony",
    album: "Meditation",
    duration: "5:23",
    mood: "calm",
    genre: "ambient",
    coverUrl:
      "https://readdy.ai/api/search-image?query=Peaceful%20zen%20album%20cover%20with%20soft%20pastel%20colors%2C%20flowing%20water%20elements%2C%20nature%20inspired%20minimal%20design%2C%20gentle%20blue%20and%20green%20tones&width=400&height=400&seq=album-3&orientation=squarish",
  },
  {
    id: 4,
    title: "Happy Days",
    artist: "Sunshine Collective",
    album: "Positive Vibes",
    duration: "3:28",
    mood: "happy",
    genre: "pop",
    coverUrl:
      "https://readdy.ai/api/search-image?query=Cheerful%20album%20cover%20with%20bright%20yellow%20and%20orange%20colors%2C%20sun%20rays%2C%20happy%20uplifting%20elements%2C%20playful%20modern%20design%20with%20warm%20colors&width=400&height=400&seq=album-4&orientation=squarish",
  },
  {
    id: 5,
    title: "Deep Thoughts",
    artist: "Introspective Soul",
    album: "Reflection",
    duration: "4:56",
    mood: "contemplative",
    genre: "indie",
    coverUrl:
      "https://readdy.ai/api/search-image?query=Thoughtful%20album%20cover%20with%20deep%20purple%20and%20dark%20blue%20colors%2C%20abstract%20contemplative%20imagery%2C%20minimalist%20artistic%20design%20with%20shadow%20effects&width=400&height=400&seq=album-5&orientation=squarish",
  },
  {
    id: 6,
    title: "Summer Breeze",
    artist: "Coastal Winds",
    album: "Seasonal Moods",
    duration: "3:18",
    mood: "relaxed",
    genre: "acoustic",
    coverUrl:
      "https://readdy.ai/api/search-image?query=Summer%20themed%20album%20cover%20with%20light%20blue%20and%20white%20colors%2C%20beach%20and%20ocean%20elements%2C%20breezy%20coastal%20design%2C%20soft%20natural%20tones&width=400&height=400&seq=album-6&orientation=squarish",
  },
];

export default function Player() {
  const [currentSong, setCurrentSong] = useState(mockSongs[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [volume, setVolume] = useState(0.7);
  const [isShuffled, setIsShuffled] = useState(false);
  const [repeatMode, setRepeatMode] = useState("none");
  const [showVoiceControl, setShowVoiceControl] = useState(false);
  const audioRef = useRef(null);

  const currentIndex = mockSongs.findIndex(
    (song) => song.id === currentSong.id
  );

  const playNext = () => {
    if (isShuffled) {
      const randomIndex = Math.floor(Math.random() * mockSongs.length);
      setCurrentSong(mockSongs[randomIndex]);
    } else {
      const nextIndex = (currentIndex + 1) % mockSongs.length;
      setCurrentSong(mockSongs[nextIndex]);
    }
  };

  const playPrevious = () => {
    const prevIndex =
      currentIndex === 0 ? mockSongs.length - 1 : currentIndex - 1;
    setCurrentSong(mockSongs[prevIndex]);
  };

  const selectSong = (song) => {
    setCurrentSong(song);
    setCurrentTime(0);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-indigo-900">
      {/* Header */}
      <header className="bg-black/30 backdrop-blur-sm border-b border-white/10 px-6 py-4">
        <div className="flex items-center justify-between">
          <Link
            to="/"
            className="font-['Pacifico'] text-2xl text-white cursor-pointer"
          >
            MelodyMind
          </Link>

          <div className="flex items-center space-x-6">
            <button
              onClick={() => setShowVoiceControl(!showVoiceControl)}
              className={`p-3 rounded-full transition-all duration-300 ${
                showVoiceControl
                  ? "bg-purple-600 text-white"
                  : "bg-white/10 text-purple-300 hover:bg-purple-600 hover:text-white"
              }`}
            >
              <div className="w-6 h-6 flex items-center justify-center">
                <i className="ri-mic-line text-xl"></i>
              </div>
            </button>

            {/* ✅ Fixed: use lowercase route */}
            <Link
              to="/MoodDetection"
              className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-6 py-2 rounded-full font-semibold transition-all duration-300 whitespace-nowrap cursor-pointer"
            >
              Mood Detection
            </Link>

            <Link
              to="/Analytics"
              className="text-purple-300 hover:text-white transition-colors cursor-pointer"
            >
              <div className="w-8 h-8 flex items-center justify-center">
                <i className="ri-bar-chart-line text-xl"></i>
              </div>
            </Link>
          </div>
        </div>
      </header>

      <div className="flex flex-1">
        {/* Playlist Sidebar */}
        <PlaylistSidebar
          songs={mockSongs}
          currentSong={currentSong}
          onSongSelect={selectSong}
        />

        {/* Main Player Area */}
        <div className="flex-1 flex flex-col">
          {showVoiceControl && <VoiceControl />}

          <div className="flex-1 flex items-center justify-center p-8">
            <NowPlaying currentSong={currentSong} />
          </div>

          <PlayerControls
            currentSong={currentSong}
            isPlaying={isPlaying}
            setIsPlaying={setIsPlaying}
            currentTime={currentTime}
            setCurrentTime={setCurrentTime}
            volume={volume}
            setVolume={setVolume}
            isShuffled={isShuffled}
            setIsShuffled={setIsShuffled}
            repeatMode={repeatMode}
            setRepeatMode={setRepeatMode}
            onNext={playNext}
            onPrevious={playPrevious}
          />
        </div>
      </div>

      <audio ref={audioRef} />
    </div>
  );
}
