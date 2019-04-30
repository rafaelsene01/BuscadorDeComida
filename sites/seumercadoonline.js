const puppeteer = require('puppeteer');
const filtro = require('../filtros/filtro_seumercadoonline')

exports.alimento = async (nome_alimento) => {

    let lista_alimento = [];

    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto('https://seumercadoonline.com/');
    await page.type('html body #wrapper #header div div div form.busca input#q.input-busca.form-control.ui-autocomplete-input.parsley-validated', nome_alimento);
    await page.keyboard.press('Enter');
    await page.waitForNavigation();
    await page.content().then(html => {
        lista_alimento = filtro.alimento(html);
    })
    await browser.close();

    return lista_alimento;
}