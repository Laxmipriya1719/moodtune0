import express from "express";
import User from "../models/User.js";

const router = express.Router();

// CREATE user
// router.post("/", async (req, res) => {
//   try {
//     const user = new User(req.body);
//     await user.save();
//     res.status(201).json(user);
//   } catch (err) {
//     res.status(400).json({ error: err.message });
//   }
// });

router.post("/", async (req, res) => {
  try {
    const { firebaseUID, email, username } = req.body;

    const user = new User({
      firebaseUID,
      email,
      username,
    });

    await user.save();
    res.status(201).json(user);
  } catch (err) {
    console.error("Error saving user:", err);
    res.status(400).json({ error: err.message });
  }
});

// READ all users
router.get("/", async (req, res) => {
  const users = await User.find();
  res.json(users);
});

// READ one user by firebaseUID
router.get("/:firebaseUID", async (req, res) => {
  const user = await User.findOne({ firebaseUID: req.params.firebaseUID });
  res.json(user);
});

// UPDATE user by firebaseUID
router.put("/:firebaseUID", async (req, res) => {
  const user = await User.findOneAndUpdate(
    { firebaseUID: req.params.firebaseUID },
    req.body,
    { new: true }
  );
  res.json(user);
});

// DELETE user by firebaseUID
router.delete("/:firebaseUID", async (req, res) => {
  await User.findOneAndDelete({ firebaseUID: req.params.firebaseUID });
  res.json({ message: "User deleted" });
});

export default router;
