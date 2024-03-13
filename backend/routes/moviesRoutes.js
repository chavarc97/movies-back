const express = require('express')
const router = express.Router()
const { getMovies, createMovie, deleteMovie, updateVotes } = require('../controllers/movies/moviesControlers')

router.get('/', getMovies)
router.post('/', createMovie)
router.delete('/:id', deleteMovie)
router.put('/:id', updateVotes)

module.exports = router