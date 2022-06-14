// Path: '/api/login'

const { Router } =require('express');
const { body } = require('express-validator');
const { login, renewToken } = require('../controllers/auth');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');

const router = Router();

router.post('/', [
        body('email', 'El email es obligatorio').isEmail(),
        body('password', 'El password es obligatorio').not().isEmpty(),
        validarCampos
    ],
    login
);

router.get('/renew', [
    validarJWT,
    renewToken
]);



module.exports = router;