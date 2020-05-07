const express = require('express');
const exphbs = require('express-handlebars');
const path = require('path');
const methodOverride = require('method-override');
const session = require('express-session');
const flash = require('connect-flash');
const passport = require('passport');
//const pdfmake= require('./pdfmake');

require('dotenv').config();
require('../src/database')

//npm run dev
//npm start

//Inicializaciones
const app = express();
require('./src/config/passport');

app.listen(app.get('port'),()=>{
    console.log('servidor en el puerto ',app.get('port'));
})

//configuracion
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.engine('.hbs', exphbs({
    defaultLayout: 'main',
    layoutsDir: path.join(app.get('views'), 'layouts'),
    partialsDir: path.join(app.get('views'), 'partials'),
    extname: '.hbs'
}));
app.set('view engine', '.hbs');


//Middleware
app.use(express.urlencoded({
    extended: false
}));
app.use(methodOverride('_method'));
app.use(methodOverride('X-HTTP-Method-Override'))
app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

// Global Variables
app.use((req, res, next) => {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    res.locals.user = req.user || null;
    next();
});
/*
var pdfMake = require('pdfmake/build/pdfmake.js');
var pdfFonts = require('pdfmake/build/vfs_fonts.js');
pdfMake.vfs = pdfFonts.pdfMake.vfs;*/

//Rutas
app.use(require('./src/routes/index'));
app.use(require('./src/routes/users'));
app.use(require('./src/routes/notes'));
app.use(require('./src/routes/productos'));
app.use(require('./src/routes/bitacoras'));
app.use(require('./src/routes/camiones'));
app.use(require('./src/routes/eventos'));
app.use(require('./src/routes/materiaPrima'));
app.use(require('./src/routes/consecutivos'));
app.use(require('./src/routes/parametrosGenerales'));
app.use(require('./src/routes/bodegas'));
app.use(require('./src/routes/persona'));
app.use(require('./src/routes/tipoMateriaPrima'));
app.use(require('./src/routes/pdf'));
app.use(require('./src/routes/clientes'));

//Archivos publicos
app.use(express.static(path.join(__dirname, 'public')))


module.exports = app;