# BuscadorDeComida

Este projeto busca produtos para pre�os assim como Buscap� ou Zoom, por�m focado em mercados online.

### Installation

```bash
npm install

# para instalar => puppeteer, cheerio and express.
```

### Heroku

Se utilizar heroku � importante fazer os seguintes ajustes....

```bash
puppeteer.launch({ args: ['--no-sandbox'] });
# n�o esque�a de usar o args.

$ heroku buildpacks:set https://github.com/jontewks/puppeteer-heroku-buildpack.git
# github => https://github.com/jontewks/puppeteer-heroku-buildpack.git
```