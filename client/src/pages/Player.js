// "use client";

// import { useState, useRef, useEffect } from "react";
// import { Link } from "react-router-dom";
// import PlayerControls from "../components/player/PlayerControls";
// import PlaylistSidebar from "../components/player/PlaylistSidebar";
// import NowPlaying from "../components/player/NowPlaying";
// import VoiceControl from "../components/player/VoiceControl";

// const initialSongs = [
//   {
//     id: 1,
//     title: "Midnight Vibes",
//     artist: "Luna Eclipse",
//     album: "Nocturnal Dreams",
//     duration: "3:42",
//     mood: "relaxed",
//     genre: "ambient",
//     coverUrl:
//       "https://readdy.ai/api/search-image?query=album-1&width=400&height=400",
//     preview_url:
//       "https://p.scdn.co/mp3-preview/3e2a44d5a17a90572aaea2f8d9ec5eae5fdf9e28?cid=dummy", // demo preview
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
//       "https://readdy.ai/api/search-image?query=album-2&width=400&height=400",
//     preview_url:
//       "https://p.scdn.co/mp3-preview/6ccad64dc8415e6011a5ad3d7304f8a4a2d3f896?cid=dummy",
//   },
// ];

// export default function Player() {
//   const [songs, setSongs] = useState(initialSongs);
//   const [currentSong, setCurrentSong] = useState(initialSongs[0]);
//   const [isPlaying, setIsPlaying] = useState(false);
//   const [currentTime, setCurrentTime] = useState(0);
//   const [volume, setVolume] = useState(0.7);
//   const [isShuffled, setIsShuffled] = useState(false);
//   const [repeatMode, setRepeatMode] = useState("none");
//   const [showVoiceControl, setShowVoiceControl] = useState(false);

//   const audioRef = useRef(null);

//   const currentIndex = songs.findIndex((song) => song.id === currentSong.id);

//   const playNext = () => {
//     if (isShuffled) {
//       const randomIndex = Math.floor(Math.random() * songs.length);
//       setCurrentSong(songs[randomIndex]);
//     } else {
//       const nextIndex = (currentIndex + 1) % songs.length;
//       setCurrentSong(songs[nextIndex]);
//     }
//     setCurrentTime(0);
//   };

//   const playPrevious = () => {
//     const prevIndex = currentIndex === 0 ? songs.length - 1 : currentIndex - 1;
//     setCurrentSong(songs[prevIndex]);
//     setCurrentTime(0);
//   };

//   const selectSong = (song) => {
//     setCurrentSong(song);
//     setCurrentTime(0);
//   };

//   // Add playlist dynamically (from MoodDetection etc.)
//   useEffect(() => {
//     window.addMoodPlaylist = (playlist) => {
//       if (!playlist) return;
//       const newSongs = playlist.tracks?.items
//         ?.map((item, idx) => {
//           const track = item.track || item; // support both API formats

//           // If full url (downloaded song) exists, prefer it
//           const songUrl = track.url || track.preview_url;
//           if (!songUrl) return null;

//           return {
//             id: `spotify-${track.id}-${idx}`,
//             title: track.name,
//             artist: track.artists.map((a) => a.name).join(", "),
//             album: playlist.name || track.album?.name || "Unknown Album",
//             duration: track.duration_ms
//               ? `${Math.floor(track.duration_ms / 60000)}:${Math.floor(
//                   (track.duration_ms % 60000) / 1000
//                 )
//                   .toString()
//                   .padStart(2, "0")}`
//               : "N/A",
//             mood: playlist.name,
//             genre: "Unknown",
//             coverUrl: track.album?.images?.[0]?.url || "",
//             url: track.url, // full song (downloaded)
//             preview_url: track.preview_url, // fallback 30s
//           };
//         })
//         .filter(Boolean);

//       if (newSongs.length > 0) {
//         setSongs((prev) => [...prev, ...newSongs]);
//         alert(
//           `Playlist "${playlist.name}" added with ${newSongs.length} songs!`
//         );
//       } else {
//         alert(
//           `Sorry, no playable songs available for playlist "${playlist.name}"`
//         );
//       }
//     };

//     return () => {
//       delete window.addMoodPlaylist;
//     };
//   }, []);

//   // Auto-play when song changes
//   useEffect(() => {
//     if (audioRef.current) {
//       audioRef.current.pause();
//       audioRef.current.load();
//       if (isPlaying && (currentSong.url || currentSong.preview_url)) {
//         audioRef.current
//           .play()
//           .catch((err) => console.error("Playback failed:", err));
//       }
//     }
//   }, [currentSong, isPlaying]);

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-indigo-900">
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
//               to="/MoodDetection"
//               className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-6 py-2 rounded-full font-semibold transition-all duration-300 whitespace-nowrap cursor-pointer"
//             >
//               Mood Detection
//             </Link>
//           </div>
//         </div>
//       </header>

