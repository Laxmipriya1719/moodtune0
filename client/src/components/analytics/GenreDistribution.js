'use client';

import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

const mockData = [
  { name: 'Ambient', value: 35, color: '#8b5cf6' },
  { name: 'Electronic', value: 25, color: '#ec4899' },
  { name: 'Indie', value: 20, color: '#06b6d4' },
  { name: 'Pop', value: 15, color: '#f59e0b' },
  { name: 'Acoustic', value: 5, color: '#10b981' }
];

export default function GenreDistribution() {
  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-black/80 backdrop-blur-sm border border-white/20 rounded-lg p-3">
          <p className="text-white font-medium">{data.name}</p>
          <p className="text-purple-300 text-sm">{data.value}% of listening time</p>
        </div>
      );
    }
    return null;
  };

  const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }) => {
    const RADIAN = Math.PI / 180;
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text 
        x={x} 
        y={y} 
        fill="white" 
        textAnchor={x > cx ? 'start' : 'end'} 
        dominantBaseline="central"
        fontSize="12"
        fontWeight="medium"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  return (
    <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-semibold text-white">Genre Distribution</h3>
        <div className="w-6 h-6 flex items-center justify-center">
          <i className="ri-pie-chart-line text-purple-400"></i>
        </div>
      </div>

      <div style={{ width: '100%', height: '250px' }}>
        <ResponsiveContainer>
          <PieChart>
            <Pie
              data={mockData}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={renderCustomizedLabel}
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
            >
              {mockData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
          </PieChart>
        </ResponsiveContainer>
      </div>

      <div className="space-y-2">
        {mockData.map((item, index) => (
          <div key={index} className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div 
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: item.color }}
              ></div>
              <span className="text-sm text-purple-200">{item.name}</span>
            </div>
            <span className="text-sm text-white font-medium">{item.value}%</span>
          </div>
        ))}
      </div>
    </div>
  );
}
