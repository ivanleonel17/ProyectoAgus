// 22 - Creo el modelo completo para el registro de usuarios
const mongoose = require('mongoose')
// VALIDATOR - npm i validator - Nos sirve para validar que un mail sea email
const {isEmail} = require('validator')
const bcrypt = require('bcrypt')

const userSchema = new mongoose.Schema({
    email:{
        type: String,
        required: [true, "Por favor, ingrese un email"],
        unique: true,
        lowercase: true,
        validate:[isEmail, "Por favor, ingrese un email válido"]
    },
    password:{
        type: String,
        required: [true, "Por favor, ingrese un password"],
        minlength: [6, "Por favor, ingrese un máximo de 6 caracteres"]
    }
})

// Hacemos el hash del password con el npm i bcrypt. Así almacenamos la contraseña de manera segura. bcrypt.genSalt(10) el genSalt(25) podría variar su número. Cuánto más extenso sea el número, más segura la contraseña. El 10 es un estándar básico.
userSchema.pre('save', async function( next ) {
    //console.log('El nuevo usuario está siendo creado y se pasará a guardar', this)
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)
    next()
})
// El "doc" es un parámetro json del usuario con toda la info del usuario
userSchema.post('save', function( doc, next ) {
    console.log('El nuevo usuario fue creado y guardado', doc)
    next()
})
// el next() es para seguir a la siguiente función. En el post sigue al renderizado

const User = mongoose.model('usrEcommerceUTN', userSchema)
module.exports = User