const {Schema , model} = require('mongoose');

const HospitalSchema = Schema({
    nombre: {
        type: String,
        required: true,
    },
    img:{
        type: String,
    },
    usuario: {
        required: true,
        type: Schema.Types.ObjectId,
        ref: 'Usuario'
    }
});

// le damos forma al schema filtrando los datos de version
// y quedarnos solo con la data que deseamos en object
HospitalSchema.method('toJSON', function(){
    const { __v, ...object} = this.toObject();
    return object;
})

module.exports = model('Hospital', HospitalSchema);