import produce from 'immer';

import types from './types';

const INITIAL_STATE = {
  filter: 'All',
};

export default function Modal(state = INITIAL_STATE, action) {
  return produce(state, draft => {
    switch (action.type) {
      case types.SET_ACTIVE_FILTER:
        draft.filter = action.payload.filter;
        break;
      default:
    }
  });
}
