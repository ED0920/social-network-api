const express = require('express');
const db = require('./config/connection');
// run npm install mongodb and require mongodb and mongoClietn class
const routes = require('./routes')


const app = express();
const PORT = 3001;

app.use(express.urlencoded({ extended: true}));
app.use(express.json());
app.use(routes);

//connection sting to local instance of MongoDB
const connectionStringURI = 'mongodb://127.0.0.1:27017';


//start up express server
db.once('open', () => {
    app.listen(PORT, () => {
        console.log(`API server is running on ${PORT}!`)
    })
})