import produce from 'immer';

import types from './types';

const INITIAL_STATE = {
  modalNewActive: false,
  modalCEIImport: false,
  modalBond: false,
  modalStockQuery: false,
  code: '',
  modalStockQueryChart: false,
  modalStockQueryDividends: false,
};

export default function Modal(state = INITIAL_STATE, action) {
  return produce(state, draft => {
    switch (action.type) {
      case types.MODAL_NEW_ACTIVE:
        draft.modalNewActive = action.payload.open;
        break;
      case types.MODAL_CEI_IMPORT:
        draft.modalCEIImport = action.payload.open;
        break;
      case types.MODAL_BOND:
        draft.modalBond = action.payload.open;
        break;
      case types.MODAL_STOCK_QUERY:
        draft.modalStockQuery = action.payload.open;
        draft.code = action.payload.code;
        break;
      case types.MODAL_STOCK_QUERY_CHART:
        draft.modalStockQueryChart = action.payload.open;
        break;
      case types.MODAL_STOCK_QUERY_DIVIDENDS:
        draft.modalStockQueryDividends = action.payload.open;
        break;
      case types.CLOSE_ALL:
        draft.modalNewActive = false;
        draft.modalCEIImport = false;
        draft.modalBond = false;
        draft.modalStockQuery = false;
        draft.modalStockQueryChart = false;
        draft.modalStockQueryDividends = false;
        draft.code = '';
        break;
      default:
    }
  });
}
