import React, { useEffect, useState } from "react";

export default function LibraryPage({ spotifyTokens }) {
  const { accessToken } = spotifyTokens || {};
  const [playlists, setPlaylists] = useState([]);
  const [tracks, setTracks] = useState([]);

  useEffect(() => {
    if (!accessToken) return;

    const fetchPlaylists = async () => {
      try {
        const res = await fetch(
          "http://localhost:5000/spotify/library/playlists",
          {
            headers: { Authorization: `Bearer ${accessToken}` },
          }
        );
        const data = await res.json();
        setPlaylists(data.items || []);
      } catch (err) {
        console.error("Error fetching playlists:", err);
      }
    };

    fetchPlaylists();
  }, [accessToken]);

  const loadTracks = async (playlistId) => {
    try {
      const res = await fetch(
        `http://localhost:5000/spotify/library/playlists/${playlistId}`,
        {
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      );
      const data = await res.json();
      setTracks(data.items || []);
    } catch (err) {
      console.error("Error fetching tracks:", err);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4 text-white">Your Library</h1>

      <div className="grid grid-cols-2 gap-4">
        {playlists.map((pl) => (
          <div
            key={pl.id}
            className="bg-white rounded-lg p-4 shadow cursor-pointer"
            onClick={() => loadTracks(pl.id)}
          >
            <p className="font-semibold">{pl.name}</p>
          </div>
        ))}
      </div>

      {tracks.length > 0 && (
        <div className="mt-6 bg-gray-900 text-white p-4 rounded-lg">
          <h2 className="text-xl mb-3">Tracks</h2>
          <ul>
            {tracks.map((item) => (
              <li key={item.track.id} className="mb-2">
                {item.track.name} –{" "}
                {item.track.artists.map((a) => a.name).join(", ")}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
