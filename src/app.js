'use strict';

const express = require('express');
const app = express();
const router = express.Router();
const cors = require('cors')

//Rotas

const index = require('./routes/index.js');
const search = require('./routes/searchRoute.js');
app.use('/', index);
app.use('/search', search);

// Habilita o CORS/*
app.use(cors());
/*
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, x-access-token');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    next();
});*/

module.exports = app; 