const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const helmet = require('helmet');
const path = require('path');
const upload = require('express-fileupload');
const cloudinary = require('cloudinary').v2;

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
  });


// Return "https" URLs by setting secure: true
cloudinary.config({
    secure: true
});
  
// Log the configuration
console.log(cloudinary.config());

require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

//Conexion a base de datos
const { sequelize } = require('./dbConfig');
sequelize.authenticate()
.then(() => console.log('Conexión a base de datos exitosa'))
.catch((error) => console.log('Error al conectar a base de datos', error));

//Creación Tabla
const archivosModel = require('./models/archivos')
archivosModel.sync()
.then(() => console.log('Tabla "archivos" creada en la base de datos'))
.catch((error) => console.log('Error al crear la tabla "archivos"', error));


//Middew
app.use(helmet());
app.use(morgan('dev'));
app.use(cors());
app.use(express.json())
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'ejs')
app.use(upload());


//Ruta
app.use(require('./routes/router'))


app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`)
});