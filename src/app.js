'use strict';

const express = require('express');
const app = express();
const router = express.Router();

// Habilita o CORS/*
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", '*');
    res.header("Access-Control-Allow-Credentials", true);
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header("Access-Control-Allow-Headers", 'Origin,X-Requested-With,Content-Type,Accept,content-type,application/json');
    next();
});

//Rotas
const index = require('./routes/index.js');
const search = require('./routes/searchRoute.js');
app.use('/', index);
app.use('/search', search);

module.exports = app; 