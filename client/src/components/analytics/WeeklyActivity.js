'use client';

export default function WeeklyActivity() {
  const weeklyData = [
    { day: 'Mon', hours: 2.5, intensity: 'medium' },
    { day: 'Tue', hours: 3.2, intensity: 'high' },
    { day: 'Wed', hours: 1.8, intensity: 'low' },
    { day: 'Thu', hours: 4.1, intensity: 'high' },
    { day: 'Fri', hours: 3.7, intensity: 'high' },
    { day: 'Sat', hours: 2.9, intensity: 'medium' },
    { day: 'Sun', hours: 2.1, intensity: 'medium' }
  ];

  const maxHours = Math.max(...weeklyData.map(d => d.hours));
  const totalHours = weeklyData.reduce((sum, d) => sum + d.hours, 0);

  const getIntensityColor = (intensity) => {
    switch (intensity) {
      case 'high': return 'from-red-500 to-pink-500';
      case 'medium': return 'from-yellow-500 to-orange-500';
      case 'low': return 'from-green-500 to-emerald-500';
      default: return 'from-gray-500 to-gray-600';
    }
  };

  const getIntensityDot = (intensity) => {
    switch (intensity) {
      case 'high': return 'bg-red-400';
      case 'medium': return 'bg-yellow-400';
      case 'low': return 'bg-green-400';
      default: return 'bg-gray-400';
    }
  };

  return (
    <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-semibold text-white">Weekly Activity</h3>
        <div className="text-sm text-purple-200">
          {totalHours.toFixed(1)}h total
        </div>
      </div>

      {/* Activity Bars */}
      <div className="space-y-4 mb-6">
        {weeklyData.map((data, index) => (
          <div key={index} className="flex items-center space-x-4">
            <div className="w-8 text-sm text-purple-200 font-medium">
              {data.day}
            </div>

            <div className="flex-1 relative">
              <div className="w-full h-6 bg-white/10 rounded-full overflow-hidden">
                <div 
                  className={`h-full bg-gradient-to-r ${getIntensityColor(data.intensity)} rounded-full transition-all duration-1000 ease-out`}
                  style={{ width: `${(data.hours / maxHours) * 100}%` }}
                />
              </div>
              <div className="absolute right-2 top-0 h-6 flex items-center">
                <span className="text-xs text-white font-medium">
                  {data.hours}h
                </span>
              </div>
            </div>

            <div className={`w-3 h-3 rounded-full ${getIntensityDot(data.intensity)}`}></div>
          </div>
        ))}
      </div>

      {/* Legend */}
      <div className="flex justify-center space-x-4 text-xs">
        <div className="flex items-center space-x-1">
          <div className="w-2 h-2 bg-red-400 rounded-full"></div>
          <span className="text-purple-200">High</span>
        </div>
        <div className="flex items-center space-x-1">
          <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
          <span className="text-purple-200">Medium</span>
        </div>
        <div className="flex items-center space-x-1">
          <div className="w-2 h-2 bg-green-400 rounded-full"></div>
          <span className="text-purple-200">Low</span>
        </div>
      </div>

      {/* Weekly Summary */}
      <div className="mt-6 p-4 bg-white/5 rounded-lg border border-white/10">
        <div className="grid grid-cols-2 gap-4 text-center">
          <div>
            <div className="text-2xl font-bold text-white">
              {Math.max(...weeklyData.map(d => d.hours)).toFixed(1)}h
            </div>
            <div className="text-xs text-purple-200">Peak Day</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-white">
              {(totalHours / 7).toFixed(1)}h
            </div>
            <div className="text-xs text-purple-200">Daily Avg</div>
          </div>
        </div>
      </div>
    </div>
  );
}
