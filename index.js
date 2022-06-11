require('dotenv').config();

const express = require('express');
const cors = require('cors');

const { dbConnection} = require('./database/config');

// Creando servidor express
const app = express();

// Configurar CORS
app.use( cors() );

// Lectura y parseo del body - debe ir antes de la conexion
app.use(express.json());

// Base de datos
dbConnection();

// Rutas
app.use('/api/usuarios', require('./routes/usuarios'));
app.use('/api/hospital', require('./routes/hospitales'));
app.use('/api/medico', require('./routes/medicos'));
app.use('/api/login', require('./routes/auth'));
app.use('/api/todo', require('./routes/busquedas'));
app.use('/api/uploads', require('./routes/uploads'));

// mean_user
// z43oV3ljfOpUVHSY

app.listen( process.env.PORT , () => {
    console.log('Servidor corriendo en puerto' + process.env.PORT)
} )
