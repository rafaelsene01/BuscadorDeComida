const cheerio = require('cheerio');

exports.alimento = async (html) => {

    const $ = cheerio.load(html);

    let urlImgAlimento = [];
    let urllinkAlimento = [];
    let nomeAlimento = [];
    let valorAlimento = [];
    $('html body div#wrapper main#main div div div.products.row.row-small.large-columns-5.medium-columns-3.small-columns-2.has-equal-box-heights.equalize-box ' +
        'div.product-small.col.has-hover div.col-inner div.product-small.box div.box-image div.image-fade_in_back a img').each((i, el) => {
            urlImgAlimento.push($(el).attr("src").trim());
        });
    $('html body div#wrapper main#main div div div.products.row.row-small.large-columns-5.medium-columns-3.small-columns-2.has-equal-box-heights.equalize-box ' +
        'div.product-small.col.has-hover div.col-inner div.product-small.box div.box-text.box-text-products div p').each((i, el) => {
            nomeAlimento.push($(el).text().trim());
        });
    $('html body div#wrapper main#main div div div.products.row.row-small.large-columns-5.medium-columns-3.small-columns-2.has-equal-box-heights.equalize-box ' +
        'div.product-small.col.has-hover div.col-inner div.product-small.box div.box-text.box-text-products div p a').each((i, el) => {
            urllinkAlimento.push($(el).attr("href").trim());
        });
    $('html body div#wrapper main#main div div div.products.row.row-small.large-columns-5.medium-columns-3.small-columns-2.has-equal-box-heights.equalize-box ' +
        'div.product-small.col.has-hover div.col-inner div.product-small.box div.box-text.box-text-products div.price-wrapper span.price span.woocommerce-Price-amount.amount').each((i, el) => {
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
                site: 'domuscatore'
            });
    }

    return alimento;
}