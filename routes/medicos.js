// Ruta /api/usuarios
const { Router } = require('express');
const { body } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos')

const { validarJWT } = require('../middlewares/validar-jwt');

const { getMedicos, crearMedico, actualizarMedico, borrarMedico } = require('../controllers/medicos');

const router = Router();

router.get( '/', getMedicos );

router.post( '/', [
    validarJWT,
    body('nombre', 'El nombre del médico es necesario').not().isEmpty(),
    body('hospital', 'El hospital id debe ser válido').isMongoId(),
    validarCampos
], crearMedico );


router.put( '/:id', [
        
    
    ] ,actualizarMedico );


router.delete( '/:id',
    borrarMedico
);


module.exports = router;