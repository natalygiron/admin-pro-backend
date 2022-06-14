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

const actualizarMedico = async ( req, res = response ) => {
    
    const id = req.params.id;
    const uid = req.uid;
    const hid = req.body.hospital;

    try {

        const medico = await Medico.findById(id);

        if(!medico){
            return res.status(404).json({
                ok:true,
                msg: ' medico no encontrado por id'
            })
        }

        const cambiosMedico = {
            ...req.body,
            usuario: uid,
            hospital: hid
        }

        const medicoActualizado = await Medico.findByIdAndUpdate(id, cambiosMedico, { new: true})


        res.json({
            ok:true,
            hospital: medicoActualizado
        })
        
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }
    
    res.json({
        ok: true,
        msg: 'actualizarMedico'
    })
}

const borrarMedico = async ( req, res = response) => {

    const id = req.params.id;

    try {

        const medico = await Medico.findById(id);

        if(!medico){
            return res.status(404).json({
                ok:true,
                msg: ' medico no encontrado por id'
            })
        }

         await Medico.findByIdAndDelete(id)


        res.json({
            ok:true,
            msg: 'Medico eliminado'
        })
        
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }

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