const mongoose = require("mongoose");

const movieSchema = new mongoose.Schema({
  adult: {
    type: Boolean,
    required: [true, 'please provide if the movie is for adults or not'],
  },
  backdrop_path: {
    type: String,
    required: [true, 'please provide the movie image link'],
  },
  genres: {
    type: [Object],
    required: [true, 'please provide the movie genre'],
  },
  original_language: {
    type: String,
    required: [true, 'please provide the movie language'],
  },
  original_title: {
    type: String,
    required: [true, 'please provide the movie title'],
  },
  overview: {
    type: String,
    required: [true, 'please provide the movie synopsis'],
  },
  popularity: {
    type: Number,
    required: [true, 'please provide the movie popularity'],
  },
  poster_path: {
    type: String,
    required: [true, 'please provide the movie poster link'],
  },
  release_date: {
    type: Date,
    required: [true, 'please provide the movie release date'],
  },
  title: {
    type: String,
    required: [true, 'please provide the movie title'],
  },
  vote_average: {
    type: Number,
    required: [true, 'please provide the movie rating'],
    default: 0,
  },
  vote_count: {
    type: Number,
    required: [true, 'please provide the movie vote from 1-10'],
    default: 0,
  },
  likes: {
    type: Number,
    default: 0
  },
  dislikes: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
});

module.exports = mongoose.model("Movie", movieSchema);


