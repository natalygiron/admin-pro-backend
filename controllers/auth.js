const { response } = require('express');
const bcrypt = require('bcryptjs');

const Usuario = require('../models/usuario');
const { generarJWT } = require('../helpers/jwt');

const login = async( req, res = response ) => {

    const { email, password } = req.body;

    try {

        const usuarioDB = await Usuario.findOne({email});

        if( !usuarioDB ) {
            return res.status(404).json({
                ok: false,
                msg: 'Email no encontrado'
            })
        }

        // Verificar constraseña
        const validPassword = bcrypt.compareSync( password, usuarioDB.password );
        if( !validPassword ){
            return res.status(400).json({
                ok: false,
                msg: 'La constraseña no es válida'
            })
        }

        // Generar el TOKEN - JWT 
        const token = await generarJWT( usuarioDB.id ); // ---Devuelve una promesa

        res.json({
            ok:true,
            token
        })
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador uwu'
        })
    }

}

module.exports = {
    login
}