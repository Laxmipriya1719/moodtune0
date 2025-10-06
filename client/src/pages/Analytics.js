// src/pages/Analytics.js
import React, { useEffect, useState } from "react";

export default function Analytics({ spotifyTokens }) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [topArtists, setTopArtists] = useState([]);
  const [topTracks, setTopTracks] = useState([]);

  useEffect(() => {
    const fetchAnalytics = async () => {
      if (!spotifyTokens?.accessToken) {
        setError(
          "Spotify login required. Please login with Spotify to view analytics."
        );
        setLoading(false);
        return;
      }

      try {
        // Fetch top artists
        const artistsRes = await fetch(
          "https://api.spotify.com/v1/me/top/artists?limit=5",
          {
            headers: {
              Authorization: `Bearer ${spotifyTokens.accessToken}`,
            },
          }
        );
        if (!artistsRes.ok) throw new Error("Failed to fetch top artists");
        const artistsData = await artistsRes.json();
        setTopArtists(artistsData.items || []);

        // Fetch top tracks
        const tracksRes = await fetch(
          "https://api.spotify.com/v1/me/top/tracks?limit=5",
          {
            headers: {
              Authorization: `Bearer ${spotifyTokens.accessToken}`,
            },
          }
        );
        if (!tracksRes.ok) throw new Error("Failed to fetch top tracks");
        const tracksData = await tracksRes.json();
        setTopTracks(tracksData.items || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAnalytics();
  }, [spotifyTokens]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center">
        <p className="text-white text-lg">Loading analytics...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center">
        <p className="text-red-400 text-lg">{error}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 text-white p-6">
      <h1 className="text-3xl font-bold mb-6">Your Spotify Analytics</h1>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Top Artists</h2>
        {topArtists.length === 0 ? (
          <p>No data available</p>
        ) : (
          <ul className="space-y-3">
            {topArtists.map((artist) => (
              <li key={artist.id} className="flex items-center space-x-4">
                {artist.images?.[0]?.url ? (
                  <img
                    src={artist.images[0].url}
                    alt={artist.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                ) : (
                  <div className="w-12 h-12 bg-gray-700 rounded-full flex items-center justify-center">
                    <span className="text-white">{artist.name.charAt(0)}</span>
                  </div>
                )}
                <span className="text-lg">{artist.name}</span>
              </li>
            ))}
          </ul>
        )}
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Top Tracks</h2>
        {topTracks.length === 0 ? (
          <p>No data available</p>
        ) : (
          <ul className="space-y-3">
            {topTracks.map((track) => (
              <li key={track.id} className="flex items-center space-x-4">
                {track.album?.images?.[0]?.url ? (
                  <img
                    src={track.album.images[0].url}
                    alt={track.name}
                    className="w-12 h-12 rounded object-cover"
                  />
                ) : (
                  <div className="w-12 h-12 bg-gray-700 rounded flex items-center justify-center">
                    <span className="text-white">T</span>
                  </div>
                )}
                <div>
                  <p className="text-lg">{track.name}</p>
                  <p className="text-sm text-gray-300">
                    {track.artists.map((a) => a.name).join(", ")}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
