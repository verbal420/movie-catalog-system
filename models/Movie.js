const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  comment: { type: String, required: true },
});

const movieSchema = new mongoose.Schema({
  title: { type: String, required: true },
  director: { type: String, required: true },
  year: { type: Number, required: true },
  description: { type: String },
  genre: { type: String },
  comments: [commentSchema],
});

const Movie = mongoose.model("Movie", movieSchema);
module.exports = Movie;