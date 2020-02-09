import puppeteer from 'puppeteer';
import cheerio from 'cheerio';

import getStock from '../getStock';

import UserStock from '../../models/UserStock';
import Bond from '../../models/Bond';

const UsernameSelector = '#ctl00_ContentPlaceHolder1_txtLogin';
const PasswordSelector = '#ctl00_ContentPlaceHolder1_txtSenha';
const BrokerSelector = '#ctl00_ContentPlaceHolder1_ddlAgentes';
const CountSelector = '#ctl00_ContentPlaceHolder1_ddlContas';
const TitleTableSelector = '#ctl00_ContentPlaceHolder1_lblTituloTabela';
const TableSelector =
  '#ctl00_ContentPlaceHolder1_rptAgenteBolsa_ctl00_rptContaBolsa_ctl00_lblAgente';
const SubmitSelector = 'input[type=submit]';

const UrlLogin = 'https://cei.b3.com.br/CEI_Responsivo/login.aspx';
const UrlNegociation =
  'https://cei.b3.com.br/CEI_Responsivo/negociacao-de-ativos.aspx';
const UrlBond =
  'https://cei.b3.com.br/CEI_Responsivo/extrato-tesouro-direto.aspx';

const stocks = [];
const bonds = [];

function getDataByHTML(html) {
  const $ = cheerio.load(html);
  let charge = false;

  $('.responsive').each((_, table) => {
    $(table)
      .find('tr')
      .each((ir, row) => {
        const headLine = $(row)
          .find('th:nth-child(1)')
          .text()
          .trim();

        if (headLine === 'Cód.') charge = true;

        if (charge) {
          const data = {};

          $(row)
            .find('td')
            .each((ic, cell) => {
              const value = $(cell)
                .text()
                .trim();

              switch (ic) {
                case 0:
                  if (value[value.length - 1] === 'F') {
                    data.code = value.substring(0, value.length - 1);
                  } else {
                    data.code = value;
                  }
                  break;
                case 4:
                  value.replace('.', '');
                  data.price = Number(value.replace(',', '.')).toFixed(2);
                  break;
                case 6:
                  data.amount = Number(value);
                  break;
                default:
                  break;
              }
            });

          if (Object.keys(data).length !== 0) stocks.push(data);
        }
      });
  });
}

function getDataByHTMLBonds(html) {
  const $ = cheerio.load(html);

  $('.responsive tbody').each((_, table) => {
    $(table)
      .find('tr')
      .each((ir, row) => {
        const data = {};

        $(row)
          .find('td')
          .each((i, cell) => {
            let value = $(cell)
              .text()
              .trim();

            switch (i) {
              case 0:
                data.title = value;
                break;
              case 1:
                data.dueDate = new Date(
                  value.substr(6, 9),
                  value.substr(3, 2),
                  value.substr(0, 2)
                );
                break;
              case 2:
                value = value.replace('.', '');
                data.value = Number(value.replace(',', '.')).toFixed(2);
                break;
              case 4:
                value = value.replace('.', '');
                data.nowValue = Number(value.replace(',', '.')).toFixed(2);
                data.nowRentability =
                  (Number(data.nowValue) / Number(data.value) - 1) * 100;
                break;
              default:
                break;
            }
          });

        if (Object.keys(data).length !== 0) bonds.push(data);
      });
  });
}

export default async function CEICrawler(req) {
  const browser = await puppeteer.launch({
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });
  const page = await browser.newPage();

  page.setViewport({ width: 1400, height: 800 });
  page.setDefaultNavigationTimeout(80000);

  await page.goto(UrlLogin);
  await page.click(UsernameSelector);
  await page.keyboard.type(req.body.cpf);
  await page.click(PasswordSelector);
  await page.keyboard.type(req.body.password);
  await page.click(SubmitSelector);

  try {
    await page.waitForNavigation();
  } catch (err) {
    return false;
  }

  await page.goto(UrlNegociation);
  const options = [];

  const html = await page.content();
  const $ = cheerio.load(html);

  if (!html) return false;

  $(BrokerSelector).each((_, table) => {
    $(table)
      .find('option')
      .each((io, op) => {
        const option = $(op)
          .text()
          .trim();
        if (option !== 'Selecione') {
          const [optionNumber] = option.split(' - ');
          options.push(optionNumber);
        }
      });
  });

  await UserStock.destroy({
    where: {
      userId: req.userId,
      automatic: true,
    },
  });

  await Bond.destroy({
    where: {
      userId: req.userId,
      automatic: true,
    },
  });

  await page.setDefaultTimeout(2000);

  for (let i = 0; i < options.length; i++) {
    await page.click(BrokerSelector);
    await page.keyboard.type(options[i]);
    await page.focus(SubmitSelector);
    await page.waitFor(300);
    await page.click(SubmitSelector);

    try {
      await page.waitFor(100);
      await page.waitForSelector(TableSelector);
      getDataByHTML(await page.content());
    } catch (err) {}
    await page.waitFor(100);
    await page.focus(SubmitSelector);
    await page.click(SubmitSelector);
    await page.waitFor(500);
  }

  await page.goto(UrlBond);

  for (let i = 0; i < options.length; i++) {
    await page.focus(BrokerSelector);
    await page.keyboard.type(options[i]);
    await page.waitFor(300);
    await page.click(CountSelector);
    await page.keyboard.press('ArrowDown');
    await page.keyboard.press('Enter');
    await page.focus(SubmitSelector);
    await page.click(SubmitSelector);

    try {
      await page.waitFor(100);
      await page.waitForSelector(TitleTableSelector);
      getDataByHTMLBonds(await page.content());
    } catch (err) {}
    await page.waitFor(100);
    await page.focus(SubmitSelector);
    await page.click(SubmitSelector);
    await page.waitFor(500);
  }

  for (let i = 0; i < stocks.length; i++) {
    const stockBase = await getStock(stocks[i].code);

    try {
      const userStock = await UserStock.findOne({
        where: {
          userId: req.userId,
          stockId: stockBase.id,
        },
      });

      stocks[i].price = Number(stocks[i].price);

      if (stocks[i].code === 'SQIA3') {
        stocks[i].amount = Number(stocks[i].amount * 4);
        stocks[i].price = Number(stocks[i].price / 4);
      }

      if (userStock) {
        const amount = userStock.amount + stocks[i].amount;
        const avP = (userStock.averagePrice + stocks[i].price) / 2;
        await userStock.update({
          amount,
          averagePrice: avP,
          automatic: true,
        });
      } else {
        await UserStock.create({
          userId: req.userId,
          stockId: stockBase.id,
          amount: stocks[i].amount,
          averagePrice: stocks[i].price,
          automatic: true,
        });
      }
    } catch (err) {
      console.log(err);
    }
  }

  for (let i = 0; i < bonds.length; i++) {
    await Bond.create({
      userId: req.userId,
      title: bonds[i].title,
      value: bonds[i].value,
      nowValue: bonds[i].nowValue,
      nowRentability: bonds[i].nowRentability,
      dueDate: bonds[i].dueDate,
      automatic: true,
    });
  }

  await browser.close();

  return true;
}
