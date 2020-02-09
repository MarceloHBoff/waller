import produce from 'immer';

import types from './types';

const INITIAL_STATE = {
  user: null,
};

export default function User(state = INITIAL_STATE, action) {
  return produce(state, draft => {
    switch (action.type) {
      case types.UPDATE_PROFILE_SUCCESS:
        draft.user = action.payload.profile;
        break;
      default:
    }
  });
}
