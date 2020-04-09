const express = require('express');
const exphbs = require('express-handlebars');
const path = require('path');
const methodOverride = require('method-override');
const session = require('express-session');
const flash = require('connect-flash');
const passport = require('passport');

//Inicializaciones
const app = express();
require('./config/passport');

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


//Rutas
app.use(require('./routes/index'));
app.use(require('./routes/users'));
app.use(require('./routes/notes'));
app.use(require('./routes/productos'));
app.use(require('./routes/bitacoras'));
app.use(require('./routes/camiones'));
app.use(require('./routes/eventos'));
app.use(require('./routes/materiaPrima'));
app.use(require('./routes/consecutivos'));
app.use(require('./routes/parametrosGenerales'));
app.use(require('./routes/bodegas'));
app.use(require('./routes/persona'));

//Archivos publicos
app.use(express.static(path.join(__dirname, 'public')))


module.exports = app;