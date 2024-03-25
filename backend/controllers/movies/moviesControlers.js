const asyncHandler = require("express-async-handler");
const Movie = require("../../models/moviesModel");

const getMovies = asyncHandler(async (req, res) => {
  const movies = await Movie.find({});
  res.status(200).json(movies);
});

const createMovie = asyncHandler(async (req, res) => {
  const movieData = {
    adult: req.body.adult,
    backdrop_path: req.body.backdrop_path,
    genres: req.body.genre_ids, // Array of strings
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
  // verify if the movie already exists
  const movieExists = await Movie.findOne({ title: movieData.title });
  if (movieExists) {
    res.status(400);
    throw new Error("Movie already exists");
  }
  const movie = await Movie.create(movieData);
  if(movie){
    res.status(201).json(movie);
  }else{
    res.status(400);
    throw new Error("An error occurred while creating the movie. Please try again.");
  }
});

const getMovieById = asyncHandler(async (req, res) => {
  const movie = await Movie.findById(req.params.id);
  if (!movie) {
    res.status(404);
    throw new Error("Movie not found");
  }
  res.status(200).json(movie);
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

// update movie likes
const updateMovieLikes = asyncHandler(async (req, res) => {
  const movie = await Movie.findById(req.params.id);
  const likeUpdate ={
    likes: 1 + parseFloat(movie.likes),
    vote_count: 1 + parseFloat(movie.vote_count)
  }
  const updateAverage = {
    likes: parseFloat(likeUpdate.likes),
    vote_count: parseFloat(likeUpdate.vote_count),
    vote_average: parseFloat(likeUpdate.likes) / parseFloat(likeUpdate.vote_count) * 100,
  }

  if (!movie) {
    res.status(404);
    throw new Error("Movie not found");
  } else {
    const movieUpdated = await Movie.findByIdAndUpdate(
      req.params.id,
      updateAverage,
      {
        new: true,
        runValidators: true,
      }
    );
    res.status(200).json(movieUpdated);
  }
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
  getMovieById,
  createMovie,
  deleteMovie,
  updateVotes,
};
