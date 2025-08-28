'use client';

import { useState } from 'react';

export default function TopTracks({ timeRange }) {
  const [sortBy, setSortBy] = useState('plays');

   const mockTracks = {
    week: [
      {
        id: 1,
        title: "Midnight Vibes",
        artist: "Luna Eclipse",
        plays: 23,
        duration: "1h 32m",
        mood: "relaxed",
        coverUrl: "https://readdy.ai/api/search-image?query=Album%20cover%20art%20with%20midnight%20purple%20and%20blue%20colors%2C%20abstract%20wave%20patterns%2C%20dreamy%20atmosphere%2C%20modern%20minimalist%20design%20with%20glowing%20effects&width=60&height=60&seq=top-1&orientation=squarish"
      },
      {
        id: 2,
        title: "Energy Rush",
        artist: "Beat Masters",
        plays: 18,
        duration: "1h 16m",
        mood: "energetic",
        coverUrl: "https://readdy.ai/api/search-image?query=High%20energy%20album%20cover%20with%20bright%20neon%20colors%2C%20electric%20lightning%20effects%2C%20dynamic%20geometric%20shapes%2C%20vibrant%20orange%20and%20yellow%20gradients&width=60&height=60&seq=top-2&orientation=squarish"
      },
      {
        id: 3,
        title: "Peaceful Mind",
        artist: "Zen Harmony",
        plays: 15,
        duration: "1h 21m",
        mood: "calm",
        coverUrl: "https://readdy.ai/api/search-image?query=Peaceful%20zen%20album%20cover%20with%20soft%20pastel%20colors%2C%20flowing%20water%20elements%2C%20nature%20inspired%20minimal%20design%2C%20gentle%20blue%20and%20green%20tones&width=60&height=60&seq=top-3&orientation=squarish"
      },
      {
        id: 4,
        title: "Happy Days",
        artist: "Sunshine Collective",
        plays: 14,
        duration: "49m",
        mood: "happy",
        coverUrl: "https://readdy.ai/api/search-image?query=Cheerful%20album%20cover%20with%20bright%20yellow%20and%20orange%20colors%2C%20sun%20rays%2C%20happy%20uplifting%20elements%2C%20playful%20modern%20design%20with%20warm%20colors&width=60&height=60&seq=top-4&orientation=squarish"
      },
      {
        id: 5,
        title: "Deep Thoughts",
        artist: "Introspective Soul",
        plays: 12,
        duration: "59m",
        mood: "contemplative",
        coverUrl: "https://readdy.ai/api/search-image?query=Thoughtful%20album%20cover%20with%20deep%20purple%20and%20dark%20blue%20colors%2C%20abstract%20contemplative%20imagery%2C%20minimalist%20artistic%20design%20with%20shadow%20effects&width=60&height=60&seq=top-5&orientation=squarish"
      }
    ],
    month: [
      {
        id: 1,
        title: "Summer Breeze",
        artist: "Coastal Winds",
        plays: 67,
        duration: "4h 32m",
        mood: "relaxed",
        coverUrl: "https://readdy.ai/api/search-image?query=Summer%20themed%20album%20cover%20with%20light%20blue%20and%20white%20colors%2C%20beach%20and%20ocean%20elements%2C%20breezy%20coastal%20design%2C%20soft%20natural%20tones&width=60&height=60&seq=top-6&orientation=squarish"
      },
      {
        id: 2,
        title: "Midnight Vibes",
        artist: "Luna Eclipse",
        plays: 89,
        duration: "6h 12m",
        mood: "relaxed",
        coverUrl: "https://readdy.ai/api/search-image?query=Album%20cover%20art%20with%20midnight%20purple%20and%20blue%20colors%2C%20abstract%20wave%20patterns%2C%20dreamy%20atmosphere%2C%20modern%20minimalist%20design%20with%20glowing%20effects&width=60&height=60&seq=top-1&orientation=squarish"
      },
      {
        id: 3,
        title: "Energy Rush",
        artist: "Beat Masters",
        plays: 54,
        duration: "3h 48m",
        mood: "energetic",
        coverUrl: "https://readdy.ai/api/search-image?query=High%20energy%20album%20cover%20with%20bright%20neon%20colors%2C%20electric%20lightning%20effects%2C%20dynamic%20geometric%20shapes%2C%20vibrant%20orange%20and%20yellow%20gradients&width=60&height=60&seq=top-2&orientation=squarish"
      },
      {
        id: 4,
        title: "Morning Coffee",
        artist: "Café Sessions",
        plays: 45,
        duration: "3h 15m",
        mood: "calm",
        coverUrl: "https://readdy.ai/api/search-image?query=Coffee%20themed%20album%20cover%20with%20warm%20brown%20and%20cream%20colors%2C%20cozy%20caf%C3%A9%20atmosphere%2C%20steam%20and%20coffee%20beans%2C%20comfortable%20morning%20vibes&width=60&height=60&seq=top-7&orientation=squarish"
      },
      {
        id: 5,
        title: "Workout Beats",
        artist: "Fitness Collective",
        plays: 41,
        duration: "2h 47m",
        mood: "energetic",
        coverUrl: "https://readdy.ai/api/search-image?query=Fitness%20album%20cover%20with%20bold%20red%20and%20black%20colors%2C%20dynamic%20motion%20graphics%2C%20strength%20and%20energy%20themes%2C%20modern%20athletic%20design&width=60&height=60&seq=top-8&orientation=squarish"
      }
    ],
    year: [
      {
        id: 1,
        title: "Midnight Vibes",
        artist: "Luna Eclipse",
        plays: 342,
        duration: "23h 8m",
        mood: "relaxed",
        coverUrl: "https://readdy.ai/api/search-image?query=Album%20cover%20art%20with%20midnight%20purple%20and%20blue%20colors%2C%20abstract%20wave%20patterns%2C%20dreamy%20atmosphere%2C%20modern%20minimalist%20design%20with%20glowing%20effects&width=60&height=60&seq=top-1&orientation=squarish"
      },
      {
        id: 2,
        title: "Focus Flow",
        artist: "Productivity Pro",
        plays: 298,
        duration: "19h 52m",
        mood: "contemplative",
        coverUrl: "https://readdy.ai/api/search-image?query=Minimalist%20focus%20album%20cover%20with%20clean%20lines%2C%20soft%20gray%20and%20blue%20tones%2C%20geometric%20patterns%2C%20professional%20and%20calming%20design%20for%20concentration&width=60&height=60&seq=top-9&orientation=squarish"
      },
      {
        id: 3,
        title: "Summer Breeze",
        artist: "Coastal Winds",
        plays: 276,
        duration: "18h 21m",
        mood: "relaxed",
        coverUrl: "https://readdy.ai/api/search-image?query=Summer%20themed%20album%20cover%20with%20light%20blue%20and%20white%20colors%2C%20beach%20and%20ocean%20elements%2C%20breezy%20coastal%20design%2C%20soft%20natural%20tones&width=60&height=60&seq=top-6&orientation=squarish"
      },
      {
        id: 4,
        title: "Energy Rush",
        artist: "Beat Masters",
        plays: 234,
        duration: "16h 34m",
        mood: "energetic",
        coverUrl: "https://readdy.ai/api/search-image?query=High%20energy%20album%20cover%20with%20bright%20neon%20colors%2C%20electric%20lightning%20effects%2C%20dynamic%20geometric%20shapes%2C%20vibrant%20orange%20and%20yellow%20gradients&width=60&height=60&seq=top-2&orientation=squarish"
      },
      {
        id: 5,
        title: "Night Drive",
        artist: "Synth Wave",
        plays: 189,
        duration: "12h 47m",
        mood: "contemplative",
        coverUrl: "https://readdy.ai/api/search-image?query=Synthwave%20album%20cover%20with%20neon%20pink%20and%20purple%20colors%2C%20retro%2080s%20aesthetic%2C%20city%20lights%20and%20highways%2C%20nostalgic%20electronic%20music%20vibes&width=60&height=60&seq=top-10&orientation=squarish"
      }
    ]
  };

  const tracks = mockTracks[timeRange];

  const getMoodColor = (mood) => {
    switch (mood) {
      case 'happy': return 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30';
      case 'relaxed': return 'bg-blue-500/20 text-blue-300 border-blue-500/30';
      case 'energetic': return 'bg-red-500/20 text-red-300 border-red-500/30';
      case 'calm': return 'bg-green-500/20 text-green-300 border-green-500/30';
      case 'contemplative': return 'bg-purple-500/20 text-purple-300 border-purple-500/30';
      default: return 'bg-gray-500/20 text-gray-300 border-gray-500/30';
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Top Tracks</h2>
        <div className="space-x-2">
          <button onClick={() => setSortBy('plays')} className={`px-3 py-1 rounded-full border ${sortBy === 'plays' ? 'bg-white text-black' : 'bg-gray-800 text-white'}`}>Plays</button>
          <button onClick={() => setSortBy('duration')} className={`px-3 py-1 rounded-full border ${sortBy === 'duration' ? 'bg-white text-black' : 'bg-gray-800 text-white'}`}>Duration</button>
          <button onClick={() => setSortBy('recent')} className={`px-3 py-1 rounded-full border ${sortBy === 'recent' ? 'bg-white text-black' : 'bg-gray-800 text-white'}`}>Recent</button>
        </div>
      </div>

      <ul className="space-y-2">
        {tracks.map((track, index) => (
          <li key={track.id} className="flex items-center space-x-4 p-4 bg-gray-900 rounded-lg border border-gray-800">
            <img src={track.coverUrl} alt={track.title} className="w-14 h-14 rounded-md object-cover" />
            <div className="flex-1">
              <div className="flex justify-between">
                <div>
                  <h3 className="text-md font-semibold">{track.title}</h3>
                  <p className="text-sm text-gray-400">{track.artist}</p>
                </div>
                <span className={`px-2 py-1 text-xs rounded-full border ${getMoodColor(track.mood)}`}>
                  {track.mood}
                </span>
              </div>
              <div className="flex justify-between mt-2 text-sm text-gray-400">
                <span>{track.plays} plays</span>
                <span>{track.duration}</span>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