//       <div className="flex flex-1">
//         <PlaylistSidebar
//           songs={songs}
//           currentSong={currentSong}
//           onSongSelect={selectSong}
//         />

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

//       {/* 🎵 Audio element now prefers full song url */}
//       <audio
//         ref={audioRef}
//         src={currentSong.url || currentSong.preview_url || ""}
//       />
//     </div>
//   );
// }



// "use client";

// import { useState, useRef, useEffect } from "react";
// import { Link } from "react-router-dom";
// import PlayerControls from "../components/player/PlayerControls";
// import PlaylistSidebar from "../components/player/PlaylistSidebar";
// import NowPlaying from "../components/player/NowPlaying";
// import VoiceControl from "../components/player/VoiceControl";
// import { db, auth } from "../firebaseConfig";
// import { collection, addDoc, serverTimestamp } from "firebase/firestore";

// const initialSongs = [
//   {
//     id: 1,
//     title: "Midnight Vibes",
//     artist: "Luna Eclipse",
//     album: "Nocturnal Dreams",
//     duration: 222, // 3:42 in seconds
//     mood: "relaxed",
//     genre: "ambient",
//     coverUrl:
//       "https://readdy.ai/api/search-image?query=album-1&width=400&height=400",
//     preview_url:
//       "https://p.scdn.co/mp3-preview/3e2a44d5a17a90572aaea2f8d9ec5eae5fdf9e28?cid=dummy",
//   },
//   {
//     id: 2,
//     title: "Energy Rush",
//     artist: "Beat Masters",
//     album: "Adrenaline",
//     duration: 255, // 4:15 in seconds
//     mood: "energetic",
//     genre: "electronic",
//     coverUrl:
//       "https://readdy.ai/api/search-image?query=album-2&width=400&height=400",
//     preview_url:
//       "https://p.scdn.co/mp3-preview/6ccad64dc8415e6011a5ad3d7304f8a4a2d3f896?cid=dummy",
//   },
// ];

// export default function Player() {
//   const [songs, setSongs] = useState(initialSongs);
//   const [currentSong, setCurrentSong] = useState(initialSongs[0]);
//   const [isPlaying, setIsPlaying] = useState(false);
//   const [currentTime, setCurrentTime] = useState(0);
//   const [volume, setVolume] = useState(0.7);
//   const [isShuffled, setIsShuffled] = useState(false);
//   const [repeatMode, setRepeatMode] = useState("none");
//   const [showVoiceControl, setShowVoiceControl] = useState(false);

//   const audioRef = useRef(null);
//   const currentIndex = songs.findIndex((song) => song.id === currentSong.id);

//   // 🔥 Firestore logger
//   const logEvent = async (action) => {
//     try {
//       const user = auth.currentUser;
//       if (!user) return;

//       await addDoc(collection(db, "analytics"), {
//         userId: user.uid,
//         songTitle: currentSong.title,
//         songId: currentSong.id,
//         action,
//         duration: currentSong.duration,
//         moodDuringListening: currentSong.mood,
//         playedAt: serverTimestamp(),
//       });
//     } catch (err) {
//       console.error("Error logging analytics:", err);
//     }
//   };

//   const playNext = () => {
//     const nextIndex = isShuffled
//       ? Math.floor(Math.random() * songs.length)
//       : (currentIndex + 1) % songs.length;
//     setCurrentSong(songs[nextIndex]);
//     setCurrentTime(0);
//     logEvent("skip-next");
//   };

//   const playPrevious = () => {
//     const prevIndex = currentIndex === 0 ? songs.length - 1 : currentIndex - 1;
//     setCurrentSong(songs[prevIndex]);
//     setCurrentTime(0);
//     logEvent("skip-previous");
//   };

//   const selectSong = (song) => {
//     setCurrentSong(song);
//     setCurrentTime(0);
//     logEvent("song-select");
//   };

//   // Auto-play when song changes
//   useEffect(() => {
//     if (audioRef.current) {
//       audioRef.current.pause();
//       audioRef.current.load();
//       if (isPlaying && (currentSong.url || currentSong.preview_url)) {
//         audioRef.current
//           .play()
//           .then(() => logEvent("play"))
//           .catch((err) => console.error("Playback failed:", err));
//       }
//     }
//   }, [currentSong, isPlaying]);

//   // Log pause events
//   useEffect(() => {
//     if (!isPlaying) {
//       logEvent("pause");
//     }
//   }, [isPlaying]);

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-indigo-900">
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
//               to="/MoodDetection"
//               className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-6 py-2 rounded-full font-semibold transition-all duration-300 whitespace-nowrap cursor-pointer"
//             >
//               Mood Detection
//             </Link>
//           </div>
//         </div>
//       </header>

