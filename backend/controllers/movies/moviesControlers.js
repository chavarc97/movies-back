const asyncHandler = require('express-async-handler')


const getMovies = asyncHandler(async (req, res) => {
    res.status(200).json({ message: 'get Movies Success' })
})

const createMovie = asyncHandler(async (req, res) => {
    res.status(201).json({ message: 'create Movie Success' })
})

const deleteMovie = asyncHandler(async (req, res) => {
    res.status(200).json({ message: 'delete Movie Success' })
})

const updateVotes = asyncHandler(async (req, res) => {
    res.status(200).json({ message: 'update Votes Success' })
})