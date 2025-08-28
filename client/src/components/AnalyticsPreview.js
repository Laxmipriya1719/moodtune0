import React, { useState, useEffect } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

export default function AnalyticsPreview() {
  const [moodData, setMoodData] = useState([]);
  const [genreData, setGenreData] = useState([]);
  const [topSongs, setTopSongs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAnalyticsData = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/analytics");
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setMoodData(data.moodData);
        setGenreData(data.genreData);
        setTopSongs(data.topSongs);
      } catch (err) {
        setError(err.message);
        console.error("Failed to fetch analytics data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchAnalyticsData();
  }, []);

  if (loading) {
    return <div className="text-white text-center">Loading analytics...</div>;
  }

  if (error) {
    return (
      <div className="text-red-500 text-center">
        Error loading analytics: {error}
      </div>
    );
  }

  return (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-white">Your Music Analytics</h2>
        <button className="text-blue-300 hover:text-blue-200 transition-colors text-sm whitespace-nowrap cursor-pointer">
          View Full Analytics →
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
          <h3 className="text-white font-semibold mb-4 flex items-center">
            <div className="w-5 h-5 flex items-center justify-center mr-2">
              <i className="ri-line-chart-line text-purple-400"></i>
            </div>
            Weekly Mood Trends
          </h3>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={moodData}>
              <XAxis
                dataKey="day"
                axisLine={false}
                tickLine={false}
                tick={{ fill: "#94a3b8", fontSize: 12 }}
              />
              <YAxis hide />
              <Line
                type="monotone"
                dataKey="happy"
                stroke="#8B5CF6"
                strokeWidth={3}
                dot={false}
              />
              <Line
                type="monotone"
                dataKey="calm"
                stroke="#3B82F6"
                strokeWidth={3}
                dot={false}
              />
              <Line
                type="monotone"
                dataKey="energetic"
                stroke="#10B981"
                strokeWidth={3}
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
          <div className="flex justify-center space-x-6 mt-4">
            <div className="flex items-center">
              <div className="w-3 h-3 bg-purple-500 rounded-full mr-2"></div>
              <span className="text-white/70 text-sm">Happy</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 bg-blue-500 rounded-full mr-2"></div>
              <span className="text-white/70 text-sm">Calm</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
              <span className="text-white/70 text-sm">Energetic</span>
            </div>
          </div>
        </div>

        <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
          <h3 className="text-white font-semibold mb-4 flex items-center">
            <div className="w-5 h-5 flex items-center justify-center mr-2">
              <i className="ri-pie-chart-line text-blue-400"></i>
            </div>
            Genre Distribution
          </h3>
          <div className="flex items-center">
            <ResponsiveContainer width="60%" height={160}>
              <PieChart>
                <Pie
                  data={genreData}
                  cx="50%"
                  cy="50%"
                  innerRadius={40}
                  outerRadius={70}
                  dataKey="value"
                >
                  {genreData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
            <div className="space-y-3">
              {genreData.map((genre, index) => (
                <div key={index} className="flex items-center">
                  <div
                    className="w-3 h-3 rounded-full mr-3"
                    style={{ backgroundColor: genre.color }}
                  ></div>
                  <div>
                    <p className="text-white text-sm font-medium">
                      {genre.name}
                    </p>
                    <p className="text-white/60 text-xs">{genre.value}%</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
        <h3 className="text-white font-semibold mb-4 flex items-center">
          <div className="w-5 h-5 flex items-center justify-center mr-2">
            <i className="ri-music-2-line text-green-400"></i>
          </div>
          Most Played This Week
        </h3>
        <div className="space-y-4">
          {topSongs.map((song, index) => (
            <div key={index} className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg flex items-center justify-center">
                  <i className="ri-music-line text-white"></i>
                </div>
                <div>
                  <p className="text-white font-medium">{song.title}</p>
                  <p className="text-white/60 text-sm">{song.artist}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-white/80 text-sm">{song.plays} plays</p>
                <div className="flex items-center">
                  <span className="text-xs text-purple-300 bg-purple-500/20 px-2 py-1 rounded-full">
                    {song.mood}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
