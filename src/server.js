require('dotenv').config();

const bodyParser = require('body-parser');
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const semesterData = require('./models/semesterData');

const connectToDB = require('./services/connectDB');

const adminRoute = require('./routes/adminRoute');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

// CONNECTING TO DB

connectToDB(process.env.MONGO_PASSWORD);

// API

app.use('/admin', adminRoute);

const PORT = process.env.PORT || 3100;

app.listen(PORT, (req, res) => {
    console.log('http://localhost:3100');
});
