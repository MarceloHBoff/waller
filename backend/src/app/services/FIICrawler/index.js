import cheerio from 'cheerio';
import puppeteer from 'puppeteer';

const EmailSelector = '#inputEmail';
const PasswordSelector = '#inputPassword';
const SubmitSelector = '.mt-4';
const ProventosButton = '.fa-usd';
const Url = 'https://www.meusdividendos.com/login';

async function getDividends(html) {
  const $ = cheerio.load(html);

  const years = [];
  const dividends = [];
  let month = -1;

  $('table.table-hover')
    .last()
    .find('th')
    .each((ir, row) => {
      $(row)
        .find('span')
        .each((ic, cell) => {
          years.push(Number($(cell).text().trim()));
        });
    });

  $('table.table-hover')
    .last()
    .find('tr')
    .each((ir, row) => {
      let year = 0;

      $(row)
        .find('td')
        .each((ic, cell) => {
          if (ic === 0) {
            month++;
          } else {
            dividends.push({
              month,
              year: years[year],
              value: Number($(cell).find('span').first().text().trim()),
            });

            year++;
          }
        });
    });

  return dividends;
}

export default async function FIICrawler(fiiArray) {
  const browser = await puppeteer.launch({
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });
  const page = await browser.newPage();

  page.setViewport({ width: 1400, height: 800 });
  page.setDefaultNavigationTimeout(100000);

  await page.goto(Url);
  await page.click(EmailSelector);
  await page.keyboard.type(process.env.EMAIL_MY_DIVENDS);
  await page.click(PasswordSelector);
  await page.keyboard.type(process.env.PASSWORD_MY_DIVENDS);
  await page.click(SubmitSelector);

  try {
    await page.waitForNavigation();
  } catch (err) {
    return false;
  }

  const html = await page.content();

  if (!html) return false;

  const dividends = [];

  for (let i = 0; i < fiiArray.length; i++) {
    const fii = fiiArray[i].code.substr(0, 4);

    await page.goto(`https://www.meusdividendos.com/fundo-imobiliario/${fii}`, {
      waitUntil: 'domcontentloaded',
    });

    await page.click(ProventosButton);

    const dataDividends = await getDividends(await page.content());

    dividends.push({
      fii: fiiArray[i].code,
      data: dataDividends,
    });
  }

  await browser.close();

  return dividends;
}
