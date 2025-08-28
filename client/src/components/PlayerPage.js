// "use client";

// import { useState, useRef } from "react";
// import { Link } from "react-router-dom";
// import PlayerControls from "./player/PlayerControls";
// import PlaylistSidebar from "./player/PlaylistSidebar";
// import NowPlaying from "./player/NowPlaying";
// import VoiceControl from "./player/VoiceControl";

// const mockSongs = [
//   // 🎵 your songs list...
// ];

// export default function PlayerPage() {
//   const [currentSong, setCurrentSong] = useState(mockSongs[0]);
//   const [isPlaying, setIsPlaying] = useState(false);
//   const [currentTime, setCurrentTime] = useState(0);
//   const [volume, setVolume] = useState(0.7);
//   const [isShuffled, setIsShuffled] = useState(false);
//   const [repeatMode, setRepeatMode] = useState("none");
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
//             to="/"
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
//               to="/mood-detection"
//               className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-6 py-2 rounded-full font-semibold transition-all duration-300 whitespace-nowrap cursor-pointer"
//             >
//               Mood Detection
//             </Link>

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
