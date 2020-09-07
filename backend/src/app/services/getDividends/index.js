import axios from 'axios';
import cheerio from 'cheerio';
import { isBefore, lastDayOfMonth } from 'date-fns';

import Dividend from '../../models/Dividend';

import { Units } from '../../../util/convertUnits';
import { getActive } from '../activeUtils';
import FIICrawler from '../FIICrawler';

export async function getDividends(code) {
  const response = await axios.get(
    `http://www.dividendobr.com/lib/search.php?q=${code.substr(0, 4)}`
  );

  const $ = cheerio.load(response.data);
  const div = [];

  const typeRegex = /^.{1,10} /;
  const value1Regex = /\[(\d|\S){1,25}\]./;
  const value2Regex = /\[(\d|\S){1,25}\]$/;
  const code1Regex = /\(....3\)/;
  const code2Regex = /\(....4\)/;
  const dateAprovedRegex = /aprovado em:.{1,11}/;
  const dateEXRegex = /ex em:.{1,11}/;
  const datePayRegex = /pagamento em:.{1,11}/;

  $('li').each((_, table) => {
    const data = {};

    const row = $(table).text().trim();

    const type = row.match(typeRegex)[0];
    data.type = type.substr(0, type.length - 1);

    const aprovedDate = row.match(dateAprovedRegex)[0];
    const payDate = row.match(datePayRegex)[0];
    const EXDate = row.match(dateEXRegex)[0];

    data.aprovedDate = new Date(
      aprovedDate.substr(13, 4),
      Number(aprovedDate.substr(18, 2)) - 1,
      aprovedDate.substr(21, 2)
    );

    if (payDate !== 'pagamento em: data ex em') {
      data.payDate = new Date(
        payDate.substr(14, 4),
        Number(payDate.substr(19, 2)) - 1,
        payDate.substr(22, 2)
      );
    } else data.payDate = null;

    data.EXDate = new Date(
      EXDate.substr(7, 4),
      Number(EXDate.substr(12, 2)) - 1,
      EXDate.substr(15, 2)
    );

    const code1 = row.match(code1Regex);
    const code2 = row.match(code2Regex);

    const value1 = row.match(value1Regex) ? row.match(value1Regex)[0] : 0.0;
    const value2 = row.match(value2Regex) ? row.match(value2Regex)[0] : 0.0;

    if (code1) {
      if (value1) {
        data.value1 = value1.substr(1, value1.length - 3).replace(',', '.');
      } else {
        data.value1 = value2
          ? value2.substr(1, value2.length - 2).replace(',', '.')
          : 0;
      }

      data.code1 = row.match(code1Regex)[0].substr(1, code1[0].length - 2);
    }

    if (code2) {
      data.value2 = value2
        ? value2.substr(1, value2.length - 2).replace(',', '.')
        : 0;

      data.code2 = row.match(code2Regex)[0].substr(1, code2[0].length - 2);
    }

    div.push(data);
  });

  let active1 = {};
  let active2 = {};

  if (div[0].code1) {
    active1 = await getActive(div[0].code1);
  }

  if (div[0].code2) {
    active2 = await getActive(div[0].code2);
  }

  for (let i = 0; i < div.length; i++) {
    if (isBefore(new Date(2016, 0, 1), div[i].payDate)) {
      if (div[0].code1 && active1 !== null) {
        await Dividend.findOrCreate({
          where: {
            activeId: active1.id,
            type: div[i].type,
            value: Number(div[i].value1),
            aprovedDate: div[i].aprovedDate,
            EXDate: div[i].EXDate,
            payDate: div[i].payDate,
          },
        });
      }

      if (div[0].code2 && active2 !== null) {
        await Dividend.findOrCreate({
          where: {
            activeId: active2.id,
            type: div[i].type,
            value: Number(div[i].value2),
            aprovedDate: div[i].aprovedDate,
            EXDate: div[i].EXDate,
            payDate: div[i].payDate,
          },
        });
      }

      if (div[0].code1 && active1 !== null) {
        const unitCode1 = `${div[0].code1.substr(0, 4)}11`;
        const unit1 = Units[unitCode1];

        if (unit1) {
          const active = await getActive(unitCode1);
          const value = unit1[3] * div[i].value1 + unit1[4] * div[i].value2;
          await Dividend.findOrCreate({
            where: {
              activeId: active.id,
              type: div[i].type,
              value: Number(value),
              aprovedDate: div[i].aprovedDate,
              EXDate: div[i].EXDate,
              payDate: div[i].payDate,
            },
          });
        }
      } else if (div[0].code2 && active2 !== null) {
        const unitCode2 = `${div[0].code2.substr(0, 4)}11`;
        const unit2 = Units[unitCode2];
        if (unit2) {
          const active = await getActive(unitCode2);
          const value = unit2[4] * div[i].value2;
          await Dividend.findOrCreate({
            where: {
              activeId: active.id,
              type: div[i].type,
              value: Number(value),
              aprovedDate: div[i].aprovedDate,
              EXDate: div[i].EXDate,
              payDate: div[i].payDate,
            },
          });
        }
      }
    }
  }
}

export async function getDividendsFII(fiis) {
  const dividends = await FIICrawler(fiis);

  for (let i = 0; i < dividends.length; i++) {
    const fii = await getActive(dividends[i].fii);

    for (let j = 0; j < dividends[i].data.length; j++) {
      const div = dividends[i].data[j];

      if (!isNaN(div.value)) {
        const EXDate = new Date(div.year, div.month, 1);
        const date = lastDayOfMonth(EXDate);

        await Dividend.findOrCreate({
          where: {
            activeId: fii.id,
            type: 'dividendos',
            value: div.value,
            aprovedDate: date,
            EXDate,
            payDate: date,
          },
        });
      }
    }
  }
}
