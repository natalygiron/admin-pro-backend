const path = require('path');
const fs = require('fs');

const { response } = require('express');
const { v4: uuidv4 } = require('uuid');
const { actualizarImagen } = require('../helpers/actualizar-imagen');

const fileUpload = ( req, res = response ) => {

    const tipo = req.params.tipo;
    const id = req.params.id;

    // Validar tipo
    const tiposValidos = ['hospitales','medicos','usuarios'];
    if( !tiposValidos.includes(tipo) ){
        return res.status(400).json({
            ok: false,
            msg: 'No es un tipo válido.'
        });
    }

    // Validar que se ha seleccionado un archivo / exista el archivo
    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).json({
            ok: false,
            msg: 'No files were uploaded'
        });
    }
    
    // TODO Procesar la imagen
    const file = req.files.imagen; // body/form-data/ (checkbox) imagen - seleccionar file

    // Para tomar la extensión del archivo
    const nombreCortado = file.name.split('.'); 
    const extensionArchivo = nombreCortado[nombreCortado.length - 1].toLowerCase();

    // Validar exxtension
    const extensionesValidas = ['jpeg','jpg','png','gif'];
    if( !extensionesValidas.includes(extensionArchivo) ){
        return res.status(400).json({
            ok: false,
            msg: 'No es un tipo de extensión válido.'
        });
    }

    // Generar el nombre del archivo
    const nombreArchivo = `${uuidv4()}.${ extensionArchivo }`;

    // Path para guardar la imagen
    const path = `./uploads/${tipo}/${nombreArchivo}`;

    // Use el método mv() para guardar el archivo en una ruta
    file.mv(path, function(err) {
        if (err){
            console.log(err);
            return res.status(500).json({
                ok: false,
                msg: 'Error al mover la imagen'
            });
        }

        // Actualizar base de datos
        actualizarImagen( tipo, id, path, nombreArchivo);


        res.json({
            ok: true,
            msg: 'Archivo guardado / subido',
            nombreArchivo
        })
      });

}

const retornaImagen = (req, res) => {

    const tipo = req.params.tipo;
    const foto = req.params.file;

    const pathImg = path.join( __dirname, `../uploads/${tipo}/${foto}`);
    
    // imagen por defecto
    if ( fs.existsSync(pathImg) ){
        res.sendFile( pathImg );
    } else {
        const pathImg = path.join( __dirname, `../uploads/no-img.jpg`);
        res.sendFile( pathImg );
    }

}

module.exports = {
    fileUpload,
    retornaImagen
}