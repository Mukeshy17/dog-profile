const express = require('express');
const axios = require('axios');
const cors = require('cors');
const mongoose = require('mongoose');
const User = require('./models/User');

const app = express();
app.use(cors());
app.use(express.json());

const MONGO_URI = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/dogProfiles";
mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.error("MongoDB connection error:", err));

function calculateAge(dob) {
  const birth = new Date(dob);
  const today = new Date();
  let age = today.getFullYear() - birth.getFullYear();
  const m = today.getMonth() - birth.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) {
    age--;
  }
  return age;
}

app.post('/user', async (req, res) => {
  try {
    const { firstName, lastName, dob } = req.body;
    if (!firstName || !lastName || !dob) {
      return res.status(400).json({ message: "firstName, lastName and dob are required" });
    }

    const dogRes = await axios.get('https://dog.ceo/api/breeds/image/random');
    const profilePicture = dogRes.data.message;

    const user = await User.create({ firstName, lastName, dob, profilePicture });

    res.status(201).json({
      id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      dob: user.dob,
      profilePicture: user.profilePicture,
      age: calculateAge(user.dob)
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

app.get('/user', async (req, res) => {
  try {
    const users = await User.find().sort({ createdAt: -1 });
    const result = users.map(u => ({
      id: u._id,
      firstName: u.firstName,
      lastName: u.lastName,
      dob: u.dob,
      profilePicture: u.profilePicture,
      age: calculateAge(u.dob)
    }));
    res.json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
});



const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Backend running on http://localhost:${PORT}`);
});
