// const admin = require("firebase-admin");

// // Replace with your Firebase Admin SDK service account key
// // You can download this JSON file from Firebase Console -> Project settings -> Service accounts
// // const serviceAccount = require("./path/to/your/serviceAccountKey.json");
// const serviceAccount = require("./serviceAccountKey.json");

// admin.initializeApp({
//   credential: admin.credential.cert(serviceAccount),
//   databaseURL: "https://YOUR_PROJECT_ID.firebaseio.com", // Optional, if using Realtime Database
// });

// const db = admin.firestore();
// const auth = admin.auth();

// module.exports = { admin, db, auth };
const admin = require("firebase-admin");
const serviceAccount = require("./serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  // Optional: if you're using Realtime DB instead of Firestore
  // databaseURL: "https://<YOUR_PROJECT_ID>.firebaseio.com"
});

const db = admin.firestore();
const auth = admin.auth();

module.exports = { admin, db, auth };
