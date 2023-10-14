// 23 - Importo el archivo User.js de la carpeta models
const User = require('../models/User')

// 39 - Importo npm i jsonwebtoken
const jwt = require('jsonwebtoken')

// 27 - Creo una función para el Manejo de errores
const handleErrors = (err) =>{
   // console.log(err.message, err.code)
   // Si está todo ok, me devuelve un  email:'' y password:''
    let errors = { email:'', password:'' }
    // 32 - El código de Error 11000 proviene de la DB cuando detecta un duplicado. Entonces, decimos: "Si tenemos un usr/mail igual en la DB (E11000), entonces el usuario no puede utilizar ese usr/mail"
    // Duplicación de emails
    if (err.code === 11000) {
        errors.email = "Ese email no está disponible, ya está siendo utilizado por otro usuario"
        return errors
    }
    //  29 - Validación de errores - Apuntamos al error específico y ver qué es lo que incluye el error
    // Obtengo un array de objetos con los errores y lo recorro hasta llegar a las propiedades.
    if (err.message.includes('usrEcommerceUTN validation failed')) {
        //console.log(Object.values(err.errors))
        Object.values(err.errors).forEach( ( { properties } )=> {
            //console.log(properties)
            // 30 - .path es el camino desde donde vengo: email y password
            errors[properties.path] = properties.message
        })
    }
    return errors
}

// 40 - Creo la función createToken para crear la firma del token. La firma secreta va al lado de las llaves {} , separada por una coma {}, 'mi secreto' vendría a ser la firma secreta. Esta firma secreta 'mi secreto', es una cadena de caracteres que se utiliza para crear el json web token. IMPORTANTE: siempre queda guardada en la computadora del usuario.
const maxAge = 3*24*60*60
const createToken = (id, email) => {
    return jwt.sign({id, email} , 'mi secreto', {
        expiresIn: maxAge
    })
}

// 18 - Traigo todas las funciones de las rutas
const signup_post = async (req, res) =>{
   // res.send('usuario creado')
    //24 - Hago un destructuring y traigo el email y el password
    const{email, password} = req.body
    
    // 25 - Utilizamos un TryCatch para conectarnos a la Base de Datos    
    try {
        // 26 - cuando creo el usuario con User.create({}) le paso el email y el password / Si es satisfactorio - res.status(200), entonces convertimos el user en un json(user)
        const user = await User.create({email, password})

       // 26 - (continuación - Lo modificamos cuando creamos el TOKEN, que en el trabajo es el punto 41)
        //res.status(201).json(user)


        // 41 - Una vez que creo el usuario con cons user =..., creo el TOKEN
        const token = createToken(user._id, user.email)
        res.cookie('jwt', token, {httpOnly:true, maxAge:maxAge*1000})
        res.status(201).json({user:user._id})
        
    } catch (err) {
        // 28 - Llamo a la función handleErrors que me maneja los errores
        const errors = handleErrors(err)
        
        //console.log(err)
        // 31 - Recibo los valores en handleErrors
        res.status(400).json({errors})
    }
    console.log(email, password)
}

const signup_get = (req, res) =>{
    // 33 - Traigo el signup con el get para visualizarlo
    res.render('signup')
}

//const login_post = (req, res) =>{}

//const login_get = (req, res) =>{}


//19 - Exporto las funciones de las rutas
module.exports = {
    signup_post,
    signup_get,
    //login_post,
    //login_get
}