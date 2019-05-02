const puppeteer = require('puppeteer');
const filtro = require('../filtros/filtro_praticosupermercado')

exports.alimento = async (nome_alimento) => {

    let lista_alimento = [];

    const browser = await puppeteer.launch({ args: ['--no-sandbox'] });
    const page = await browser.newPage();
    await page.goto('https://www.praticosupermercado.com.br/');
    await page.type('html body header#header div div.search.q form input.q', nome_alimento);
    await page.keyboard.press('Enter');
    await page.waitForNavigation();
    await page.content().then(html => {
        lista_alimento = filtro.alimento(html);
    })
    await browser.close();

    return lista_alimento;
}