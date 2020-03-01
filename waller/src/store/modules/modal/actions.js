import types from './types';

export function openModalNewStock(open) {
  return {
    type: types.OPEN_MODAL_NEWSTOCK,
    payload: { open },
  };
}

export function openModalCEIImport(open) {
  return {
    type: types.OPEN_MODAL_CEIIMPORT,
    payload: { open },
  };
}

export function openModalBond(open) {
  return {
    type: types.OPEN_MODAL_BOND,
    payload: { open },
  };
}

export function closeAll() {
  return {
    type: types.CLOSE_ALL,
  };
}
