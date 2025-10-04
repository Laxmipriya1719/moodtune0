// 'use client';

// import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

// const mockData = {
//   week: [
//     { name: '6AM', minutes: 15 },
//     { name: '9AM', minutes: 45 },
//     { name: '12PM', minutes: 25 },
//     { name: '3PM', minutes: 35 },
//     { name: '6PM', minutes: 55 },
//     { name: '9PM', minutes: 65 },
//     { name: '12AM', minutes: 30 }
//   ],
//   month: [
//     { name: 'Morning', minutes: 180 },
//     { name: 'Afternoon', minutes: 220 },
//     { name: 'Evening', minutes: 350 },
//     { name: 'Night', minutes: 150 }
//   ],
//   year: [
//     { name: 'Q1', minutes: 2800 },
//     { name: 'Q2', minutes: 3200 },
//     { name: 'Q3', minutes: 2900 },
//     { name: 'Q4', minutes: 3100 }
//   ]
// };

// export default function ListeningPatternsChart({ timeRange }) {
//   const data = mockData[timeRange];

//   const CustomTooltip = ({ active, payload, label }) => {
//     if (active && payload && payload.length) {
//       return (
//         <div className="bg-black/80 backdrop-blur-sm border border-white/20 rounded-lg p-3">
//           <p className="text-white font-medium">{label}</p>
//           <p className="text-purple-300 text-sm">
//             {payload[0].value} minutes listened
//           </p>
//         </div>
//       );
//     }
//     return null;
//   };

//   return (
//     <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
//       <div className="flex items-center justify-between mb-6">
//         <h3 className="text-xl font-semibold text-white">Listening Patterns</h3>
//         <div className="w-6 h-6 flex items-center justify-center">
//           <i className="ri-bar-chart-2-line text-purple-400"></i>
//         </div>
//       </div>

//       <div style={{ width: '100%', height: '250px' }}>
//         <ResponsiveContainer>
//           <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
//             <defs>
//               <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
//                 <stop offset="5%" stopColor="#8b5cf6" stopOpacity={1}/>
//                 <stop offset="95%" stopColor="#ec4899" stopOpacity={1}/>
//               </linearGradient>
//             </defs>
//             <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
//             <XAxis 
//               dataKey="name" 
//               axisLine={false}
//               tickLine={false}
//               tick={{ fill: '#c4b5fd', fontSize: 12 }}
//             />
//             <YAxis 
//               axisLine={false}
//               tickLine={false}
//               tick={{ fill: '#c4b5fd', fontSize: 12 }}
//             />
//             <Tooltip content={<CustomTooltip />} />
//             <Bar 
//               dataKey="minutes" 
//               fill="url(#barGradient)"
//               radius={[4, 4, 0, 0]}
//             />
//           </BarChart>
//         </ResponsiveContainer>
//       </div>
//     </div>
//   );
// }



'use client';

import { useEffect, useState } from 'react';
import { db, auth } from '../../firebaseConfig';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export default function ListeningPatternsChart({ timeRange }) {
  const [data, setData] = useState([]);

  // 🔥 Fetch analytics from Firestore
  useEffect(() => {
    const fetchData = async () => {
      try {
        const user = auth.currentUser;
        if (!user) return;

        const q = query(
          collection(db, 'analytics'),
          where('userId', '==', user.uid)
        );
        const querySnapshot = await getDocs(q);

        let rawData = [];
        querySnapshot.forEach((doc) => {
          rawData.push(doc.data());
        });

        // Transform Firestore data → chart-friendly
        let grouped = {};
        rawData.forEach((item) => {
          const hour = new Date(item.playedAt?.seconds * 1000).getHours();

          let label;
          if (timeRange === 'week') {
            if (hour < 6) label = '12AM';
            else if (hour < 9) label = '6AM';
            else if (hour < 12) label = '9AM';
            else if (hour < 15) label = '12PM';
            else if (hour < 18) label = '3PM';
            else if (hour < 21) label = '6PM';
            else label = '9PM';
          } else if (timeRange === 'month') {
            if (hour < 12) label = 'Morning';
            else if (hour < 17) label = 'Afternoon';
            else if (hour < 21) label = 'Evening';
            else label = 'Night';
          } else {
            // year → group by quarters
            const month = new Date(item.playedAt?.seconds * 1000).getMonth();
            if (month < 3) label = 'Q1';
            else if (month < 6) label = 'Q2';
            else if (month < 9) label = 'Q3';
            else label = 'Q4';
          }

          if (!grouped[label]) grouped[label] = 0;
          grouped[label] += item.duration || 0;
        });

        const chartData = Object.keys(grouped).map((key) => ({
          name: key,
          minutes: Math.round(grouped[key] / 60),
        }));

        setData(chartData);
      } catch (err) {
        console.error('Error fetching analytics:', err);
      }
    };

    fetchData();
  }, [timeRange]);

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-black/80 backdrop-blur-sm border border-white/20 rounded-lg p-3">
          <p className="text-white font-medium">{label}</p>
          <p className="text-purple-300 text-sm">
            {payload[0].value} minutes listened
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-semibold text-white">Listening Patterns</h3>
        <div className="w-6 h-6 flex items-center justify-center">
          <i className="ri-bar-chart-2-line text-purple-400"></i>
        </div>
      </div>

      <div style={{ width: '100%', height: '250px' }}>
        <ResponsiveContainer>
          <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <defs>
              <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#8b5cf6" stopOpacity={1}/>
                <stop offset="95%" stopColor="#ec4899" stopOpacity={1}/>
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
            <Bar 
              dataKey="minutes" 
              fill="url(#barGradient)"
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
