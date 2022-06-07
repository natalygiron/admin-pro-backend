const {Schema , model} = require('mongoose');

const UsuarioSchema = Schema({
    nombre: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    img:{
        type: String,
    },
    role:{
        type: String,
        required: true,
        default: 'USER_ROLE'
    },
    google: {
        type: Boolean,
        default: false,
    }
});

// le damos forma al schema de usuario filtrando los datos de version y id
// y quedarnos solo con la data que deseamos en object
UsuarioSchema.method('toJSON', function(){
    const { __v, _id, password, ...object} = this.toObject();
    object.uid = _id; // agregamos el id en un nuevo campo uid
    return object;
})

module.exports = model('Usuario', UsuarioSchema);