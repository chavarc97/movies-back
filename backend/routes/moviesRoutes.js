const express = require("express");
const router = express.Router();
const {
  getMovies,
  createMovie,
  deleteMovie,
  updateVotes,
  getMovieById,
} = require("../controllers/movies/moviesControlers");
const { protect } = require("../middleware/authMiddleware");

router.get("/", getMovies);
router.get("/:id", protect, getMovieById);
router.post("/", protect, createMovie);
router.delete("/:id", protect, deleteMovie);
router.put("/:id", protect, updateVotes);

module.exports = router;
