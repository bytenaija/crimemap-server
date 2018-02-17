const express = require('express');
const bodyParser = require("body-parser");
const app = express();


const crimeroutes = require('./app/routes/crime.routes');
const userroutes = require('./app/routes/user.routes');

const morgan = require('morgan');

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

const dbConfig = require("./config/database.config.js");
const jwtConfig = require("./config/jwt.config");
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

mongoose.connect(dbConfig.url);

mongoose.connection.on('error', function() {
    console.log('Could not connect to the database. Exiting now...');
    process.exit();
});

mongoose.connection.once('open', function() {
    console.log("Successfully connected to the database");
})

app.use(morgan('dev'));




app.use('/api/', crimeroutes);
app.use('/api/user/', userroutes);
app.listen(3000, ()=>{
    console.log("Server is listening on port 3000");
});