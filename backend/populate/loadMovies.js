// Importar el módulo de mongoose
const mongoose = require('mongoose');
const axios = require('axios');
const Movie = require('../models/moviesModel');


const url = 'https://api.themoviedb.org/3/movie/popular?api_key=c2525d0edb9b982c034d6f755a582ad4'

const loadMovies = async () => {
    try {
        // Realizar la solicitud HTTP a la API
        const response = await axios.get(url);
        const movies = response.data.results;
    
        // Iterar sobre las películas y guardarlas en la base de datos
        for (const movie of movies) {
          await Movie.create(movie);
        }
        console.log('Las películas se han cargado correctamente en la base de datos.');
      } catch (error) {
        console.error('Error al cargar películas en la base de datos:', error);
      } finally {
        mongoose.disconnect(); // Cerrar la conexión a la base de datos
      }
}

module.exports = {loadMovies};