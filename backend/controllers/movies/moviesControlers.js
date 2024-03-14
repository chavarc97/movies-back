const asyncHandler = require("express-async-handler");
const Movie = require("../../models/moviesModel");

const getMovies = asyncHandler(async (req, res) => {
  const movies = await Movie.find();
  res.status(200).json({ movies });
});

const createMovie = asyncHandler(async (req, res) => {
  if (!req.body.name || !req.body.description) {
    res.status(400);
    throw new Error("Please Fill all the fields");
  }
  const movie = await Movie.create({
    original_language: req.body.original_language,
    original_title: req.body.original_title,
    overview: req.body.overview,
    popularity: req.body.popularity,
    poster_path: req.body.poster_path,
    release_date: req.body.release_date,
    title: req.body.title,
    vote_average: req.body.vote_average,
    vote_count: req.body.vote_count,
  });
  res.status(201).json({ movie });
});

const deleteMovie = asyncHandler(async (req, res) => {
  const movie = await Movie.findById(req.params.id);
  if (!movie) {
    res.status(404);
    throw new Error("Movie not found");
  }
  await Movie.deleteOne(movie)
  res.status(200).json({if: req.params.id, message: "Movie removed"});
});

const updateVotes = asyncHandler(async (req, res) => {
    const movie = await Movie.findById(req.params.id);
            if (!movie) {
                res.status(404);
                throw new Error("Movie not found");
            }
            const movieUpdated = await Movie.updateOne(
                { _id: req.params.id },
                { $set: { vote_average: req.body.vote_average, vote_count: req.body.vote_count } },
                { new: true }
            );
        res.status(200).json(movieUpdated);
    })

module.exports = { 
    getMovies,
    createMovie, 
    deleteMovie, 
    updateVotes ,
};
