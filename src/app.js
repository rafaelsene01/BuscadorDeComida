'use strict';

const express = require('express');
const app = express();
const router = express.Router();

//Rotas

const index = require('./routes/index.js');
const search = require('./routes/searchRoute.js');
app.use('/', index);
app.use('/search', search);

// Habilita o CORS/*
app.use(function (req, res, next) {
    res.header('Content-type: application/json');
    res.header('Access-Control-Allow-Origin', '*');
    res.header("Access-Control-Allow-Credentials", "true");
    res.header('Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    next();
});

module.exports = app; 