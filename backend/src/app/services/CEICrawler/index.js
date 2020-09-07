import cheerio from 'cheerio';
import puppeteer from 'puppeteer';

import UserActive from '../../models/UserActive';

import { getActive, getActiveBond } from '../activeUtils';

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

let actives = [];
let bonds = [];

function getDataByHTML(html) {
  const $ = cheerio.load(html);
  let charge = true;

  $('.responsive').each((_, table) => {
    $(table)
      .find('tr')
      .each((ir, row) => {
        const footLine = $(row)
          .text()
          .trim();

        if (footLine.substr(0, 13) === 'Total Compra:') charge = false;

        if (charge) {
          const data = {};

          $(row)
            .find('td')
            .each((ic, cell) => {
              const value = $(cell)
                .text()
                .trim();

              if (value !== '') {
                switch (ic) {
                  case 0:
                    data.buyDate = new Date(
                      value.substr(6, 9),
                      Number(value.substr(3, 2)) - 1,
                      value.substr(0, 2)
                    );
                    break;
                  case 1:
                    data.type = value;
                    break;
                  case 4:
                    if (value[value.length - 1] === 'F') {
                      data.code = value.substring(0, value.length - 1);
                    } else {
                      data.code = value;
                    }
                    break;
                  case 6:
                    data.amount = Number(value);
                    break;
                  case 7:
                    value.replace('.', '');
                    data.price = Number(value.replace(',', '.')).toFixed(2);
                    break;
                  default:
                    break;
                }
              }
            });

          if (Object.keys(data).length !== 0) actives.push(data);
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
                data.name = value;
                break;
              case 1:
                data.dueDate = new Date(
                  value.substr(6, 9),
                  Number(value.substr(3, 2)) - 1,
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
  actives = [];
  bonds = [];

  const browser = await puppeteer.launch({
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });
  const page = await browser.newPage();

  page.setViewport({ width: 1400, height: 800 });
  page.setDefaultNavigationTimeout(100000);

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

  const $ = cheerio.load(await page.content());

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

  await UserActive.destroy({
    where: {
      userId: req.userId,
      automatic: true,
    },
  });

  await page.setDefaultTimeout(10000);

  for (let i = 0; i < options.length; i++) {
    await page.click(BrokerSelector);
    await page.keyboard.type(options[i]);
    await page.focus(SubmitSelector);
    await page.waitFor(500);
    await page.click(SubmitSelector);

    try {
      await page.waitFor(500);
      await page.waitForSelector(TableSelector);
      getDataByHTML(await page.content());
      await page.waitFor(500);
    } catch (err) {}
    await page.waitFor(500);
    await page.focus(SubmitSelector);
    await page.click(SubmitSelector);
    await page.waitFor(500);
  }

  await page.goto(UrlBond);

  for (let i = 0; i < options.length; i++) {
    await page.focus(BrokerSelector);
    await page.keyboard.type(options[i]);
    await page.waitFor(500);
    await page.click(CountSelector);
    await page.keyboard.press('ArrowDown');
    await page.keyboard.press('Enter');
    await page.focus(SubmitSelector);
    await page.click(SubmitSelector);

    try {
      await page.waitFor(500);
      await page.waitForSelector(TitleTableSelector);
      getDataByHTMLBonds(await page.content());
      await page.waitFor(500);
    } catch (err) {}
    await page.waitFor(500);
    await page.focus(SubmitSelector);
    await page.click(SubmitSelector);
    await page.waitFor(500);
  }

  await page.waitFor(2000);

  for (let i = 0; i < actives.length; i++) {
    const active = await getActive(actives[i].code);

    try {
      const userActive = await UserActive.findOne({
        where: {
          userId: req.userId,
          activeId: active.id,
          buyDate: actives[i].buyDate,
        },
      });

      actives[i].price = Number(actives[i].price);

      if (actives[i].code === 'SQIA3') {
        actives[i].amount = Number(actives[i].amount * 4);
        actives[i].price = Number(actives[i].price / 4);
      }

      if (actives[i].code.substr(0, 4) === 'SAPR') {
        actives[i].amount = Number(actives[i].amount * 3);
        actives[i].price = Number(actives[i].price / 3);
      }

      if (userActive) {
        let amount = 0;
        let totalValue = 0;
        let newTotalValue = 0;
        let avP = 0;

        if (actives[i].type === 'C') {
          amount = userActive.amount + actives[i].amount;
          totalValue = userActive.value * userActive.amount;
          newTotalValue = actives[i].price * actives[i].amount;
          avP = (totalValue + newTotalValue) / amount;
        } else {
          amount = userActive.amount - actives[i].amount;
          avP = (userActive.value + actives[i].price) / 2;
        }

        await userActive.update({
          amount,
          value: avP,
          automatic: true,
        });
      } else {
        await UserActive.create({
          userId: req.userId,
          activeId: active.id,
          amount: actives[i].amount,
          buyDate: actives[i].buyDate,
          value: actives[i].price,
          automatic: true,
        });
      }
    } catch (err) {
      console.log(err);
    }
  }

  await page.waitFor(2000);
  await browser.close();

  for (let i = 0; i < bonds.length; i++) {
    const active = await getActiveBond(bonds[i].name);

    await UserActive.findOrCreate({
      where: {
        userId: req.userId,
        activeId: active.id,
        amount: 1,
        value: bonds[i].value,
        dueDate: bonds[i].dueDate,
        nowValue: bonds[i].nowValue,
        automatic: true,
      },
    });
  }

  return true;
}
