const express = require('express');
const colors = require('colors');
const dotenv = require('dotenv').config()
const cors = require('cors');
const port = process.env.PORT || 5000;

const app = express();

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

// routes


// error handler


app.listen(port, () => console.log(`Servidor iniciado en el puerto ${port}`))
