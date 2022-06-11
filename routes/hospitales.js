// Path: /api/hospital

const { Router } = require('express');
const { body } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos')

const { validarJWT } = require('../middlewares/validar-jwt');
const { 
    getHospitales,
    crearHospital,
    actualizarHospital,
    borrarHospital 
} = require('../controllers/hospitales');

const router = Router();

router.get( '/', getHospitales );

router.post( '/', [
        
        validarJWT,
        body('nombre', 'El nombre del hospital es necesario').not().isEmpty(),
    ], crearHospital );


router.put( '/:id', [
        
    
    ] ,actualizarHospital );


router.delete( '/:id',
    borrarHospital
);


module.exports = router;
