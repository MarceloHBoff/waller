export const { format: formatPrice } = new Intl.NumberFormat('pt-BR', {
  style: 'currency',
  currency: 'BRL',
});

export const round10 = (num, places = 2) => {
  if (!`${num}`.includes('e')) {
    return +`${Math.round(`${num}e+${places}`)}e-${places}`;
  }
  const arr = `${num}`.split('e');
  let sig = '';
  if (+arr[1] + places > 0) {
    sig = '+';
  }

  return +`${Math.round(`${+arr[0]}e${sig}${+arr[1] + places}`)}e-${places}`;
};
