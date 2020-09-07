import { activeFilterDividend } from '~/util/array';

export const sumDividends = (data, filter) => {
  const activeCodes = {};
  const codeArray = [];

  let total = 0;

  activeFilterDividend(data, filter).forEach(dividends => {
    const {
      amount,
      Active: { code },
    } = dividends.userActive;

    let value = 0;

    dividends.dividend.forEach(d => {
      if (d.type === 'jscp') {
        value = d.value * amount * 0.85;
      } else {
        value = d.value * amount;
      }

      if (code === 'SQIA3') {
        value /= 4;
      }

      const codeValue = activeCodes[code] || 0;

      activeCodes[code] = Number(value + codeValue);

      codeArray.push(code);

      total += value;
    });
  });

  return { total, activeCodes, codeArray };
};
