export const activeFilterDividend = (array, filter) =>
  array.filter(el => el.userActive.Active.type === filter || filter === 'All');

export const activeFilter = (array, filter) =>
  array.filter(el => el.Active.type === filter || filter === 'All');

export const arrayUnique = array =>
  array.filter((el, index, arr) => index === arr.indexOf(el));
