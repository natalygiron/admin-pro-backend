const {response} = require('express')
const { validationResult  } = require('express-validator');

const validarCampos = (req, res = response, next) => {
    
    // tomamos el resultado de la validación hecha en routes/usuarios.js
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    next();
}

module.exports = {
    validarCampos
}