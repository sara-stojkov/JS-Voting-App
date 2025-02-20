const mongoose = require("mongoose");

const jokeSchema = new mongoose.Schema({
  jokeId: { type: String, required: true },
  question: String,
  answer: String,
  likes: { type: Number, default: 0 },
  mehs: { type: Number, default: 0 },
  dislikes: { type: Number, default: 0 },
});

module.exports = mongoose.model("Joke", jokeSchema);
