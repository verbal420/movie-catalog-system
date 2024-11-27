const Movie = require("../models/Movie");

// Add a new movie (Admin Only)
exports.addMovie = async (req, res) => {
  if (!req.user.isAdmin) return res.status(403).json({ message: "Forbidden" });
  try {
    const movie = new Movie(req.body);
    await movie.save();
    res.status(201).json(movie);
  } catch (error) {
    res.status(400).json({ error: "Error adding movie" });
  }
};

// Get all movies
exports.getAllMovies = async (req, res) => {
  const movies = await Movie.find();
  res.status(200).json({ movies });
};

// Get a movie by ID
exports.getMovieById = async (req, res) => {
  const movie = await Movie.findById(req.params.id);
  if (!movie) return res.status(404).json({ message: "Movie not found" });
  res.status(200).json(movie);
};

// Update a movie (Admin Only)
exports.updateMovie = async (req, res) => {
  if (!req.user.isAdmin) return res.status(403).json({ message: "Forbidden" });
  try {
    const updatedMovie = await Movie.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json({ message: "Movie updated successfully", updatedMovie });
  } catch (error) {
    res.status(400).json({ error: "Error updating movie" });
  }
};

// Delete a movie (Admin Only)
exports.deleteMovie = async (req, res) => {
  if (!req.user.isAdmin) return res.status(403).json({ message: "Forbidden" });
  try {
    await Movie.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Movie deleted successfully" });
  } catch (error) {
    res.status(400).json({ error: "Error deleting movie" });
  }
};

// Add a comment to a movie
exports.addComment = async (req, res) => {
  const { comment } = req.body;
  try {
    const movie = await Movie.findById(req.params.id);
    movie.comments.push({ userId: req.user.id, comment });
    await movie.save();
    res.status(201).json({ message: "Comment added successfully", updateMovie: movie });
  } catch (error) {
    res.status(400).json({ error: "Error adding comment" });
  }
};

// Get comments for a movie
exports.getComments = async (req, res) => {
  const movie = await Movie.findById(req.params.id).populate("comments.userId", "email");
  if (!movie) return res.status(404).json({ message: "Movie not found" });
  res.status(200).json({ comments: movie.comments });
};