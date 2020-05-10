require('dotenv').config();
const app= require('./server');
require('./database')

//npm run dev
//npm start

app.listen(app.get('port'),()=>{
    console.log('servidor en el puerto ',app.get('port'));
})
