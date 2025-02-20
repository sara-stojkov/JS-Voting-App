// backend/server.js
const express = require("express");
const mongoose = require("mongoose");
const Joke = require("./models/Joke");

const app = express();
app.use(express.json());

const cors = require("cors");
app.use(cors({ origin: "http://localhost:3000" }));


mongoose.connect("mongodb://127.0.0.1:27017/voting-game", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("MongoDB connected"))
.catch((err) => console.error("MongoDB connection error:", err));

// Endpoint to store joke votes
app.post("/api/joke/vote", async (req, res) => {
  const { jokeId, question, answer, likes, mehs, dislikes } = req.body;

  try {
    const joke = await Joke.findOneAndUpdate(
      { jokeId },
      { question, answer, likes, mehs, dislikes },
      { upsert: true, new: true }
    );
    res.json(joke);
  } catch (error) {
    console.error("Failed to save vote:", error);
    res.status(500).json({ message: "Failed to save vote" });
  }
});

app.listen(5000, () => console.log("Server running on port 5000"));
