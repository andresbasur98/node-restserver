const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator'); 

let Schema = mongoose.Schema;



let categoriaSchema = new Schema({
    descripcion: { type: String, unique: true, required: [true, 'La descripción es obligatoria'] },
    usuario: { type: Schema.Types.ObjectId, ref: 'Usuario' }
});
 

categoriaSchema.plugin( uniqueValidator,{     // Estamos controlando el error en email para el campo unique requerimos el uniqueValidator arriba
    message: '{PATH} debe de ser único'
});


module.exports = mongoose.model( 'Categoria', categoriaSchema ); 