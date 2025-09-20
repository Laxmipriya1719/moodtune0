// // // "use client";

// // // import {
// // //   BarChart,
// // //   Bar,
// // //   XAxis,
// // //   YAxis,
// // //   CartesianGrid,
// // //   Tooltip,
// // //   ResponsiveContainer,
// // // } from "recharts";

// // // const mockData = {
// // //   week: [
// // //     { name: "6AM", minutes: 15 },
// // //     { name: "9AM", minutes: 45 },
// // //     { name: "12PM", minutes: 25 },
// // //     { name: "3PM", minutes: 35 },
// // //     { name: "6PM", minutes: 55 },
// // //     { name: "9PM", minutes: 65 },
// // //     { name: "12AM", minutes: 30 },
// // //   ],
// // //   month: [
// // //     { name: "Morning", minutes: 180 },
// // //     { name: "Afternoon", minutes: 220 },
// // //     { name: "Evening", minutes: 350 },
// // //     { name: "Night", minutes: 150 },
// // //   ],
// // //   year: [
// // //     { name: "Q1", minutes: 2800 },
// // //     { name: "Q2", minutes: 3200 },
// // //     { name: "Q3", minutes: 2900 },
// // //     { name: "Q4", minutes: 3100 },
// // //   ],
// // // };

// // // export default function Analytics({ timeRange }) {
// // //   const data = mockData[timeRange];

// // //   const CustomTooltip = ({ active, payload, label }) => {
// // //     if (active && payload && payload.length) {
// // //       return (
// // //         <div className="bg-black/80 backdrop-blur-sm border border-white/20 rounded-lg p-3">
// // //           <p className="text-white font-medium">{label}</p>
// // //           <p className="text-purple-300 text-sm">
// // //             {payload[0].value} minutes listened
// // //           </p>
// // //         </div>
// // //       );
// // //     }
// // //     return null;
// // //   };

// // //   return (
// // //     <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
// // //       <div className="flex items-center justify-between mb-6">
// // //         <h3 className="text-xl font-semibold text-white">Listening Patterns</h3>
// // //         <div className="w-6 h-6 flex items-center justify-center">
// // //           <i className="ri-bar-chart-2-line text-purple-400"></i>
// // //         </div>
// // //       </div>

// // //       <div style={{ width: "100%", height: "250px" }}>
// // //         <ResponsiveContainer>
// // //           <BarChart
// // //             data={data}
// // //             margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
// // //           >
// // //             <defs>
// // //               <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
// // //                 <stop offset="5%" stopColor="#8b5cf6" stopOpacity={1} />
// // //                 <stop offset="95%" stopColor="#ec4899" stopOpacity={1} />
// // //               </linearGradient>
// // //             </defs>
// // //             <CartesianGrid
// // //               strokeDasharray="3 3"
// // //               stroke="rgba(255,255,255,0.1)"
// // //             />
// // //             <XAxis
// // //               dataKey="name"
// // //               axisLine={false}
// // //               tickLine={false}
// // //               tick={{ fill: "#c4b5fd", fontSize: 12 }}
// // //             />
// // //             <YAxis
// // //               axisLine={false}
// // //               tickLine={false}
// // //               tick={{ fill: "#c4b5fd", fontSize: 12 }}
// // //             />
// // //             <Tooltip content={<CustomTooltip />} />
// // //             <Bar
// // //               dataKey="minutes"
// // //               fill="url(#barGradient)"
// // //               radius={[4, 4, 0, 0]}
// // //             />
// // //           </BarChart>
// // //         </ResponsiveContainer>
// // //       </div>
// // //     </div>
// // //   );
// // // }
// // "use client";

// // import {
// //   BarChart,
// //   Bar,
// //   XAxis,
// //   YAxis,
// //   CartesianGrid,
// //   Tooltip,
// //   ResponsiveContainer,
// // } from "recharts";
// // import { motion } from "framer-motion";

// // const mockData = {
// //   week: [
// //     { name: "6AM", minutes: 15 },
// //     { name: "9AM", minutes: 45 },
// //     { name: "12PM", minutes: 25 },
// //     { name: "3PM", minutes: 35 },
// //     { name: "6PM", minutes: 55 },
// //     { name: "9PM", minutes: 65 },
// //     { name: "12AM", minutes: 30 },
// //   ],
// //   month: [
// //     { name: "Morning", minutes: 180 },
// //     { name: "Afternoon", minutes: 220 },
// //     { name: "Evening", minutes: 350 },
// //     { name: "Night", minutes: 150 },
// //   ],
// //   year: [
// //     { name: "Q1", minutes: 2800 },
// //     { name: "Q2", minutes: 3200 },
// //     { name: "Q3", minutes: 2900 },
// //     { name: "Q4", minutes: 3100 },
// //   ],
// // };

