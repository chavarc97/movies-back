const asyncHandler = require("express-async-handler");
const Movie = require("../../models/moviesModel");

const getMovies = asyncHandler(async (req, res) => {
  const movies = await Movie.find();
  res.status(200).json({ movies });
});

const createMovie = asyncHandler(async (req, res) => {
  const movieData = {
    adult: req.body.adult,
    backdrop_path: req.body.backdrop_path,
    genre_ids: req.body.genre_ids, // Array of numbers
    original_language: req.body.original_language,
    original_title: req.body.original_title,
    overview: req.body.overview,
    popularity: req.body.popularity || 0, // Initialize to 0 if not provided
    poster_path: req.body.poster_path,
    release_date: new Date(req.body.release_date),
    title: req.body.title,
    vote_average: req.body.vote_average || 0, // Initialize to 0 if not provided
    vote_count: req.body.vote_count || 0, // Initialize to 0 if not provided
  };
  if (!movieData) {
    res.status(400);
    throw new Error("Please Fill all the fields");
  }
  const movie = await Movie.create(movieData);
  res.status(201).json({ movie });
});

const deleteMovie = asyncHandler(async (req, res) => {
  const movie = await Movie.findById(req.params.id);
  if (!movie) {
    res.status(404);
    throw new Error("Movie not found");
  }
  await Movie.deleteOne(movie);
  res.status(200).json({ if: req.params.id, message: "Movie removed" });
});

const updateVotes = asyncHandler(async (req, res) => {
  const { vote } = req.body;

  // Buscar la película existente por su ID
  const movie = await Movie.findById(req.params.id);

  if (!movie) {
    res.status(404);
    throw new Error("Movie not found");
  }

  // Agregar el voto proporcionado al vote_count y recalcular el vote_average
  movie.vote_count += 1;
  movie.vote_average =
    (movie.vote_average * (movie.vote_count - 1) + vote) / movie.vote_count;

  // Guardar los cambios en la base de datos
  await movie.save();

  res.status(200).json(movie);
});

module.exports = {
  getMovies,
  createMovie,
  deleteMovie,
  updateVotes,
};
