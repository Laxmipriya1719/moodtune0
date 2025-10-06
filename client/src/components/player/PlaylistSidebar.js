export default function PlaylistSidebar({
  songs = [],
  currentSong,
  onSongSelect,
}) {
  // safety: always use fallback []
  const filteredSongs = (songs || []).filter(Boolean);

  return (
    <div className="w-64 bg-black/20 border-r border-white/10 p-4 overflow-y-auto">
      <h2 className="text-lg font-semibold text-white mb-4">Playlist</h2>
      {filteredSongs.length === 0 ? (
        <p className="text-gray-400 text-sm">No songs yet</p>
      ) : (
        <ul className="space-y-2">
          {filteredSongs.map((song) => (
            <li
              key={song.id}
              onClick={() => onSongSelect(song)}
              className={`cursor-pointer p-2 rounded ${
                currentSong?.id === song.id
                  ? "bg-purple-600 text-white"
                  : "hover:bg-white/10 text-gray-200"
              }`}
            >
              <div className="text-sm font-medium truncate">{song.title}</div>
              <div className="text-xs text-gray-400 truncate">
                {song.artist}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