// // export default function Analytics({ timeRange }) {
// //   const data = mockData[timeRange] || [];

// //   const CustomTooltip = ({ active, payload, label }) => {
// //     if (active && payload && payload.length) {
// //       return (
// //         <div className="bg-black/80 backdrop-blur-md border border-purple-500/30 rounded-lg p-3 shadow-lg">
// //           <p className="text-white font-semibold">{label}</p>
// //           <p className="text-pink-300 text-sm">
// //             🎧 {payload[0].value} minutes listened
// //           </p>
// //         </div>
// //       );
// //     }
// //     return null;
// //   };

// //   const titleMap = {
// //     week: "This Week",
// //     month: "This Month",
// //     year: "This Year",
// //   };

// //   return (
// //     <motion.div
// //       initial={{ opacity: 0, y: 20 }}
// //       animate={{ opacity: 1, y: 0 }}
// //       transition={{ duration: 0.6 }}
// //       className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 shadow-lg"
// //     >
// //       <div className="flex items-center justify-between mb-6">
// //         <div>
// //           <h3 className="text-xl font-semibold text-white">
// //             Listening Patterns
// //           </h3>
// //           <p className="text-sm text-purple-300">
// //             {titleMap[timeRange] || "Overview"}
// //           </p>
// //         </div>
// //         <div className="w-8 h-8 flex items-center justify-center bg-purple-500/20 rounded-full">
// //           <i className="ri-bar-chart-2-line text-purple-400 text-lg"></i>
// //         </div>
// //       </div>

// //       {data.length > 0 ? (
// //         <div style={{ width: "100%", height: "250px" }}>
// //           <ResponsiveContainer>
// //             <BarChart
// //               data={data}
// //               margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
// //             >
// //               <defs>
// //                 <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
// //                   <stop offset="5%" stopColor="#a855f7" stopOpacity={1} />
// //                   <stop offset="95%" stopColor="#ec4899" stopOpacity={1} />
// //                 </linearGradient>
// //               </defs>
// //               <CartesianGrid
// //                 strokeDasharray="3 3"
// //                 stroke="rgba(255,255,255,0.05)"
// //               />
// //               <XAxis
// //                 dataKey="name"
// //                 axisLine={false}
// //                 tickLine={false}
// //                 tick={{ fill: "#c4b5fd", fontSize: 12 }}
// //               />
// //               <YAxis
// //                 axisLine={false}
// //                 tickLine={false}
// //                 tick={{ fill: "#c4b5fd", fontSize: 12 }}
// //               />
// //               <Tooltip content={<CustomTooltip />} />
// //               <Bar
// //                 dataKey="minutes"
// //                 fill="url(#barGradient)"
// //                 radius={[6, 6, 0, 0]}
// //                 animationDuration={1200}
// //               />
// //             </BarChart>
// //           </ResponsiveContainer>
// //         </div>
// //       ) : (
// //         <div className="text-center py-12 text-purple-300 text-sm">
// //           No listening data available 📉
// //         </div>
// //       )}
// //     </motion.div>
// //   );
// // }
// // src/pages/Analytics.js
// import React from "react";
// import useSpotifyApi from "../hooks/useSpotifyApi";

// export default function Analytics({ spotifyTokens }) {
//   const { accessToken } = spotifyTokens || {};
//   const topArtists = useSpotifyApi(accessToken, "me/top/artists?limit=5");
//   const topTracks = useSpotifyApi(accessToken, "me/top/tracks?limit=5");

//   if (!accessToken) {
//     return <p className="text-white">Login with Spotify to see analytics.</p>;
//   }

//   if (topArtists.loading || topTracks.loading) {
//     return <p className="text-white">Loading your Spotify stats...</p>;
//   }

//   return (
//     <div className="p-8 text-white">
//       <h1 className="text-3xl font-bold mb-6">Your Spotify Analytics</h1>

