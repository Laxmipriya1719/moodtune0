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
// Player.js
// "use client";

// import { useState, useRef, useEffect } from "react";
// import { Link, useLocation } from "react-router-dom";
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
//   const location = useLocation();
//   const incomingTrack = location.state?.track || null;

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

//   // 🚀 Add playlist dynamically (from MoodDetection → navigate("/player", {state:{track}}))
//   useEffect(() => {
//     if (!incomingTrack) return;

//     // Normalized track object
//     const normalizedSong = {
//       id: incomingTrack.id || `spotify-${Date.now()}`,
//       title: incomingTrack.name || incomingTrack.title,
//       artist: incomingTrack.artists
//         ? incomingTrack.artists.map((a) => a.name).join(", ")
//         : incomingTrack.artist || "Unknown Artist",
//       album:
//         incomingTrack.album?.name || incomingTrack.album || "Unknown Album",
//       duration: incomingTrack.duration_ms
//         ? `${Math.floor(incomingTrack.duration_ms / 60000)}:${Math.floor(
//             (incomingTrack.duration_ms % 60000) / 1000
//           )
//             .toString()
//             .padStart(2, "0")}`
//         : incomingTrack.duration || "N/A",
//       mood: incomingTrack.mood || "Detected",
//       genre: incomingTrack.genre || "Unknown",
//       coverUrl: incomingTrack.album?.images?.[0]?.url || incomingTrack.coverUrl,
//       url: incomingTrack.url || null, // full song (downloaded)
//       preview_url: incomingTrack.preview_url || null, // fallback 30s
//     };

//     setSongs((prev) => [...prev, normalizedSong]);
//     setCurrentSong(normalizedSong);
//     setIsPlaying(true);
//   }, [incomingTrack]);

//   // 🔊 Auto-play when song changes
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
//       {/* ✅ Top Bar stays */}
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
//         {/* Sidebar */}
//         <PlaylistSidebar
//           songs={songs}
//           currentSong={currentSong}
//           onSongSelect={selectSong}
//         />

//         {/* Main Player */}
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

//       {/* 🎵 Audio element */}
//       <audio
//         ref={audioRef}
//         src={currentSong.url || currentSong.preview_url || ""}
//       />
//     </div>
//   );
// }
"use client";

