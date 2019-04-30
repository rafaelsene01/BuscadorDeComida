const domuscatore = require('./sites/domuscatore');
const seumercadoonline = require('./sites/seumercadoonline');

const nome_limento = 'mandioca';
let lista_alimentos = [];

(async () => {

    var antes = Date.now();

    await Promise.all([domuscatore.alimento(nome_limento), seumercadoonline.alimento(nome_limento)]).then(function (resposta) {
        lista_alimentos = resposta;
    });

    await console.log(lista_alimentos);

    var duracao = Date.now() - antes;
    await console.log("levou " + duracao + "ms");
})();