// import React from "react";
// import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
// import { auth } from "../firebaseConfig";
// import axios from "axios";

// // const result = await signInWithPopup(auth, provider);
// // const user = result.user;

// // const newUser = {
// //   firebaseUID: user.uid,
// //   email: user.email,
// //   username: user.displayName || user.email.split("@")[0],
// //   joinDate: new Date().toISOString(),
// // };

// // // Save to backend
// // await axios.post("http://localhost:5000/api/users", newUser);

// // onAuth(newUser);

// export default function OAuthButtons({ onAuth }) {
//   const handleOAuth = async (providerName) => {
//     let provider;
//     if (providerName === "google") {
//       provider = new GoogleAuthProvider();
//     } else if (providerName === "spotify") {
//       // Spotify requires a custom OAuth provider setup in Firebase
//       // This is a placeholder, actual implementation would be more complex
//       console.log("Spotify OAuth not fully implemented in this example.");
//       alert("Spotify OAuth requires additional Firebase configuration.");
//       return;
//     }

//     if (provider) {
//       try {
//         const result = await signInWithPopup(auth, provider);
//         // The signed-in user info.
//         const user = result.user;
//         onAuth({
//           uid: user.uid,
//           email: user.email,
//           username: user.displayName || user.email.split("@")[0],
//           joinDate: new Date().toISOString(), // This would ideally come from user's profile in Firestore
//         });

//       } catch (error) {
//         console.error("OAuth error:", error);
//         alert(`Failed to sign in with ${providerName}: ${error.message}`);
//       }
//     }
//   };

//   return (
//     <div className="mt-4 space-y-3">
//       <button
//         onClick={() => handleOAuth("google")}
//         className="w-full flex items-center justify-center gap-3 bg-white/10 hover:bg-white/20 border border-white/20 text-white py-3 px-4 rounded-lg transition-all whitespace-nowrap cursor-pointer"
//       >
//         <div className="w-5 h-5 flex items-center justify-center">
//           <i className="ri-google-fill text-lg"></i>
//         </div>
//         Continue with Google
//       </button>

//       <button
//         onClick={() => handleOAuth("spotify")}
//         className="w-full flex items-center justify-center gap-3 bg-green-600 hover:bg-green-700 text-white py-3 px-4 rounded-lg transition-all whitespace-nowrap cursor-pointer"
//       >
//         <div className="w-5 h-5 flex items-center justify-center">
//           <i className="ri-spotify-fill text-lg"></i>
//         </div>
//         Continue with Spotify
//       </button>
//     </div>
//   );
// }
import React from "react";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../firebaseConfig";
import axios from "axios";

export default function OAuthButtons({ onAuth }) {
  const handleOAuth = async (providerName) => {
    let provider;
    if (providerName === "google") {
      provider = new GoogleAuthProvider();
    } else if (providerName === "spotify") {
      // Spotify requires a custom OAuth provider setup in Firebase
      console.log("Spotify OAuth not fully implemented in this example.");
      alert("Spotify OAuth requires additional Firebase configuration.");
      return;
    }

    if (provider) {
      try {
        // Sign in with Firebase
        const result = await signInWithPopup(auth, provider);
        const user = result.user;

        // Prepare user object
        const newUser = {
          firebaseUID: user.uid,
          email: user.email,
          username: user.displayName || user.email.split("@")[0],
          joinDate: new Date().toISOString(),
        };

        // Save user to backend (your Express API)
        const res = await axios.post(
          "http://localhost:5000/api/users",
          newUser
        );

        // Call parent with the saved user (from DB)
        onAuth(res.data);
      } catch (error) {
        console.error("OAuth error:", error);
        alert(`Failed to sign in with ${providerName}: ${error.message}`);
      }
    }
  };

  return (
    <div className="mt-4 space-y-3">
      <button
        onClick={() => handleOAuth("google")}
        className="w-full flex items-center justify-center gap-3 bg-white/10 hover:bg-white/20 border border-white/20 text-white py-3 px-4 rounded-lg transition-all whitespace-nowrap cursor-pointer"
      >
        <div className="w-5 h-5 flex items-center justify-center">
          <i className="ri-google-fill text-lg"></i>
        </div>
        Continue with Google
      </button>

      <button
        onClick={() => handleOAuth("spotify")}
        className="w-full flex items-center justify-center gap-3 bg-green-600 hover:bg-green-700 text-white py-3 px-4 rounded-lg transition-all whitespace-nowrap cursor-pointer"
      >
        <div className="w-5 h-5 flex items-center justify-center">
          <i className="ri-spotify-fill text-lg"></i>
        </div>
        Continue with Spotify
      </button>
    </div>
  );
}