//       {/* Top Artists */}
//       <h2 className="text-xl mb-2">Top Artists</h2>
//       <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
//         {topArtists.data?.items.map((artist) => (
//           <div
//             key={artist.id}
//             className="bg-white/10 p-4 rounded-lg text-center"
//           >
//             <img
//               src={artist.images?.[0]?.url}
//               alt={artist.name}
//               className="w-24 h-24 mx-auto rounded-full mb-2 object-cover"
//             />
//             <p className="font-semibold">{artist.name}</p>
//           </div>
//         ))}
//       </div>

//       {/* Top Tracks */}
//       <h2 className="text-xl mb-2">Top Tracks</h2>
//       <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//         {topTracks.data?.items.map((track) => (
//           <div
//             key={track.id}
//             className="bg-white/10 p-4 rounded-lg flex items-center space-x-4"
//           >
//             <img
//               src={track.album.images?.[0]?.url}
//               alt={track.name}
//               className="w-16 h-16 rounded-md object-cover"
//             />
//             <div>
//               <p className="font-semibold">{track.name}</p>
//               <p className="text-sm text-white/70">
//                 {track.artists.map((a) => a.name).join(", ")}
//               </p>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }
// src/pages/AnalyticsPage.js
import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";

export default function AnalyticsPage({ spotifyTokens, user, onLogout }) {
  const { accessToken } = spotifyTokens || {};
  const [topTracks, setTopTracks] = useState([]);
  const [topArtists, setTopArtists] = useState([]);
  const [genres, setGenres] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!accessToken) return;

    const fetchData = async () => {
      try {
        // ✅ Top Tracks
        const tracksRes = await fetch(
          "http://localhost:5000/spotify/analytics/top-tracks",
          { headers: { Authorization: `Bearer ${accessToken}` } }
        );
        const tracksData = await tracksRes.json();
        setTopTracks(tracksData || []);

        // ✅ Top Artists
        const artistsRes = await fetch(
          "http://localhost:5000/spotify/analytics/top-artists",
          { headers: { Authorization: `Bearer ${accessToken}` } }
        );
        const artistsData = await artistsRes.json();
        setTopArtists(artistsData || []);

        // ✅ Top Genres
        const genresRes = await fetch(
          "http://localhost:5000/spotify/analytics/genres",
          { headers: { Authorization: `Bearer ${accessToken}` } }
        );
        const genresData = await genresRes.json();
        setGenres(genresData || []);
      } catch (err) {
        console.error("Error fetching analytics:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [accessToken]);

  if (!accessToken) {
    return (
      <p className="text-white p-8">Login with Spotify to view analytics.</p>
    );
  }

  if (loading) {
    return <p className="text-white p-8">Loading analytics...</p>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
      <Navbar user={user} onLogout={onLogout} />

      <div className="max-w-6xl mx-auto px-4 py-8 text-white">
        <h1 className="text-3xl font-bold mb-6">Your Music Analytics</h1>

        {/* ✅ Top Tracks */}
        <h2 className="text-xl mb-4">Top Tracks</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
          {topTracks.map((track) => (
            <div
              key={track.id}
              className="bg-white/10 rounded-lg p-4 hover:bg-white/20 transition"
            >
              <img
                src={track.album?.images?.[0]?.url}
                alt={track.name}
                className="w-full h-40 object-cover rounded-md mb-3"
              />
              <p className="font-semibold">{track.name}</p>
              <p className="text-sm text-white/70">
                {track.artists.map((a) => a.name).join(", ")}
              </p>
            </div>
          ))}
        </div>

        {/* ✅ Top Artists */}
        <h2 className="text-xl mb-4">Top Artists</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-10">
          {topArtists.map((artist) => (
            <div
              key={artist.id}
              className="bg-white/10 rounded-lg p-4 hover:bg-white/20 transition"
            >
              <img
                src={artist.images?.[0]?.url}
                alt={artist.name}
                className="w-full h-40 object-cover rounded-md mb-3"
              />
              <p className="font-semibold">{artist.name}</p>
              <p className="text-sm text-white/70">{artist.genres?.[0]}</p>
            </div>
          ))}
        </div>

        {/* ✅ Top Genres */}
        <h2 className="text-xl mb-4">Your Top Genres</h2>
        <ul className="list-disc pl-6">
          {genres.map((genre, idx) => (
            <li key={idx} className="text-white/80">
              {genre}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
