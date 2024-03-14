const express = require('express')
const router = express.Router()
const { getMovies, createMovie, deleteMovie, updateVotes } = require('../controllers/movies/moviesControlers')
const { protect } = require('../middleware/authMiddleware')

router.get('/', getMovies)
router.post('/', createMovie)
router.delete('/:id',protect, deleteMovie)
router.put('/:id', protect, updateVotes)

module.exports = router

