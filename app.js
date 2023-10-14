// ----------------------------------  ESPACIO RESERVADO PARA TRAER PAQUETES Y CONEXIONES PRINCIPALES----------------------------------- //

// 1 - Importo express
const express = require('express')

// 18 - Importo las rutas ./routes/authRoutes
const authRoutes = require('./routes/authRoutes')

// 37 - Instalamos e importamos cookie-parser, un middleware para manejar y analizar las cookies
const cookieParser = require('cookie-parser')

// 2 - Hago disponible express con la constante app
const app = express()
// ----------------------------------  ESPACIO RESERVADO PARA TRAER PAQUETES Y CONEXIONES PRINCIPALES----------------------------------- //

                                                //------------------------//

// ---------------------*************  ESPACIO RESERVADO PARA TRAER LA CONEXIÓN A LA DB  *************--------------------------------- //

// 3 - Importo dotenv qué le da seguridad a mis conexiones. Nos deja asignarle variables a cosas que quiero ocultar
require('dotenv').config()

// 4 - Traigo la conexión desde el archivo que tendrá la conexión a la Base de datos = db/conexion.js
const connectDB = require('./db/conexion')

// ---------------------*************  ESPACIO RESERVADO PARA TRAER LA CONEXIÓN A LA DB  *************--------------------------------- //

                                                //------------------------//

// -------------------//////////////// ESPACIO RESERVADO PARA LAS RUTAS ////////////////---------------------------------------------- //

// 13 - Habilito los middleware de la carpeta public
app.use(express.static('public'))

// 21 - Utilizo express para pasar los json que recibe Node (ej: los usuarios), a un objeto para que JavaScript pueda leerlos
app.use(express.json())

// 38 - Habilito el middleware cookie-parser
app.use(cookieParser())

// 11 - Seteo el ejs
app.set('view engine', 'ejs')

 
// 12 - Llamo a mi página de inicio. En este caso, será signup.ejs
app.get('/', (req, res) => {
    res.render('home')
})

// 19 - Llamamos a authRoutes y lo hacemos aquí, porque recién la vamos a necesitar después de home
app.use(authRoutes)

// -------------------//////////////// ESPACIO RESERVADO PARA LAS RUTAS ////////////////---------------------------------------------- //

                                                //------------------------//

// ---------------------*************  ESPACIO RESERVADO PARA TRAER LA CONEXIÓN A LA DB  *************------------------------------- //

// 5 - Acá llamo al PUERTO localhost que lo tendré en el archivo .env
const unPuerto = process.env.PUERTO

// 6 - Creo una función para llamar a la conexión con la DB. Está conexión se encontrará en el archivo db/conexion.js esta conexión retornará a la función iniciar y se comunicará con el archivo .env en dónde se encuentra el link hacia la DB
const iniciar = async () =>{
    try {
        await connectDB(process.env.MONGO_URL)
        app.listen( unPuerto, console.log('Servidor ejecutándose'))
    } catch (error) {
        console.log(error)
    }
}

// 7 - Llamo a la función iniciar
iniciar()

// ---------------------*************  ESPACIO RESERVADO PARA TRAER LA CONEXIÓN A LA DB  *************------------------------------- //