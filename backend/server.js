const express = require("express");
const colors = require("colors");
const dotenv = require("dotenv").config();
const connectDB = require("./config/db");
const cors = require("cors");
const { loadMovies } = require("./populate/loadMovies");
const { errorHandler } = require("./middleware/errorHandler");
const port = process.env.PORT || 5000;

// Conexión a la base de datos
connectDB();

const app = express();

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// routes
app.use("/api/movies", require("./routes/moviesRoutes"));
app.use("/api/users", require("./routes/usersRoutes"));

// error handler
app.use(errorHandler);

async function serverStart() {
  try {
    // Llama a la función para cargar películas
    // await loadMovies();

    // Inicia el servidor
    app.listen(port, () =>
      console.log(`Servidor iniciado en el puerto ${port}`)
    );
  } catch (error) {
    console.error("Error al iniciar el servidor:", error);
  }
}

// start server
serverStart();
