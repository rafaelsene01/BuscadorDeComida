const puppeteer = require('puppeteer');
const filtro = require('../filtros/filtro_domuscatore')

exports.alimento = async (nome_alimento) => {

    let lista_alimento = [];

    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto('https://domuscatore.com/');
    await page.type('html body #wrapper #header div #wide-nav div div ul li div div form.searchform div.flex-row.relative div.flex-col.flex-grow input.search-field.mb-0', nome_alimento);
    await page.keyboard.press('Enter');
    await page.waitForNavigation();
    await page.content().then(html => {
        lista_alimento = filtro.alimento(html);
    })
    await browser.close();

    return lista_alimento;
}