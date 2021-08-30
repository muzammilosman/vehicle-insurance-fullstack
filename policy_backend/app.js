const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const keys = require('./config/keys')
const mongoose = require('mongoose')
const cors = require('cors')
const { readCSVFile } = require('./scripts/index')

// database connection
mongoose.connect(keys.database)

mongoose.connection.on('connected', () => {
    console.log("Database connected")
})

mongoose.connection.on('error', (err) => {
    console.log("Database error:", err)
})

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());
app.options('*', cors());

// readCSVFile();     

app.use('/', require('./routes/index'));


app.listen(3000, () => {
  console.log('App listening on Port 3000')
})