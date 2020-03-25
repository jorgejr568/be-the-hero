// Setup express
const express = require('express')
const app = express()

// Setup dotenv
require('dotenv').config();


// Use JSON format for requests
app.use(express.json())


// Setup cors
const cors = require('cors');
app.use(cors())


// Register api routes
app.use('/api', require('./routes'))


// Listen requests
const {APP_PORT} = process.env;
app.listen(APP_PORT);
