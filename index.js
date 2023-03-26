const express = require('express');
const db = require('./config/connection');
// run npm install mongodb and require mongodb and mongoClietn class
const routes = require('./routes')
const {MongoClient} = require ('mongodb');

const app = express();
const port = 3001;
//connection sting to local instance of MongoDB
const connectionStringURI = 'mongodb://127.0.0.1:27017'

//Initialize a new instance of MongoClient
const client = new MongoClient(connectionStringURI);

//Declae a variable to hold the connection
let db;

//Create variable to hold our database name
const dbName = 'socialDB';

//Connect method to connect to mongo server
client.connect()
.then(()=> {
console.log('Connected successsfully to MongoDB');
// Use client.db() constructor to add new db instance
db = client.db(dbname);

//start up express server
app.listen(port, ()=>{
    console.log(`app listening at http://localhost:${port}`);
});
})
.catch((err) => {
    console.log ('Mongo connection error:' err.message);
});