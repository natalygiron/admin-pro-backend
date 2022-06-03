require('dotenv').config();

const express = require('express');
const cors = require('cors');

const { dbConnection} = require('./database/config');

// Creando servidor express
const app = express();

// Configurar CORS
app.use( cors() );

// Base de datos
dbConnection();

// Rutas
app.get( '/', ( req, res ) => {
    res.status(400).json({
        ok: true,
        msg: 'Hola mundo'
    })
} );

// mean_user
// z43oV3ljfOpUVHSY

app.listen( process.env.PORT , () => {
    console.log('Servidor corriendo en puerto' + process.env.PORT)
} )
