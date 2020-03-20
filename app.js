const mongoose= require('mongoose');
const express=require('express');
require('dotenv').config();
const bodyParser= require('body-parser');
const app= express();


app.use(bodyParser.json);

const productosRoute= require('./routes/productos');
app.use('/productos', productosRoute);


mongoose.connect(process.env.DB_CONNECTION, 
  {useNewUrlParser:true}, 
  ()=>{console.log('Conected to Mongo')}
);

app.get('/', (req,res)=>{
  res.send('index')
});

app.listen(3000);





