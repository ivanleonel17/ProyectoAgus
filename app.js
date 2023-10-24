// Importa express
const express = require('express');
// Importa las rutas
const authRoutes = require('./routes/authRoutes');
// Importa el middleware para cookies
const cookieParser = require('cookie-parser');
// Crea una instancia de Express
const app = express();

require('dotenv').config()

// Habilita los middleware de la carpeta public
app.use(express.static('public'));
// Utiliza express para pasar JSON
app.use(express.json());
// Habilita el middleware cookie-parser
app.use(cookieParser());
// Setea el motor de vistas EJS
app.set('view engine', 'ejs');

// Ruta de inicio
app.get('/', (req, res) => {
    res.render('home');
});

// Agrega las rutas de autenticación
app.use(authRoutes);

// Obtiene el puerto de la variable de entorno PORT o usa el puerto 3000 si no está definido
const port = process.env.PORT || 3000;

// Escucha en el host 0.0.0.0 y el puerto proporcionado por Railway
app.listen(port, "0.0.0.0", function () {
    console.log('Servidor ejecutándose');
});

// Configura la conexión a la base de datos
const connectDB = require('./db/conexion');
const iniciar = async () => {
    try {
        await connectDB(process.env.MONGO_URL);
    } catch (error) {
        console.log(error);
    }
}

// Llama a la función de inicio de la base de datos
iniciar();