import { useState, useRef, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import PlayerControls from "../components/player/PlayerControls";
import PlaylistSidebar from "../components/player/PlaylistSidebar";
import NowPlaying from "../components/player/NowPlaying";
import VoiceControl from "../components/player/VoiceControl";
import YouTube from "react-youtube";

const initialSongs = JSON.parse(
  localStorage.getItem("melodymindSongs") || "[]"
);

export default function Player() {
  const location = useLocation();
  const incomingTrack = location.state?.track || null;

  const [songs, setSongs] = useState(initialSongs);
  const [currentSong, setCurrentSong] = useState(initialSongs[0] || null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.7);
  const [isShuffled, setIsShuffled] = useState(false);
  const [repeatMode, setRepeatMode] = useState("none"); // none | one | all
  const [showVoiceControl, setShowVoiceControl] = useState(false);

  const audioRef = useRef(null);

  const currentIndex = songs.findIndex((s) => s.id === currentSong?.id);

  // --- Handle Next / Previous
  const playNext = () => {
    if (songs.length === 0) return;
    if (isShuffled) {
      const randomIndex = Math.floor(Math.random() * songs.length);
      setCurrentSong(songs[randomIndex]);
    } else {
      const nextIndex = (currentIndex + 1) % songs.length;
      setCurrentSong(songs[nextIndex]);
    }
    setCurrentTime(0);
  };
  const handleFileUpload = (event) => {
    const files = Array.from(event.target.files);
    const newSongs = files.map((file, idx) => ({
      id: `local-${idx}`,
      title: file.name,
      artist: "Local File",
      album: "Device",
      url: URL.createObjectURL(file),
    }));
    setSongs((prev) => [...prev, ...newSongs]);
  };

  const playPrevious = () => {
    if (songs.length === 0) return;
    const prevIndex = currentIndex === 0 ? songs.length - 1 : currentIndex - 1;
    setCurrentSong(songs[prevIndex]);
    setCurrentTime(0);
  };

  const selectSong = async (song) => {
    // Stop tracking current song before changing
    await stopTrackingCurrentSong();

    setCurrentSong(song);
    setIsPlaying(true);
    setCurrentTime(0);
  };
  const stopTrackingCurrentSong = async () => {
    // If you have any tracking intervals or timers, clear them here
    // For now, this is a placeholder that does nothing but prevents the error
    return Promise.resolve();
  };
  // --- Add new track from MoodDetection
  useEffect(() => {
    if (!incomingTrack) return;

    const normalized = {
      id: incomingTrack.id || `spotify-${Date.now()}`,
      title: incomingTrack.name || incomingTrack.title,
      artist: incomingTrack.artists
        ? incomingTrack.artists.map((a) => a.name).join(", ")
        : incomingTrack.artist || "Unknown Artist",
      album:
        incomingTrack.album?.name || incomingTrack.album || "Unknown Album",
      duration: incomingTrack.duration_ms
        ? Math.floor(incomingTrack.duration_ms / 1000)
        : 0,
      coverUrl: incomingTrack.album?.images?.[0]?.url || incomingTrack.coverUrl,
      url: incomingTrack.url || null, // full song if downloaded
      preview_url: incomingTrack.preview_url || null,
    };

    setSongs((prev) => {
      const updated = [...prev, normalized];
      localStorage.setItem("melodymindSongs", JSON.stringify(updated));
      return updated;
    });
    setCurrentSong(normalized);
    setIsPlaying(true);
  }, [incomingTrack]);
  useEffect(() => {
    window.addMoodPlaylist = async (playlist) => {
      if (!playlist) return;

      const accessToken = localStorage.getItem("spotifyAccessToken");

      const newSongs = await Promise.all(
        playlist.tracks.items.map(async (item, idx) => {
          const track = item.track || item;
          if (!track) return null;

          // Step 1: build query
          const query = `${track.name} ${track.artists[0]?.name}`;

          try {
            // Step 2: search YouTube (via your backend or free API)
            const res = await fetch(
              `http://localhost:5000/youtube/search?query=${encodeURIComponent(
                query
              )}`
            );
            const data = await res.json();

            if (!data.videoId) return null;

            return {
              id: `yt-${track.id}-${idx}`,
              title: track.name,
              artist: track.artists.map((a) => a.name).join(", "),
              album: playlist.name,
              mood: playlist.name,
              youtubeId: data.videoId, // 🎥 store YouTube video id
              source: "youtube",
            };
          } catch (err) {
            console.error("YT search failed", err);
            return null;
          }
        })
      );

      const filtered = newSongs.filter(Boolean);
      if (filtered.length > 0) {
        setSongs((prev) => [...prev, ...filtered]);
        alert(
          `Playlist "${playlist.name}" added with ${filtered.length} playable songs (YouTube)!`
        );
      } else {
        alert(`No playable tracks for "${playlist.name}"`);
      }
    };

    return () => {
      delete window.addMoodPlaylist;
    };
  }, []);

  // --- Audio Player Events
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleTimeUpdate = () => setCurrentTime(audio.currentTime);
    const handleLoaded = () => setDuration(audio.duration || 0);
    const handleEnded = () => {
      if (repeatMode === "one") {
        audio.currentTime = 0;
        audio.play();
      } else if (repeatMode === "all") {
        playNext();
      } else {
        setIsPlaying(false);
      }
    };

    audio.addEventListener("timeupdate", handleTimeUpdate);
    audio.addEventListener("loadedmetadata", handleLoaded);
    audio.addEventListener("ended", handleEnded);

    return () => {
      audio.removeEventListener("timeupdate", handleTimeUpdate);
      audio.removeEventListener("loadedmetadata", handleLoaded);
      audio.removeEventListener("ended", handleEnded);
    };
  }, [currentSong, repeatMode]);

  // --- Sync play/pause
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.play().catch((err) => console.error("Playback failed:", err));
    } else {
      audio.pause();
    }
  }, [isPlaying, currentSong]);

  // --- Volume control
  useEffect(() => {
    if (audioRef.current) audioRef.current.volume = volume;
  }, [volume]);

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
        {/* Sidebar */}
        <PlaylistSidebar
          songs={songs}
          currentSong={currentSong}
          onSongSelect={selectSong}
        />

        {/* Main Player */}
        <div className="flex-1 flex flex-col">
          {showVoiceControl && <VoiceControl />}

          <div className="flex-1 flex items-center justify-center p-8">
            {currentSong ? (
              <NowPlaying currentSong={currentSong} />
            ) : (
              <p className="text-gray-300">No song selected</p>
            )}
          </div>

          <PlayerControls
            currentSong={currentSong}
            isPlaying={isPlaying}
            setIsPlaying={setIsPlaying}
            currentTime={currentTime}
            setCurrentTime={setCurrentTime}
            duration={duration}
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
      <input
        type="file"
        multiple
        accept="audio/*"
        onChange={handleFileUpload}
      />

      {/* Audio element */}
      {/* 🎵 If track from YouTube → use YouTube player */}
      {/* Audio / YouTube element */}
      {currentSong ? (
        currentSong.source === "youtube" && currentSong.youtubeId ? (
          <YouTube
            videoId={currentSong.youtubeId}
            opts={{
              width: "0",
              height: "0",
              playerVars: { autoplay: isPlaying ? 1 : 0 },
            }}
            onEnd={playNext}
          />
        ) : currentSong.url || currentSong.preview_url ? (
          <audio
            ref={audioRef}
            src={currentSong.url || currentSong.preview_url}
            autoPlay={isPlaying}
            onEnded={playNext}
          />
        ) : (
          <p className="text-gray-300">No playable track available</p>
        )
      ) : (
        <p className="text-gray-300">No song selected</p>
      )}
    </div>
  );
}
