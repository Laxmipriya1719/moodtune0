// import { initializeApp } from "firebase/app";
// import { getAuth } from "firebase/auth";
// import { getFirestore } from "firebase/firestore";

// // Your web app's Firebase configuration
// const firebaseConfig = {
//   apiKey: "YOUR_API_KEY",
//   authDomain: "YOUR_AUTH_DOMAIN",
//   projectId: "YOUR_PROJECT_ID",
//   storageBucket: "YOUR_STORAGE_BUCKET",
//   messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
//   appId: "YOUR_APP_ID",
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const auth = getAuth(app);
// const db = getFirestore(app);

// export { auth, db };
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAw5PoYCr72Dbt2Aw_QEPurAxKR2HSbfvw",
  authDomain: "melodymind-b3fe6.firebaseapp.com",
  projectId: "melodymind-b3fe6",
  storageBucket: "melodymind-b3fe6.firebasestorage.app",
  messagingSenderId: "809321030769",
  appId: "1:809321030769:web:1b6782195a8828452b27d0",
  measurementId: "G-PFL8PT8H5Q",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app); // <-- Add this
const db = getFirestore(app); // <-- Optional, if using DB
// const analytics = getAnalytics(app);    // <-- Optional

export { auth, db, analytics };
