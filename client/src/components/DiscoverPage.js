import React, { useEffect, useState } from "react";

export default function DiscoverPage({ spotifyTokens }) {
  const [tracks, setTracks] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!spotifyTokens?.accessToken) {
      setError(
        "Spotify login required. Please login with Spotify to view Discover tracks."
      );
      setLoading(false);
      return;
    }

    const fetchTracks = async () => {
      try {
        const response = await fetch(
          "https://api.spotify.com/v1/browse/featured-playlists",
          {
            headers: { Authorization: `Bearer ${spotifyTokens.accessToken}` },
          }
        );
        if (!response.ok) throw new Error("Failed to fetch Discover tracks");
        const data = await response.json();
        setTracks(data.playlists.items || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTracks();
  }, [spotifyTokens]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 text-white">
        Loading Discover tracks...
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 text-white text-center p-4">
        {error}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 text-white p-6">
      <h2 className="text-3xl font-bold mb-6">Discover</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {tracks.map((playlist) => (
          <div
            key={playlist.id}
            className="bg-gray-900 p-4 rounded-lg shadow-md"
          >
            {playlist.images?.[0]?.url ? (
              <img
                src={playlist.images[0].url}
                alt={playlist.name}
                className="w-full h-48 object-cover rounded-md mb-3"
              />
            ) : (
              <div className="w-full h-48 bg-gray-700 rounded-md mb-3 flex items-center justify-center">
                No Image
              </div>
            )}
            <h3 className="text-lg font-semibold">{playlist.name}</h3>
            <p className="text-gray-300 text-sm">{playlist.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
