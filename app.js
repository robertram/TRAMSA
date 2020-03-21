const mongoose= require('mongoose');
const express=require('express');
const app= express();
const bodyParser= require('body-parser');
require('dotenv').config();

app.use(bodyParser.json());

/*const productosRoute= require('./routes/productos');
app.use('/productos', productosRoute);*/

const postsRoute= require('./routes/posts');
app.use('/posts', postsRoute);

mongoose.connect(process.env.DB_CONNECTION, 
  {useNewUrlParser:true}, 
  ()=>{console.log('Conected to Mongo')}
);

app.get('/', (req,res)=>{
  res.send('index')
});



app.listen(3000);





