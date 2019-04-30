const cheerio = require('cheerio');

exports.alimento = async (html) => {

    const $ = cheerio.load(html);

    var urlImgAlimento = [];
    var urllinkAlimento = [];
    var nomeAlimento = [];
    var valorAlimento = [];
    $('html body div#wrapper main#main div div div.products.row.row-small.large-columns-5.medium-columns-3.small-columns-2.has-equal-box-heights.equalize-box ' +
        'div.product-small.col.has-hover div.col-inner div.product-small.box div.box-image div.image-fade_in_back a img').each((i, el) => {
            const item = $(el).attr("src");
            urlImgAlimento.push(item);
        });
    $('html body div#wrapper main#main div div div.products.row.row-small.large-columns-5.medium-columns-3.small-columns-2.has-equal-box-heights.equalize-box ' +
        'div.product-small.col.has-hover div.col-inner div.product-small.box div.box-text.box-text-products div p').each((i, el) => {
            nomeAlimento.push($(el).text());
        });
    $('html body div#wrapper main#main div div div.products.row.row-small.large-columns-5.medium-columns-3.small-columns-2.has-equal-box-heights.equalize-box ' +
        'div.product-small.col.has-hover div.col-inner div.product-small.box div.box-text.box-text-products div p a').each((i, el) => {
            urllinkAlimento.push($(el).attr("href"));
        });
    $('html body div#wrapper main#main div div div.products.row.row-small.large-columns-5.medium-columns-3.small-columns-2.has-equal-box-heights.equalize-box ' +
        'div.product-small.col.has-hover div.col-inner div.product-small.box div.box-text.box-text-products div.price-wrapper span.price span.woocommerce-Price-amount.amount').each((i, el) => {
            //const item = $(el).text().replace(/\s\s+/g, '').replace('\n', '');
            valorAlimento.push($(el).text().replace('R$', ''));
        });
    var alimento = [];
    for (let i = 0; i < urllinkAlimento.length; i++) {
        alimento.push({
            nome: nomeAlimento[i],
            img: urlImgAlimento[i],
            valor: valorAlimento[i],
            link: urllinkAlimento[i],
            site: 'domuscatore'
        })
    }

    return alimento;
}