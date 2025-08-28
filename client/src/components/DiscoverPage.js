import React, { useState } from "react";
import Navbar from "./Navbar";
import UserGreeting from "./UserGreeting";
import AnalyticsPreview from "./AnalyticsPreview";
import StartMusicExperienceButton from "./StartMusicExperienceButton";

export default function Dashboard({ user, onLogout }) {
  const [showMusicPlayer, setShowMusicPlayer] = useState(false);

  const handleStartMusic = () => {
    setShowMusicPlayer(true);
  };

  if (showMusicPlayer) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center">
        <div className="text-center text-white">
          <div className="w-16 h-16 flex items-center justify-center mx-auto mb-4">
            <i className="ri-music-2-fill text-4xl"></i>
          </div>
          <h2 className="text-2xl font-bold mb-2">Music Player Loading...</h2>
          <p className="text-blue-200">
            Getting your personalized experience ready
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
      <Navbar user={user} onLogout={onLogout} />

      <div className="max-w-6xl mx-auto px-4 py-8">
        <UserGreeting user={user} />
        <AnalyticsPreview />
        <StartMusicExperienceButton onStart={handleStartMusic} />
      </div>
    </div>
  );
}
