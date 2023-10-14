// 8 - Importo mongoose que me permite trabajar con la DB y simplifica el CRUD
const mongoose = require('mongoose')

// 9 - Creo la función que me permite activar la conexión con la DB
const connectDB = (url) =>{
    return mongoose.connect(url)
}

// 10 - Exporto la función y la pongo disponible para utilizarla en la función iniciar() que se encuentra en el archivo app.js
module.exports = connectDB