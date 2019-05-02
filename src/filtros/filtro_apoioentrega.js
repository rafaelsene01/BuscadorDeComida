const cheerio = require('cheerio');

exports.alimento = async (html) => {

    const $ = cheerio.load(html);

    let urlImgAlimento = [];
    let urllinkAlimento = [];
    let nomeAlimento = [];
    let valorAlimento = [];
    $('html #departament-page div div div div div div ul #nm-product- div a img').each((i, el) => {
        urlImgAlimento.push($(el).attr("src").trim());
    });
    $('html #departament-page div div div div div div ul #nm-product- div.nm-product-info h2 a').each((i, el) => {
        nomeAlimento.push($(el).text().trim());
    });
    $('html #departament-page div div div div div div ul #nm-product- div a').each((i, el) => {
        urllinkAlimento.push($(el).attr("href").trim());
    });
    $('html #departament-page div div div div div div ul #nm-product- div.nm-product-info div.nm-offer span.nm-price-per-un').each((i, el) => {
        const item = $(el).text().replace(/\s\s+/g, '').replace(' ', '').replace('Por:R$', '').replace('und', '').replace(',', '.').trim();
        valorAlimento.push(item);
    });
    let alimento = [];

    for (let i = 0; i < urllinkAlimento.length; i++) {
        if (nomeAlimento[i] != null && urlImgAlimento[i] != null && valorAlimento[i] != null && urllinkAlimento[i] != null)
            alimento.push({
                nome: nomeAlimento[i],
                img: urlImgAlimento[i],
                valor: Number(valorAlimento[i]),
                link: urllinkAlimento[i],
                site: 'apoioentrega'
            });
    }

    return alimento;
}