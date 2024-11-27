const express = require("express");
const authMiddleware = require("../auth");
const {
  addMovie,
  getAllMovies,
  getMovieById,
  updateMovie,
  deleteMovie,
  addComment,
  getComments,
} = require("../controllers/movie");

const router = express.Router();

router.post("/addMovie", authMiddleware, addMovie);
router.get("/getMovies", getAllMovies);
router.get("/getMovie/:id", getMovieById);
router.put("/updateMovie/:id", authMiddleware, updateMovie);
router.delete("/deleteMovie/:id", authMiddleware, deleteMovie);
router.post("/addComment/:id", authMiddleware, addComment);
router.get("/getComments/:id", getComments);

module.exports = router;