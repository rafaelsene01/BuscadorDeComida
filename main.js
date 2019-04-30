const domuscatore = require('./sites/domuscatore');

const nome_limento = 'mandioca';

(async () => {
    await domuscatore.alimento(nome_limento).then(resposta => {
        console.log(resposta);
    })
})();