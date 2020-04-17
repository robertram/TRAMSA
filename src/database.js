const mongoose= require('mongoose');
//const MONGODB_URL = 'mongodb://localhost/libros-app';
//const MONGODB_URL = process.env.MONGODB_URL;

const LIBROS_HOST= process.env.LIBROS_APP_MONGODB_HOST;
const LIBROS_DATABASE = process.env.LIBROS_APP_DATABASE;
const MONGODB_URL =`mongodb://${LIBROS_HOST}/${LIBROS_DATABASE}`;
const MONGOATLASURL= process.env.MONGOATLASURL;

mongoose.connect(MONGOATLASURL,{
    useCreateIndex:true,
    useNewUrlParser:true,
    useUnifiedTopology:true
}).then(db=>console.log('Base de datos esta conectada', MONGOATLASURL))
.catch(err=>{
    console.log('direccion --',MONGOATLASURL)
    console.log('Mensaje de error: ',err);
})