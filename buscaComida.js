const puppeteer = require('puppeteer');
const cheerio = require('cheerio');

/*
(async () => {
    var antes = Date.now();

    await domuscatore();

    //await Promise.all([
    //page.waitForNavigation(),
    //page.click('html body aside#sidebar.column ul li.icn_users a')
    //]);

    var duracao = Date.now() - antes;
    await console.log("levou " + duracao + "ms");
})();
*/

exports.domuscatore = async (nome_alimento) => {

    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto('https://domuscatore.com/');

    await page.type('html body #wrapper #header div #wide-nav div div ul li div div form.searchform div.flex-row.relative div.flex-col.flex-grow input.search-field.mb-0', nome_alimento);

    //await page.waitForSelector('html body #wrapper #header div #wide-nav div div ul li div div button.ux-search-submit.submit-button.secondary.button.icon.mb-0.loading', { reverse: false });

    await page.keyboard.press('Enter');

    //await page.waitForSelector('html body div#wrapper main#main');
    await page.waitForNavigation();

    await page.content().then(html => {
        buscarAlimentos(html);
    })

    await browser.close();
}

async function buscarAlimentos(html) {

    const $ = cheerio.load(html);

    var urlImgAlimento = [];
    var urllinkAlimento = [];
    var nomeAlimento = [];
    var valorAlimento = [];
    /*
        $('html body div#wrapper main#main div div div.products.row.row-small.large-columns-5.medium-columns-3.small-columns-2.has-equal-box-heights.equalize-box ' +
            'div.product-small.col.has-hover div.col-inner div.product-small.box').each((i, el) => {
                const item = $(el).text().replace(/\s\s+/g, '');
    
                console.log(item);
            });
            */

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

    console.log(alimento);
}