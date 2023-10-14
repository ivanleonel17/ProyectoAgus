// 14 - Importo el Router desde express - Acá colocamos todas las rutas que no sean la principal

const express = require('express')
const router = express.Router()

// 20 - Importo las funciones de las rutas desde authControllers y las reemplazo en las rutas
//const authController = require('../controllers/authControllers')
const{
    signup_post,
    signup_get,
    //login_post,
    //login_get
} = require('../controllers/authControllers')


//---------------------------------//

// 15 - SIGNUP - Rutas - Enviamos con el post la info y chequeamos con el get que es usr no se haya registrado antes
// (Las funciones vienen desde authControlers)

router.post('/signup', signup_post)
router.get('/signup', signup_get)

//---------------------------------//


// 16 - LOGIN - Rutas - Enviamos el login y chequeamos que esté correcto con el get
// (Las funciones vienen desde authControlers)

//router.post('/login', login_post)
//router.get('/login', login_get)


// 17 - Exportamos la variable router del módulo

module.exports = router