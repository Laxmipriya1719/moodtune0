// // const mongoose = require("mongoose");

// // const userSchema = new mongoose.Schema(
// //   {
// //     firebaseUID: { type: String, required: true, unique: true },
// //     username: { type: String, required: true },
// //     email: { type: String, required: true },
// //   },
// //   { timestamps: true }
// // );

// // module.exports = mongoose.model("User", userSchema);
// // import mongoose from "mongoose";

// // const userSchema = new mongoose.Schema({
// //   name: String,
// //   email: String,
// //   password: String,
// // });

// // const User = mongoose.model("User", userSchema);
// // export default User;
// import mongoose from "mongoose";

// const userSchema = new mongoose.Schema({
//   name: String,
//   email: String,
//   password: String,
// });

// // const User = mongoose.model("User", userSchema);
// // ✅ Use existing model if it already exists
// const User = mongoose.models.User || mongoose.model("User", userSchema);
// export default User;
// import mongoose from "mongoose";

// const userSchema = new mongoose.Schema({
//   firebaseUID: { type: String, required: true, unique: true },
//   email: { type: String, required: true },
//   name: { type: String },
// });

// const User = mongoose.model("User", userSchema);

// export default User;
import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  firebaseUID: { type: String, required: true, unique: true },
  email: { type: String, required: true },
  username: { type: String, required: true }, // keep this only
  joinDate: { type: Date, default: Date.now },
});

export default mongoose.model("User", userSchema);
