// Path api/uploads/:img

const { Router } = require("express");
const expressFileUpload = require('express-fileupload');
const { validarJWT } = require('../middlewares/validar-jwt');

const { fileUpload, retornaImagen } = require('../controllers/uploads');

const router = Router();

router.use(expressFileUpload());

router.put("/:tipo/:id", validarJWT, fileUpload );

router.get("/:tipo/:file", retornaImagen );

module.exports = router;