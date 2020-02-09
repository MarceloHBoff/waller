import produce from 'immer';

import types from './types';

const INITIAL_STATE = {
  openModalNewStock: false,
  openModalCEIImport: false,
  openModalBond: false,
};

export default function Modal(state = INITIAL_STATE, action) {
  return produce(state, draft => {
    switch (action.type) {
      case types.OPEN_MODAL_NEWSTOCK:
        draft.openModalNewStock = action.payload.open;
        break;
      case types.OPEN_MODAL_CEIIMPORT:
        draft.openModalCEIImport = action.payload.open;
        break;
      case types.OPEN_MODAL_BOND:
        draft.openModalBond = action.payload.open;
        break;
      case types.CLOSE_ALL:
        draft.openModalCEIImport = false;
        draft.openModalNewStock = false;
        draft.openModalBond = false;
        break;
      default:
    }
  });
}
