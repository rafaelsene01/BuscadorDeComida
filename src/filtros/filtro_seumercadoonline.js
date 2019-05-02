const cheerio = require('cheerio');

exports.alimento = async (html) => {

    const $ = cheerio.load(html);

    let urlImgAlimento = [];
    let urllinkAlimento = [];
    let nomeAlimento = [];
    let valorAlimento = [];
    $('html body #wrapper #content div div section div div.col-md-4.col-sm-4.col-xs-6 div.box-produto div.product.iproduct.clearfix div.product-image a img').each((i, el) => {
        urlImgAlimento.push('https://seumercadoonline.com' + $(el).attr("src").trim());
    });
    $('html body #wrapper #content div div section div div.col-md-4.col-sm-4.col-xs-6 div.box-produto div.product.iproduct.clearfix div.product-image a img').each((i, el) => {
        nomeAlimento.push($(el).attr("alt").trim());
    });
    $('html body #wrapper #content div div section div div.col-md-4.col-sm-4.col-xs-6 div.box-produto div.product.iproduct.clearfix div.product-image a').each((i, el) => {
        urllinkAlimento.push('https://seumercadoonline.com' + $(el).attr("href").trim());
    });
    $('html body #wrapper #content div div section div div.col-md-4.col-sm-4.col-xs-6 div.box-produto div.product.iproduct.clearfix div.product-price div.row div.col-sm-9 ins').each((i, el) => {
        valorAlimento.push($(el).text().replace('R$', '').replace(',', ".").trim());
    });
    let alimento = [];
    for (let i = 0; i < urllinkAlimento.length; i++) {
        if (nomeAlimento[i] != null && urlImgAlimento[i] != null && valorAlimento[i] != null && urllinkAlimento[i] != null)
            alimento.push({
                nome: nomeAlimento[i],
                img: urlImgAlimento[i],
                valor: Number(valorAlimento[i]),
                link: urllinkAlimento[i],
                site: 'seumercadoonline'
            });
    }

    return alimento;
}