//       <div className="flex flex-1">
//         <PlaylistSidebar
//           songs={songs}
//           currentSong={currentSong}
//           onSongSelect={selectSong}
//         />

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

//       <audio
//         ref={audioRef}
//         src={currentSong.url || currentSong.preview_url || ""}
//       />
//     </div>
//   );
// }






"use client";

import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import PlayerControls from "../components/player/PlayerControls";
import PlaylistSidebar from "../components/player/PlaylistSidebar";
import NowPlaying from "../components/player/NowPlaying";
import VoiceControl from "../components/player/VoiceControl";
import useAnalyticsTracker from "../hooks/useAnalyticsTracker";

const initialSongs = [
  {
    id: 1,
    title: "Midnight Vibes",
    artist: "Luna Eclipse",
    album: "Nocturnal Dreams",
    duration: 222,
    mood: "relaxed",
    genre: "Ambient",
    coverUrl:
      "https://readdy.ai/api/search-image?query=album-1&width=400&height=400",
    preview_url:
      "https://p.scdn.co/mp3-preview/3e2a44d5a17a90572aaea2f8d9ec5eae5fdf9e28?cid=dummy",
  },
  {
    id: 2,
    title: "Energy Rush",
    artist: "Beat Masters",
    album: "Adrenaline",
    duration: 255,
    mood: "energetic",
    genre: "Electronic",
    coverUrl:
      "https://readdy.ai/api/search-image?query=album-2&width=400&height=400",
    preview_url:
      "https://p.scdn.co/mp3-preview/6ccad64dc8415e6011a5ad3d7304f8a4a2d3f896?cid=dummy",
  },
];

export default function Player() {
  const [songs, setSongs] = useState(initialSongs);
  const [currentSong, setCurrentSong] = useState(initialSongs[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [volume, setVolume] = useState(0.7);
  const [isShuffled, setIsShuffled] = useState(false);
  const [repeatMode, setRepeatMode] = useState("none");
  const [showVoiceControl, setShowVoiceControl] = useState(false);

  const audioRef = useRef(null);
  const currentIndex = songs.findIndex((song) => song.id === currentSong.id);

  // Use the analytics tracker hook
  const { trackSongPlay, stopTrackingCurrentSong, trackMoodChange } = useAnalyticsTracker();

  const playNext = async () => {
    // Stop tracking current song before changing
    await stopTrackingCurrentSong();
    
    const nextIndex = isShuffled
      ? Math.floor(Math.random() * songs.length)
      : (currentIndex + 1) % songs.length;
    setCurrentSong(songs[nextIndex]);
    setCurrentTime(0);
  };

  const playPrevious = async () => {
    // Stop tracking current song before changing
    await stopTrackingCurrentSong();
    
    const prevIndex = currentIndex === 0 ? songs.length - 1 : currentIndex - 1;
    setCurrentSong(songs[prevIndex]);
    setCurrentTime(0);
  };

  const selectSong = async (song) => {
    // Stop tracking current song before changing
    await stopTrackingCurrentSong();
    
    setCurrentSong(song);
    setCurrentTime(0);
  };

  // Track when song starts playing
  useEffect(() => {
    if (isPlaying && currentSong) {
      trackSongPlay({
        title: currentSong.title,
        artist: currentSong.artist,
        genre: currentSong.genre,
        album: currentSong.album,
        mood: currentSong.mood,
      });
      console.log('🎵 Started tracking:', currentSong.title);
    }
  }, [currentSong, isPlaying]);

  // Stop tracking when playback stops
  useEffect(() => {
    if (!isPlaying) {
      stopTrackingCurrentSong();
    }
  }, [isPlaying]);

  // Auto-play when song changes
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.load();
      if (isPlaying && (currentSong.url || currentSong.preview_url)) {
        audioRef.current
          .play()
          .catch((err) => console.error("Playback failed:", err));
      }
    }
  }, [currentSong]);

  // Cleanup on unmount - save any currently playing song
  useEffect(() => {
    return () => {
      stopTrackingCurrentSong();
    };
  }, []);

  // Update audio time
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateTime = () => setCurrentTime(audio.currentTime);
    audio.addEventListener('timeupdate', updateTime);
    
    return () => audio.removeEventListener('timeupdate', updateTime);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-indigo-900">
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

            <Link
              to="/MoodDetection"
              className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-6 py-2 rounded-full font-semibold transition-all duration-300 whitespace-nowrap cursor-pointer"
            >
              Mood Detection
            </Link>
          </div>
        </div>
      </header>

      <div className="flex flex-1">
        <PlaylistSidebar
          songs={songs}
          currentSong={currentSong}
          onSongSelect={selectSong}
        />

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

      <audio
        ref={audioRef}
        src={currentSong.url || currentSong.preview_url || ""}
      />
    </div>
  );
}