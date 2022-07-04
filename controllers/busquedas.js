const { response } = require('express')
const Hospital = require('../models/hospital');
const Usuario = require('../models/usuario');
const Medico = require('../models/medico');

const getBusqueda = async ( req, res = response ) => {

    const busqueda = req.params.busqueda
    // para que la búsqueda no tenga que ser exacta mayus,minus ni palabra completa
    const regex = new RegExp( busqueda, 'i' );

    const [ usuarios, medicos, hospitales] = await Promise.all([
        Usuario
            .find({nombre: regex}),

        Medico.find({nombre: regex}, 'nombre'),
        Hospital.find({nombre: regex}, 'nombre'),
    ])
    
    res.json({
        ok: true,
        usuarios,
        medicos,
        hospitales
    })
}

const getDocumentoColeccion = async ( req, res = response ) => {

    const tabla = req.params.tabla;
    const busqueda = req.params.busqueda;
    // para que la búsqueda no tenga que ser exacta mayus,minus ni palabra completa
    const regex = new RegExp( busqueda, 'i' );

    let data = [];

    switch (tabla) {
        case 'medicos':
            data = await Medico.find({nombre: regex})
                                .populate('usuario','nombre img')
                                .populate('hospital','nombre img');
        break;

        case 'hospitales':
            data = await Hospital.find({nombre: regex})
                                 .populate('usuario','nombre img');
        break;
        
        case 'usuarios':            
            data = await Usuario.find({nombre: regex});
            
        break;
    
        default:
            return res.status(400).json({
                ok: false,
                msg: 'La tabla tiene que ser usuarios, medicos u hospitales.'
            });
    }

    res.json({
        ok: true,
        resultados: data
    });
}


module.exports = {
    getBusqueda,
    getDocumentoColeccion
}