// 'use client';

// import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

// const mockData = [
//   { name: 'Ambient', value: 35, color: '#8b5cf6' },
//   { name: 'Electronic', value: 25, color: '#ec4899' },
//   { name: 'Indie', value: 20, color: '#06b6d4' },
//   { name: 'Pop', value: 15, color: '#f59e0b' },
//   { name: 'Acoustic', value: 5, color: '#10b981' }
// ];

// export default function GenreDistribution() {
//   const CustomTooltip = ({ active, payload }) => {
//     if (active && payload && payload.length) {
//       const data = payload[0].payload;
//       return (
//         <div className="bg-black/80 backdrop-blur-sm border border-white/20 rounded-lg p-3">
//           <p className="text-white font-medium">{data.name}</p>
//           <p className="text-purple-300 text-sm">{data.value}% of listening time</p>
//         </div>
//       );
//     }
//     return null;
//   };

//   const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }) => {
//     const RADIAN = Math.PI / 180;
//     const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
//     const x = cx + radius * Math.cos(-midAngle * RADIAN);
//     const y = cy + radius * Math.sin(-midAngle * RADIAN);

//     return (
//       <text 
//         x={x} 
//         y={y} 
//         fill="white" 
//         textAnchor={x > cx ? 'start' : 'end'} 
//         dominantBaseline="central"
//         fontSize="12"
//         fontWeight="medium"
//       >
//         {`${(percent * 100).toFixed(0)}%`}
//       </text>
//     );
//   };

//   return (
//     <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
//       <div className="flex items-center justify-between mb-6">
//         <h3 className="text-xl font-semibold text-white">Genre Distribution</h3>
//         <div className="w-6 h-6 flex items-center justify-center">
//           <i className="ri-pie-chart-line text-purple-400"></i>
//         </div>
//       </div>

//       <div style={{ width: '100%', height: '250px' }}>
//         <ResponsiveContainer>
//           <PieChart>
//             <Pie
//               data={mockData}
//               cx="50%"
//               cy="50%"
//               labelLine={false}
//               label={renderCustomizedLabel}
//               outerRadius={80}
//               fill="#8884d8"
//               dataKey="value"
//             >
//               {mockData.map((entry, index) => (
//                 <Cell key={`cell-${index}`} fill={entry.color} />
//               ))}
//             </Pie>
//             <Tooltip content={<CustomTooltip />} />
//           </PieChart>
//         </ResponsiveContainer>
//       </div>

//       <div className="space-y-2">
//         {mockData.map((item, index) => (
//           <div key={index} className="flex items-center justify-between">
//             <div className="flex items-center space-x-2">
//               <div 
//                 className="w-3 h-3 rounded-full"
//                 style={{ backgroundColor: item.color }}
//               ></div>
//               <span className="text-sm text-purple-200">{item.name}</span>
//             </div>
//             <span className="text-sm text-white font-medium">{item.value}%</span>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }


import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

const COLORS = ['#8b5cf6', '#ec4899', '#06b6d4', '#f59e0b', '#10b981'];

export default function GenreDistribution({ data }) {
  // Use provided data or fallback to placeholder
  const chartData = data && data.length > 0 ? data : [
    { name: 'No Data', value: 100, count: 0, color: '#6b7280' }
  ];

  // Add colors to data if not present
  const dataWithColors = chartData.map((item, index) => ({
    ...item,
    color: item.color || COLORS[index % COLORS.length]
  }));

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-black/80 backdrop-blur-sm border border-white/20 rounded-lg p-3">
          <p className="text-white font-medium">{data.name}</p>
          <p className="text-purple-300 text-sm">{data.value}% of listening time</p>
          {data.count > 0 && (
            <p className="text-purple-200 text-xs mt-1">{data.count} songs</p>
          )}
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

    if (percent < 0.05) return null; // Don't show labels for very small slices

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

      {dataWithColors[0].name === 'No Data' ? (
        <div className="flex flex-col items-center justify-center py-12">
          <div className="w-16 h-16 bg-purple-500/20 rounded-full flex items-center justify-center mb-4">
            <i className="ri-music-2-line text-2xl text-purple-300"></i>
          </div>
          <p className="text-purple-200 text-center">
            No genre data available yet.<br />
            Start listening to see your preferences!
          </p>
        </div>
      ) : (
        <>
          <div style={{ width: '100%', height: '250px' }}>
            <ResponsiveContainer>
              <PieChart>
                <Pie
                  data={dataWithColors}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={renderCustomizedLabel}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {dataWithColors.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="space-y-2 mt-4">
            {dataWithColors.map((item, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div 
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: item.color }}
                  ></div>
                  <span className="text-sm text-purple-200">{item.name}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-white font-medium">{item.value}%</span>
                  {item.count > 0 && (
                    <span className="text-xs text-purple-300">({item.count})</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}