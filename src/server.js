const express = require('express');
const exphbs= require('express-handlebars');
const path=require('path');

//Inicializaciones
const app = express();

//configuracion
app.set('port',process.env.PORT||3000);
app.set('views', path.join(__dirname,'views'));
app.engine('.hbs',exphbs({
    defaultLayout:'main',
    layoutsDir:path.join(app.get('views'),'layouts'),
    partialsDir:path.join(app.get('views'),'partials'),
    extname:'.hbs'
}));
app.set('view engine','.hbs')


//Middleware

//Rutas
app.use(require('./routes/index.route'));


//Archivos publicos
app.use(express.static(path.join(__dirname,'public')))


module.exports = app;