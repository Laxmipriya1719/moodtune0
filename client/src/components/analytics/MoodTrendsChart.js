'use client';

import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip
} from 'recharts';

const mockData = {
  week: [
    { name: 'Mon', happy: 20, relaxed: 45, energetic: 15, calm: 35, contemplative: 25 },
    { name: 'Tue', happy: 35, relaxed: 30, energetic: 40, calm: 20, contemplative: 15 },
    { name: 'Wed', happy: 25, relaxed: 55, energetic: 10, calm: 40, contemplative: 30 },
    { name: 'Thu', happy: 40, relaxed: 25, energetic: 35, calm: 15, contemplative: 20 },
    { name: 'Fri', happy: 50, relaxed: 20, energetic: 45, calm: 10, contemplative: 15 },
    { name: 'Sat', happy: 45, relaxed: 40, energetic: 30, calm: 35, contemplative: 25 },
    { name: 'Sun', happy: 30, relaxed: 50, energetic: 15, calm: 45, contemplative: 35 }
  ],
  month: [
    { name: 'Week 1', happy: 32, relaxed: 38, energetic: 25, calm: 30, contemplative: 22 },
    { name: 'Week 2', happy: 28, relaxed: 42, energetic: 20, calm: 35, contemplative: 25 },
    { name: 'Week 3', happy: 35, relaxed: 35, energetic: 30, calm: 25, contemplative: 20 },
    { name: 'Week 4', happy: 40, relaxed: 30, energetic: 35, calm: 20, contemplative: 18 }
  ],
  year: [
    { name: 'Jan', happy: 25, relaxed: 40, energetic: 20, calm: 35, contemplative: 30 },
    { name: 'Feb', happy: 30, relaxed: 35, energetic: 25, calm: 30, contemplative: 25 },
    { name: 'Mar', happy: 35, relaxed: 30, energetic: 30, calm: 25, contemplative: 20 },
    { name: 'Apr', happy: 40, relaxed: 25, energetic: 35, calm: 20, contemplative: 18 },
    { name: 'May', happy: 45, relaxed: 30, energetic: 40, calm: 15, contemplative: 15 },
    { name: 'Jun', happy: 50, relaxed: 35, energetic: 45, calm: 20, contemplative: 12 }
  ]
};

export default function MoodTrendsChart({ timeRange }) {
  const data = mockData[timeRange];

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-black/80 backdrop-blur-sm border border-white/20 rounded-lg p-3">
          <p className="text-white font-medium mb-2">{label}</p>
          {payload.map((entry, index) => (
            <p key={index} className="text-sm" style={{ color: entry.color }}>
              {entry.dataKey}: {entry.value} minutes
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-semibold text-white">Mood Listening Trends</h3>
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
            <span className="text-xs text-purple-200">Happy</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-blue-400 rounded-full"></div>
            <span className="text-xs text-purple-200">Relaxed</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-red-400 rounded-full"></div>
            <span className="text-xs text-purple-200">Energetic</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-green-400 rounded-full"></div>
            <span className="text-xs text-purple-200">Calm</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-purple-400 rounded-full"></div>
            <span className="text-xs text-purple-200">Contemplative</span>
          </div>
        </div>
      </div>

      <div style={{ width: '100%', height: '300px' }}>
        <ResponsiveContainer>
          <AreaChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <defs>
              <linearGradient id="happy" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#fbbf24" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#fbbf24" stopOpacity={0.1} />
              </linearGradient>
              <linearGradient id="relaxed" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#60a5fa" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#60a5fa" stopOpacity={0.1} />
              </linearGradient>
              <linearGradient id="energetic" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#f87171" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#f87171" stopOpacity={0.1} />
              </linearGradient>
              <linearGradient id="calm" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#4ade80" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#4ade80" stopOpacity={0.1} />
              </linearGradient>
              <linearGradient id="contemplative" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#a78bfa" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#a78bfa" stopOpacity={0.1} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
            <XAxis
              dataKey="name"
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#c4b5fd', fontSize: 12 }}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#c4b5fd', fontSize: 12 }}
            />
            <Tooltip content={<CustomTooltip />} />
            <Area type="monotone" dataKey="happy" stroke="#fbbf24" strokeWidth={2} fill="url(#happy)" />
            <Area type="monotone" dataKey="relaxed" stroke="#60a5fa" strokeWidth={2} fill="url(#relaxed)" />
            <Area type="monotone" dataKey="energetic" stroke="#f87171" strokeWidth={2} fill="url(#energetic)" />
            <Area type="monotone" dataKey="calm" stroke="#4ade80" strokeWidth={2} fill="url(#calm)" />
            <Area type="monotone" dataKey="contemplative" stroke="#a78bfa" strokeWidth={2} fill="url(#contemplative)" />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
