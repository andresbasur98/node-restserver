const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator'); 

let rolesValidos = { // controlamos que el rol que se pueda mandar sea uno de estos dos
    values: ['ADMIN_ROLE','USER_ROLE'],
    message: '{VALUE} no es un rol válido'
}

let Schema = mongoose.Schema;


let usuarioSchema = new Schema({
    nombre:{
        type: String,
        required: [true, 'El nombre es necesario']
    },
    email:{
        type: String,
        unique: true,
        required: [true, 'El correo es necesario']
    },
    password:{
        type: String,
        required: [true, 'La contraseña es obligatoria']
    },
    img: {
        type: String
     },
    role: {
        type: String,
        default: 'USER_ROLE',
        enum: rolesValidos
    }, //default: 'USER_ROLE'
    estado: {
        type: Boolean,
        default: true
    }, 
    google: {
        type: Boolean,
        default: false
    } 
});

usuarioSchema.methods.toJSON = function(){ // Escondemos la contraseña de manera que no pueda verla el usuario (modificamos el metodo de enviar por toJSON que se utiliza cuando vamos a imprimir algo)
    
    let user = this;                   // this => lo que hay en ese momento
    let userObject = user.toObject(); // Obtenemos todas sus propiedades y métodos
    delete userObject.password;      // Y lo borramos

    return userObject;
}

usuarioSchema.plugin( uniqueValidator,{     // Estamos controlando el error en email para el campo unique requerimos el uniqueValidator arriba
    message: '{PATH} debe de ser único'
});

module.exports = mongoose.model( 'Usuario', usuarioSchema ); // El modelo se llama Usuario y tiene la configuración de usuarioSchema