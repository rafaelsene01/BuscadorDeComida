'use strict';

const domuscatore = require('../sites/domuscatore');
const seumercadoonline = require('../sites/seumercadoonline');

exports.get = async (nome_limento) => {

    let lista_alimentos = [];

    await Promise.all([domuscatore.alimento(nome_limento), seumercadoonline.alimento(nome_limento)]).then(function (resposta) {
        lista_alimentos = resposta;
    });

    return lista_alimentos;
}