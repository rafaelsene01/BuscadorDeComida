const cheerio = require('cheerio');

exports.alimento = async (html) => {

    const $ = cheerio.load(html);

    let urlImgAlimento = [];
    let urllinkAlimento = [];
    let nomeAlimento = [];
    let valorAlimento = [];
    $('html body section#produtos div div div div div ul li a div img').each((i, el) => {
        urlImgAlimento.push($(el).attr("src").trim());
    });
    $('html body section#produtos div div div div div ul li span.title').each((i, el) => {
        nomeAlimento.push($(el).text().trim());
    });
    $('html body section#produtos div div div div div ul li a').each((i, el) => {
        urllinkAlimento.push('https://www.praticosupermercado.com.br' + $(el).attr("href").trim());
    });
    $('html body section#produtos div div div div div ul li div div.preco__final').each((i, el) => {
        valorAlimento.push($(el).text().replace('R$', '').replace(',', '.').trim());
    });
    let alimento = [];
    for (let i = 0; i < urllinkAlimento.length; i++) {
        alimento.push({
            nome: nomeAlimento[i],
            img: urlImgAlimento[i],
            valor: Number(valorAlimento[i]),
            link: urllinkAlimento[i],
            site: 'praticosupermercado'
        })
    }

    return alimento;
}