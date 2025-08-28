'use client';

import { useState } from 'react';

export default function MoodInsights() {
  const [selectedPeriod, setSelectedPeriod] = useState('today');

  const moodData = {
    today: {
      primary: 'relaxed',
      percentage: 65,
      sessions: 8,
      avgDuration: '12m',
      trend: 'up'
    },
    week: {
      primary: 'happy',
      percentage: 45,
      sessions: 42,
      avgDuration: '18m',
      trend: 'stable'
    },
    month: {
      primary: 'contemplative',
      percentage: 38,
      sessions: 156,
      avgDuration: '22m',
      trend: 'down'
    }
  };

  const currentData = moodData[selectedPeriod];

  const getMoodColor = (mood) => {
    switch (mood) {
      case 'happy': return 'from-yellow-500 to-orange-500';
      case 'relaxed': return 'from-blue-500 to-cyan-500';
      case 'energetic': return 'from-red-500 to-pink-500';
      case 'calm': return 'from-green-500 to-emerald-500';
      case 'contemplative': return 'from-purple-500 to-indigo-500';
      default: return 'from-gray-500 to-gray-600';
    }
  };

  const getMoodIcon = (mood) => {
    switch (mood) {
      case 'happy': return 'ri-emotion-happy-line';
      case 'relaxed': return 'ri-leaf-line';
      case 'energetic': return 'ri-flashlight-line';
      case 'calm': return 'ri-water-line';
      case 'contemplative': return 'ri-brain-line';
      default: return 'ri-emotion-line';
    }
  };

  const getTrendIcon = (trend) => {
    switch (trend) {
      case 'up': return { icon: 'ri-arrow-up-line', color: 'text-green-400' };
      case 'down': return { icon: 'ri-arrow-down-line', color: 'text-red-400' };
      default: return { icon: 'ri-subtract-line', color: 'text-yellow-400' };
    }
  };

  const trendInfo = getTrendIcon(currentData.trend);

  return (
    <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-semibold text-white">Mood Insights</h3>
        <div className="w-6 h-6 flex items-center justify-center">
          <i className="ri-emotion-line text-purple-400"></i>
        </div>
      </div>

      {/* Period Selector */}
      <div className="flex space-x-1 bg-white/5 rounded-lg p-1 mb-6">
        {['today', 'week', 'month'].map((period) => (
          <button
            key={period}
            onClick={() => setSelectedPeriod(period)}
            className={`flex-1 py-2 px-3 rounded-md text-sm font-medium transition-all duration-300 whitespace-nowrap ${
              selectedPeriod === period
                ? 'bg-purple-600 text-white'
                : 'text-purple-200 hover:text-white hover:bg-white/10'
            }`}
          >
            {period.charAt(0).toUpperCase() + period.slice(1)}
          </button>
        ))}
      </div>

      {/* Primary Mood */}
      <div className="text-center mb-6">
        <div className={`w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-r ${getMoodColor(currentData.primary)} flex items-center justify-center`}>
          <i className={`${getMoodIcon(currentData.primary)} text-3xl text-white`}></i>
        </div>
        <h4 className="text-2xl font-bold text-white mb-2 capitalize">{currentData.primary}</h4>
        <div className="text-sm text-purple-200 mb-2">Primary mood for {selectedPeriod}</div>

        {/* Percentage Circle */}
        <div className="relative w-16 h-16 mx-auto mb-4">
          <svg className="w-16 h-16 transform -rotate-90" viewBox="0 0 64 64">
            <circle
              cx="32"
              cy="32"
              r="28"
              fill="none"
              stroke="rgba(255,255,255,0.1)"
              strokeWidth="6"
            />
            <circle
              cx="32"
              cy="32"
              r="28"
              fill="none"
              stroke="url(#gradient)"
              strokeWidth="6"
              strokeLinecap="round"
              strokeDasharray={`${(currentData.percentage / 100) * 176} 176`}
            />
            <defs>
              <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#8b5cf6" />
                <stop offset="100%" stopColor="#ec4899" />
              </linearGradient>
            </defs>
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-sm font-bold text-white">{currentData.percentage}%</span>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="space-y-4">
        <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 flex items-center justify-center">
              <i className="ri-play-list-line text-purple-400"></i>
            </div>
            <span className="text-purple-200 text-sm">Sessions</span>
          </div>
          <span className="text-white font-semibold">{currentData.sessions}</span>
        </div>

        <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 flex items-center justify-center">
              <i className="ri-timer-line text-purple-400"></i>
            </div>
            <span className="text-purple-200 text-sm">Avg Duration</span>
          </div>
          <span className="text-white font-semibold">{currentData.avgDuration}</span>
        </div>

        <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 flex items-center justify-center">
              <i className={`${trendInfo.icon} ${trendInfo.color}`}></i>
            </div>
            <span className="text-purple-200 text-sm">Trend</span>
          </div>
          <span className={`font-semibold capitalize ${trendInfo.color}`}>
            {currentData.trend}
          </span>
        </div>
      </div>

      {/* Mood Tips */}
      <div className="mt-6 p-4 bg-gradient-to-r from-purple-600/20 to-pink-600/20 rounded-lg border border-purple-500/30">
        <h5 className="text-sm font-semibold text-white mb-2">AI Suggestion</h5>
        <p className="text-xs text-purple-200">
          {currentData.primary === 'relaxed' && "Your relaxed mood suggests you're finding balance. Try some ambient tracks for deeper relaxation."}
          {currentData.primary === 'happy' && "Your positive energy is showing! Consider upbeat genres to maintain this wonderful mood."}
          {currentData.primary === 'contemplative' && "Deep thinking time! Instrumental and indie tracks complement your reflective state."}
          {currentData.primary === 'energetic' && "High energy detected! Electronic and upbeat music will fuel your momentum."}
          {currentData.primary === 'calm' && "Your peaceful state is ideal for meditation music and nature sounds."}
        </p>
      </div>
    </div>
  );
}
