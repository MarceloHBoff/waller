import axios from 'axios';
import cheerio from 'cheerio';
import fs from 'fs';
import puppeteer from 'puppeteer';

import Fundamentals from '../../models/Fundamentals';

const Url = 'https://www.ivalor.com.br/empresas/';

export default async function stockCrawler(stock) {
  const api = axios.create({ responseType: 'stream' });

  const browser = await puppeteer.launch({
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });

  const page = await browser.newPage();

  page.setViewport({ width: 1400, height: 800 });
  page.setDefaultNavigationTimeout(1000000);

  await page.goto(`${Url}${stock}`);

  let $ = cheerio.load(await page.content());

  const stockData = {};

  const html = $('td.text-left.text-gray');

  stockData.cnpj = html.first().text();
  stockData.description = html.eq(1).text();
  stockData.sector = `${html.eq(2).text()} - ${html.eq(3).text()} - ${html
    .eq(4)
    .text()}`;
  stockData.ri = html.eq(5).text();

  const date = html.eq(7).text();
  stockData.ipo = new Date(
    date.substr(6, 9),
    Number(date.substr(3, 2)) - 1,
    date.substr(0, 2)
  );

  const years = [];
  const valuesData = [];

  $('#tabela_receita_lucro_a > thead > tr > th').each((ir, row) => {
    const text = $(row)
      .text()
      .trim();

    if (text && text !== 'bar_chart') years.push(text);
  });

  let data = [];
  $('#tabela_receita_lucro_a > tbody > tr').each((_, row) => {
    data = [];
    $(row)
      .find('td')
      .each((i, td) => {
        const text = $(td)
          .text()
          .trim();
        if (text && text !== 'bar_chart') {
          data.push(text.replace(',', '.').replace('%', ''));
        }
      });

    valuesData[data[0]] = data;
  });

  if (!fs.existsSync(`media/images/${stock}.svg`)) {
    await page.goto(`https://fundamentei.com/br/${stock}`);

    $ = cheerio.load(await page.content());

    const response = await api.get($('div.css-sey8hx > img').attr('src'));

    response.data.pipe(fs.createWriteStream(`media/images/${stock}.svg`));
  }

  await browser.close();

  for (let i = 0; i < years.length; i++) {
    const fundamentals = await Fundamentals.findOne({
      where: {
        code: stock,
        year: years[i],
      },
    });

    if (fundamentals) {
      await fundamentals.update({
        revenue: valuesData['Receita Líquida'][i + 1].replace('.', ''),
        margin: valuesData['Margem Bruta'][i + 1],
        ebitda: valuesData.EBIT[i + 1].replace('.', '').replace('.', ''),
        margin_ebitda: valuesData['Margem EBIT'][i + 1],
        financial_result: valuesData['Resultado Financeiro']
          ? valuesData['Resultado Financeiro'][i + 1].replace('.', '')
          : null,
        profit: valuesData['Lucro Líquido'][i + 1].replace('.', ''),
      });
    } else {
      await Fundamentals.create({
        code: stock,
        year: years[i],
        revenue: valuesData['Receita Líquida'][i + 1].replace('.', ''),
        margin: valuesData['Margem Bruta'][i + 1],
        ebitda: valuesData.EBIT[i + 1].replace('.', ''),
        margin_ebitda: valuesData['Margem EBIT'][i + 1],
        financial_result: valuesData['Resultado Financeiro']
          ? valuesData['Resultado Financeiro'][i + 1].replace('.', '')
          : null,
        profit: valuesData['Lucro Líquido'][i + 1].replace('.', ''),
      });
    }
  }

  return stockData;
}
