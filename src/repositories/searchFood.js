'use strict';

const domuscatore = require('../sites/domuscatore');
const seumercadoonline = require('../sites/seumercadoonline');
const praticosupermercado = require('../sites/praticosupermercado');
const apoioentrega = require('../sites/apoioentrega');

exports.get = async (nome_limento) => {

    let lista_alimentos = [];

    await Promise.all([praticosupermercado.alimento(nome_limento)]).then(function (resposta) {
        resposta.forEach(element => {
            element.forEach(alimento => {
                lista_alimentos.push(alimento);
            })
        });
    });

    return lista_alimentos;
}