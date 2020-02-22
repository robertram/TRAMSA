/*const MongoClient = require('mongodb').MongoClient;

// replace the uri string with your connection string.
const uri = "mongodb+srv://robert_ramirez:<robert20>@cluster0-ppro3.mongodb.net/test?retryWrites=true&w=majority"
MongoClient.connect(uri, function(err, client) {
   if(err) {
        console.log('Error occurred while connecting to MongoDB Atlas...\n',err);
   }
   console.log('Connected...');
   const collection = client.db("test").collection("devices");
   // perform actions on the collection object
   client.close();
});*/

/*
const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://robert_ramirez:<robert20>@cluster0-ppro3.mongodb.net/test?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true });
client.connect(err => {

  const collection = client.db("test").collection("devices");
  client.close();

});*/
/*
const MongoClient = require('mongodb').MongoClient;

// replace the uri string with your connection string.
const uri = "mongodb+srv://robert_ramirez:<robert20>@cluster0-ppro3.mongodb.net/test?retryWrites=true&w=majority";
MongoClient.connect(uri, function(err, client) {
  if (err) {
    console.error('An error occurred connecting to MongoDB: ', err);
} else {
    const db = client.db("cathub")
    db.collection("videos", function (err, collection) {
         collection.find().toArray(function(err, res) {
            callback(res)
         })
    })
    db.close()
}
});*/

/*
var MongoClient = require('mongodb').MongoClient;

const uri = "mongodb+srv://test_user:testuser123@cluster0-ppro3.mongodb.net/test?retryWrites=true&w=majority";

MongoClient.connect(uri, function (err, db) {
  if (err) throw err

  db.collection('Bodega').find().toArray(function (err, result) {
    if (err) throw err

    console.log(result)
  })
})
*/

const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
const mongoose = require('mongoose');

mongoose.connect(url);


// Connection URL
const uri = 'mongodb://localhost:27017';
const url = "mongodb+srv://test_user:testuser123@cluster0-ppro3.mongodb.net/test?retryWrites=true&w=majority";


// Database Name
const dbName = 'TRAMSA';

// Use connect method to connect to the server
MongoClient.connect(url, function (err, client) {
  assert.equal(null, err);
  console.log("Connected successfully to server");

  const db = client.db(dbName);

  console.log(db.databaseName);

  client.close();
});


function Select(collection) {
  MongoClient.connect(url, function (err, client) {
    assert.equal(null, err);
    const db = client.db(dbName);

    console.log("Showing collection "+ collection);

    if (err) throw err;
    //var dbo = db.db(dbName);
    db.collection(collection).findOne({}, function (err, result) {
      if (err) throw err;
      //console.log("RESULTADO "+result.CodigoCamion);
      return result;
    });
    client.close();
  });
}






const camiones=Select("Camiones");

console.log(camiones.databaseName);
Select("Bodegas");
Select("Camiones");