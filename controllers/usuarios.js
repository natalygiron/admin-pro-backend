const { response } = require('express');
const bcrypt = require('bcryptjs');

const Usuario = require('../models/usuario');
const { generarJWT } = require('../helpers/jwt');

const getUsuarios = async ( req, res ) => {

    const desde = Number(req.query.desde) || 0;

    // Regresa un arreglo de promesas (usuario = [0], total = [1])
    // Ambas promesas se ejecutarán al mismo tiempo
    const [ usuarios, total] = await Promise.all([
        Usuario
            .find({}, 'nombre email role google img')
            .skip(desde)
            .limit(5),

        Usuario.countDocuments()
    ])
    
    res.json({
        ok: true,
        usuarios,
        total
    })
};


const crearUsuario = async ( req, res = response ) => {
    
    const { email, password } = req.body;
    
    try {

        const existeEmail = await Usuario.findOne({email});
        console.log(existeEmail)
        if( existeEmail) {
            return res.status(400).json({
                ok: false,
                msg: 'el email ya está registrado pipipi'
            })
        }

        const usuario = new Usuario(req.body);

        // Encriptar contraseña
        const salt = bcrypt.genSaltSync();
        usuario.password = bcrypt.hashSync( password, salt );
    
        // Guardar usuario
        await usuario.save();
    
        // Generar el TOKEN - JWT 
        const token = await generarJWT( usuario.id ); // ---Devuelve una promesa

        res.json({
            ok: true,
            usuario,
            token
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado'
        })
    }

};

const actualizarUsuario = async(req, res= response) => {
    // TODO: Validar toke y comprobar si es el usuario correcto

    const uid = req.params.id;

    try{
        const usuarioDB = await Usuario.findById(uid);
        if(!usuarioDB) {
            return res.status(404).json({
                ok: false,
                msg: "No existe un usuario con ese id"
            })
        }

        // Actualización
        const {password, google, email, ...campos} = req.body;

        if( usuarioDB.email !== email ) {
    
            const existeEmail = await Usuario.findOne({ email });
            if( existeEmail ) {
                return res.status(400).json({
                    ok: false,
                    msg: "ya existe un usuario con ese email."
                });
            }
        }

        campos.email = email;

        const usuarioActualizado = await Usuario.findByIdAndUpdate(uid, campos, {new: true});

        res.json({
            ok: true,
            usuario: usuarioActualizado
        })

    } catch (error){
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado.'
        })
    }
}

const borrarUsuario = async(req, res= response) => {
    const uid = req.params.id;

    try {
        const usuarioDB = await Usuario.findById(uid);

        if(!usuarioDB) {
            return res.status(404).json({
                ok: false,
                msg: "No existe un usuario con ese id"
            });
        }

        await Usuario.findByIdAndDelete( uid );

        res.json({
            ok: true,
            msg: 'usuario eliminado'
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado F.'
        })
    }

}

module.exports = {
    getUsuarios,
    crearUsuario,
    actualizarUsuario,
    borrarUsuario
}