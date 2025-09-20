// // src/pages/DiscoverPage.js
// import React, { useEffect, useState } from "react";
// import Navbar from "../components/Navbar";

// export default function DiscoverPage({ spotifyTokens, user, onLogout }) {
//   const { accessToken } = spotifyTokens || {};
//   const [recommendations, setRecommendations] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     if (!accessToken) return;

//     // const fetchRecommendations = async () => {
//     //   try {
//     //     const res = await fetch(
//     //       "http://localhost:5000/spotify/recommendations",
//     //       {
//     //         headers: { Authorization: `Bearer ${accessToken}` },
//     //       }
//     //     );
//     //     const data = await res.json();
//     //     console.log("🎧 Spotify Recommendations:", data);
//     //     setRecommendations(data);
//     //   } catch (err) {
//     //     console.error("Error fetching recommendations:", err);
//     //   } finally {
//     //     setLoading(false);
//     //   }
//     // };
//     const fetchRecommendations = async () => {
//       try {
//         const res = await fetch(
//           "http://localhost:5000/spotify/recommendations",
//           {
//             headers: { Authorization: `Bearer ${accessToken}` },
//           }
//         );

//         const data = await res.json();
//         console.log("🎧 Spotify Recommendations API response:", data);

//         setRecommendations(data);
//       } catch (err) {
//         console.error("Error fetching recommendations:", err);
//         setRecommendations(null);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchRecommendations();
//   }, [accessToken]);

//   if (!accessToken) {
//     return (
//       <p className="text-white p-8">Login with Spotify to discover music.</p>
//     );
//   }

//   // if (loading) {
//   //   return <p className="text-white p-8">Loading recommendations...</p>;
//   // }

//   // if (!recommendations?.tracks) {
//   //   return (
//   //     <p className="text-white p-8">No recommendations available right now.</p>
//   //   );
//   // }
//   if (loading) {
//     return <p className="text-white p-8">Loading recommendations...</p>;
//   }

//   if (!recommendations?.tracks || recommendations.tracks.length === 0) {
//     return (
//       <p className="text-white p-8">No recommendations available right now.</p>
//     );
//   }

//   if (!recommendations) {
//     return <p className="text-white p-8">No recommendations found.</p>;
//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
//       <Navbar user={user} onLogout={onLogout} />

//       <div className="max-w-6xl mx-auto px-4 py-8 text-white">
//         <h1 className="text-3xl font-bold mb-6">Discover</h1>

//         <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
//           {recommendations.tracks.map((track) => (
//             <div
//               key={track.id}
//               className="bg-white/10 rounded-lg p-4 hover:bg-white/20 transition cursor-pointer"
//               onClick={() => window.open(track.external_urls.spotify, "_blank")}
//             >
//               <img
//                 src={track.album?.images?.[0]?.url}
//                 alt={track.name}
//                 className="w-full h-40 object-cover rounded-md mb-3"
//               />
//               <p className="font-semibold">{track.name}</p>
//               <p className="text-sm text-white/70">
//                 {track.artists.map((a) => a.name).join(", ")}
//               </p>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }
// src/pages/DiscoverPage.js
// src/pages/DiscoverPage.js
import React, { useEffect, useState } from "react";

export default function DiscoverPage({ spotifyTokens }) {
  const { accessToken } = spotifyTokens || {};
  const [recommendations, setRecommendations] = useState([]);

  useEffect(() => {
    if (!accessToken) return;

    const fetchRecommendations = async () => {
      try {
        const res = await fetch("http://localhost:5000/spotify/recommend/pop", {
          headers: { Authorization: `Bearer ${accessToken}` },
        });
        const data = await res.json();
        setRecommendations(data.tracks || []);
      } catch (err) {
        console.error("Error fetching recommendations:", err);
      }
    };

    fetchRecommendations();
  }, [accessToken]);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6 text-white">Discover</h1>
      <div className="grid grid-cols-2 gap-4">
        {recommendations.map((track) => (
          <div
            key={track.id}
            className="bg-white rounded-lg p-4 shadow flex items-center gap-3"
          >
            <img
              src={track.album?.images?.[0]?.url}
              alt={track.name}
              className="w-12 h-12 rounded"
            />
            <div>
              <p className="font-semibold">{track.name}</p>
              <p className="text-sm text-gray-500">
                {track.artists.map((a) => a.name).join(", ")}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
