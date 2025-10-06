// LibraryPage.js
import React, { useEffect, useState } from "react";

export default function LibraryPage({ spotifyTokens }) {
  const [playlists, setPlaylists] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPlaylists = async () => {
      if (!spotifyTokens?.accessToken) {
        setError("Spotify login required. Please login to view your Library.");
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(
          "https://api.spotify.com/v1/me/playlists?limit=12",
          {
            headers: {
              Authorization: `Bearer ${spotifyTokens.accessToken}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch playlists.");
        }

        const data = await response.json();
        setPlaylists(data.items || []);
      } catch (err) {
        console.error(err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPlaylists();
  }, [spotifyTokens]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 text-white">
        <p>Loading your playlists...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 text-white">
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="p-6 min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
      <h1 className="text-3xl font-bold text-white mb-6">Your Library</h1>
      {playlists.length === 0 ? (
        <p className="text-gray-300">No playlists found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {playlists.map((playlist) => (
            <div
              key={playlist.id}
              className="bg-gray-800 rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-shadow cursor-pointer"
            >
              <img
                src={
                  playlist.images?.[0]?.url ||
                  "https://via.placeholder.com/300x300?text=No+Image"
                }
                alt={playlist.name || "Playlist"}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h2 className="text-white font-semibold text-lg">
                  {playlist.name || "Unnamed Playlist"}
                </h2>
                <p className="text-gray-400 text-sm">
                  {playlist.tracks?.total ?? 0} tracks
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
