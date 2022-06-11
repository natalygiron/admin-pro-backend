const { response } = require('express')
const Medico = require('../models/medico');

const getMedicos = async ( req, res = response ) => {

    const medicos = await Medico.find()
                                .populate('usuario','nombre')
                                .populate('hospital', 'nombre')

    res.json({
        ok: true,
        medicos
    })
}

const crearMedico = async ( req, res = response ) => {
    
    const uid = req.uid;
    const hid = req.body.hospital;
    const medico = new Medico({
        usuario: uid,
        hospital: hid,
        ...req.body
    });

    console.log(uid , ' ', hid);

    try {

        const medicoDB = await medico.save();
        
        res.json({
            ok: true,
            medico: medicoDB
        })
    } catch (error) {
        res.status(500).json({
            ok: true,
            msg: 'Hable con el administrador'   
        })
    }
}

const actualizarMedico = ( req, res = response ) => {
    res.json({
        ok: true,
        msg: 'actualizarMedico'
    })
}

const borrarMedico = ( req, res = response) => {
    res.json({
        ok: true,
        msg: 'borrarMedico'
    })
}


module.exports = {
    getMedicos,
    crearMedico,
    actualizarMedico,
    borrarMedico
}