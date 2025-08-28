import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import AuthCard from "./components/AuthCard";
import Dashboard from "./components/Dashboard";
import WelcomePage from "./components/WelcomePage"; // Import the new component
import Player from "./pages/Player";
import MoodDetection from "./pages/MoodDetection";
import Analytics from "./pages/Analytics";

import { auth } from "./firebaseConfig"; // Corrected path from original App.js
import { onAuthStateChanged } from "firebase/auth";

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        // Fetch user data from Firestore if needed, or use currentUser directly
        setUser({
          uid: currentUser.uid,
          email: currentUser.email,
          username: currentUser.displayName || currentUser.email.split("@")[0],
          // Add other user data as needed
        });
        setIsAuthenticated(true);
      } else {
        setUser(null);
        setIsAuthenticated(false);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const handleAuth = (userData) => {
    setUser(userData);
    setIsAuthenticated(true);
  };

  const handleLogout = async () => {
    try {
      await auth.signOut();
      setIsAuthenticated(false);
      setUser(null);
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center">
        <div className="text-center text-white">
          <h2 className="text-2xl font-bold mb-2">Loading...</h2>
          <p className="text-blue-200">Checking authentication status</p>
        </div>
      </div>
    );
  }

  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
        <Routes>
          <Route
            path="/login"
            element={
              isAuthenticated ? (
                <Navigate to="/dashboard" />
              ) : (
                <AuthCard onAuth={handleAuth} />
              )
            }
          />
          <Route
            path="/dashboard"
            element={
              isAuthenticated ? (
                <Dashboard user={user} onLogout={handleLogout} />
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          <Route
            path="/"
            element={
              isAuthenticated ? (
                <Navigate to="/dashboard" />
              ) : (
                <WelcomePage /> // Render WelcomePage if not authenticated
              )
            }
          />
          <Route path="/player" element={<Player />} />
          <Route path="/MoodDetection" element={<MoodDetection />} />
          <Route path="/Analytics" element={<Analytics />} />
        </Routes>
      </div>
      {/* <Routes>
        <Route path="/player" element={<Player />} />
      </Routes> */}
    </Router>
  );
}
// import { BrowserRouter, Routes, Route } from "react-router-dom";
// import Navbar from "./components/Navbar";
// import Home from "./pages/Home";
// import Analytics from "./pages/Analytics";
// import MoodDetection from "./pages/MoodDetection";
// import Player from "./pages/Player";
// import NotFound from "./pages/NotFound";

// function App() {
//   return (
//     <BrowserRouter>
//       <Navbar />
//       <Routes>
//         <Route path="/" element={<Home />} />
//         <Route path="/analytics" element={<Analytics />} />
//         <Route path="/mood-detection" element={<MoodDetection />} />
//         <Route path="/player" element={<Player />} />
//         <Route path="*" element={<NotFound />} />
//       </Routes>
//     </BrowserRouter>
//   );
// }

// export default App;
