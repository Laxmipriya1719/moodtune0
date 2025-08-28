'use client';

import { useState } from 'react';

export default function PlaylistSidebar({ songs, currentSong, onSongSelect }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedMood, setSelectedMood] = useState('all');

  const moods = ['all', 'happy', 'relaxed', 'energetic', 'calm', 'contemplative'];

  const filteredSongs = songs.filter(song => {
    const matchesSearch =
      song.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      song.artist.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesMood = selectedMood === 'all' || song.mood === selectedMood;
    return matchesSearch && matchesMood;
  });

  return (
    <div className="w-80 bg-black/30 backdrop-blur-sm border-r border-white/10 flex flex-col">
      {/* Header */}
      <div className="p-6 border-b border-white/10">
        <h2 className="text-xl font-semibold text-white mb-4">Your Library</h2>

        {/* Search */}
        <div className="relative mb-4">
          <div className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 flex items-center justify-center">
            <i className="ri-search-line text-white/40"></i>
          </div>
          <input
            type="text"
            placeholder="Search songs..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-white/10 border border-white/20 rounded-lg pl-10 pr-4 py-2 text-white placeholder-white/40 focus:outline-none focus:border-purple-500 text-sm"
          />
        </div>

        {/* Mood Filter */}
        <div className="flex flex-wrap gap-2">
          {moods.map((mood) => (
            <button
              key={mood}
              onClick={() => setSelectedMood(mood)}
              className={`px-3 py-1 rounded-full text-xs font-medium transition-all duration-300 whitespace-nowrap ${
                selectedMood === mood
                  ? 'bg-purple-600 text-white'
                  : 'bg-white/10 text-white/60 hover:bg-white/20 hover:text-white'
              }`}
            >
              {mood === 'all' ? 'All' : mood.charAt(0).toUpperCase() + mood.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Song List */}
      <div className="flex-1 overflow-y-auto">
        <div className="p-4">
          <div className="space-y-2">
            {filteredSongs.map((song) => (
              <div
                key={song.id}
                onClick={() => onSongSelect(song)}
                className={`flex items-center space-x-3 p-3 rounded-lg cursor-pointer transition-all duration-300 group ${
                  currentSong.id === song.id
                    ? 'bg-purple-600/20 border border-purple-500/30'
                    : 'hover:bg-white/10'
                }`}
              >
                <div className="relative">
                  <img
                    src={song.coverUrl}
                    alt={song.title}
                    className="w-12 h-12 rounded-lg object-cover"
                  />
                  {currentSong.id === song.id && (
                    <div className="absolute inset-0 bg-black/40 rounded-lg flex items-center justify-center">
                      <div className="w-4 h-4 flex items-center justify-center">
                        <i className="ri-equalizer-line text-white animate-pulse"></i>
                      </div>
                    </div>
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  <h3
                    className={`font-medium text-sm truncate ${
                      currentSong.id === song.id ? 'text-purple-300' : 'text-white'
                    }`}
                  >
                    {song.title}
                  </h3>
                  <p className="text-xs text-white/60 truncate">{song.artist}</p>
                  <div className="flex items-center space-x-2 mt-1">
                    <span
                      className={`text-xs px-2 py-0.5 rounded-full ${
                        song.mood === 'happy'
                          ? 'bg-yellow-500/20 text-yellow-300'
                          : song.mood === 'relaxed'
                          ? 'bg-blue-500/20 text-blue-300'
                          : song.mood === 'energetic'
                          ? 'bg-red-500/20 text-red-300'
                          : song.mood === 'calm'
                          ? 'bg-green-500/20 text-green-300'
                          : 'bg-purple-500/20 text-purple-300'
                      }`}
                    >
                      {song.mood}
                    </span>
                    <span className="text-xs text-white/40">{song.duration}</span>
                  </div>
                </div>

                <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                  <button className="w-8 h-8 flex items-center justify-center text-white/60 hover:text-white">
                    <i className="ri-heart-line"></i>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="p-4 border-t border-white/10 bg-black/20">
        <div className="text-center">
          <div className="text-2xl font-bold text-white mb-1">{filteredSongs.length}</div>
          <div className="text-xs text-white/60">Songs in library</div>
        </div>
      </div>
    </div>
  );
}
