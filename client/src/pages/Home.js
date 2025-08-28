// "use client";

// import { useState, useEffect } from "react";
// // import Link from 'next/link';
// import { Link } from "react-router-dom";

// export default function Home() {
//   const [mounted, setMounted] = useState(false);
//   const [currentTime, setCurrentTime] = useState(new Date());

//   useEffect(() => {
//     setMounted(true);
//     const timer = setInterval(() => {
//       setCurrentTime(new Date());
//     }, 1000);
//     return () => clearInterval(timer);
//   }, []);

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
//       {/* Hero Section */}
//       <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
//         <div
//           className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-30"
//           style={{
//             backgroundImage: `url('https://readdy.ai/api/search-image?query=Futuristic%20music%20studio%20with%20AI%20holographic%20displays%2C%20neon%20purple%20and%20blue%20lighting%2C%20modern%20sound%20equipment%2C%20digital%20waveforms%20floating%20in%20air%2C%20sleek%20minimalist%20design%20with%20glowing%20particles&width=1920&height=1080&seq=hero-music-ai&orientation=landscape')`,
//           }}
//         />

//         <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
//           <div className="mb-8">
//             <h1 className="font-['Pacifico'] text-6xl md:text-8xl text-white mb-4 drop-shadow-lg">
//               MelodyMind
//             </h1>
//             <p className="text-xl md:text-2xl text-purple-200 mb-8 leading-relaxed">
//               AI-Powered Music Player that understands your mood and creates the
//               perfect soundtrack for your life
//             </p>
//           </div>

//           <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-12">
//             <Link
//               href="/player"
//               className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg whitespace-nowrap cursor-pointer"
//             >
//               Start Listening
//             </Link>
//             <Link
//               href="/mood-detection"
//               className="border-2 border-white text-white hover:bg-white hover:text-purple-900 px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 whitespace-nowrap cursor-pointer"
//             >
//               Try Mood Detection
//             </Link>
//           </div>

//           {/* Feature Cards */}
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
//             {/* Card 1 */}
//             <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
//               <div className="w-16 h-16 mx-auto mb-4 flex items-center justify-center">
//                 <i className="ri-brain-line text-4xl text-purple-300"></i>
//               </div>
//               <h3 className="text-xl font-semibold text-white mb-3">
//                 AI Mood Detection
//               </h3>
//               <p className="text-purple-200">
//                 Analyzes your facial expressions and mood to recommend perfect
//                 songs
//               </p>
//             </div>

//             {/* Card 2 */}
//             <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
//               <div className="w-16 h-16 mx-auto mb-4 flex items-center justify-center">
//                 <i className="ri-mic-line text-4xl text-purple-300"></i>
//               </div>
//               <h3 className="text-xl font-semibold text-white mb-3">
//                 Voice Control
//               </h3>
//               <p className="text-purple-200">
//                 Control your music hands-free with intelligent voice commands
//               </p>
//             </div>

//             {/* Card 3 */}
//             <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
//               <div className="w-16 h-16 mx-auto mb-4 flex items-center justify-center">
//                 <i className="ri-playlist-line text-4xl text-purple-300"></i>
//               </div>
//               <h3 className="text-xl font-semibold text-white mb-3">
//                 Smart Playlists
//               </h3>
//               <p className="text-purple-200">
//                 AI-generated playlists based on your preferences and listening
//                 patterns
//               </p>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Features Section */}
//       {/* ... (unchanged code continues, already JS-valid) ... */}

//       {/* The rest of the code you provided remains valid and doesn't need TypeScript conversion — it's pure JSX */}
//       {/* You can just save this entire component as `page.jsx` inside the appropriate Next.js route folder */}
//     </div>
//   );
// }
