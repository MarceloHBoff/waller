import types from './types';

export function modalNewActive(open) {
  return {
    type: types.MODAL_NEW_ACTIVE,
    payload: { open },
  };
}

export function modalCEIImport(open) {
  return {
    type: types.MODAL_CEI_IMPORT,
    payload: { open },
  };
}

export function modalBond(open) {
  return {
    type: types.MODAL_BOND,
    payload: { open },
  };
}

export function modalStockQuery(open, code) {
  return {
    type: types.MODAL_STOCK_QUERY,
    payload: { open, code },
  };
}

export function modalStockQueryChart(open) {
  return {
    type: types.MODAL_STOCK_QUERY_CHART,
    payload: { open },
  };
}

export function modalStockQueryDividends(open) {
  return {
    type: types.MODAL_STOCK_QUERY_DIVIDENDS,
    payload: { open },
  };
}

export function closeAll() {
  return {
    type: types.CLOSE_ALL,
  };
}
