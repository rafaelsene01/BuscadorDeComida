const puppeteer = require('puppeteer');
const filtro = require('../filtros/filtro_apoioentrega')

exports.alimento = async (nome_alimento) => {

    let lista_alimento = [];

    const browser = await puppeteer.launch({ args: ['--no-sandbox'] });
    const page = await browser.newPage();
    await page.goto('https://www.apoioentrega.com/');
    await page.type('#nm-custom-autocomplete', nome_alimento);
    await page.keyboard.press('Enter');
    await page.waitForNavigation();
    await page.content().then(html => {
        lista_alimento = filtro.alimento(html);
    })
    await browser.close();

    return lista_alimento;
}