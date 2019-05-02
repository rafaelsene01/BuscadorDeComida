'use strict';

const domuscatore = require('../sites/domuscatore');
const seumercadoonline = require('../sites/seumercadoonline');
const praticosupermercado = require('../sites/praticosupermercado');
const apoioentrega = require('../sites/apoioentrega');

exports.get = async (nome_limento) => {

    let lista_alimentos = [];

    await Promise.all([
        domuscatore.alimento(nome_limento).catch(erro => { return [] }),
        seumercadoonline.alimento(nome_limento).catch(erro => { return [] }),
        praticosupermercado.alimento(nome_limento).catch(erro => { return [] }),
        apoioentrega.alimento(nome_limento).catch(erro => { return [] })]).then(function (resposta) {
            resposta.forEach(element => {
                element.forEach(alimento => {
                    lista_alimentos.push(alimento);
                })
            });
        });

    return lista_alimentos;
}