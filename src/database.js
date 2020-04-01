const mongoose= require('mongoose');
//const MONGODB_URL = 'mongodb://localhost/libros-app';
//const MONGODB_URL = process.env.MONGODB_URL;

const LIBROS_HOST= process.env.LIBROS_APP_MONGODB_HOST;
const LIBROS_DATABASE = process.env.LIBROS_APP_DATABASE;
const MONGODB_URL =`mongodb://${LIBROS_HOST}/${LIBROS_DATABASE}`;


mongoose.connect(MONGODB_URL,{
    useCreateIndex:true,
    useNewUrlParser:true,
    useUnifiedTopology:true
}).then(db=>console.log('Base de datos esta conectada', MONGODB_URL))
.catch(err=>{
    console.log('direccion --',MONGODB_URL)
    console.log('Mensaje de error: ',err);
})