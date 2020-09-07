import types from './types';

export function setActiveFilter(filter) {
  return {
    type: types.SET_ACTIVE_FILTER,
    payload: { filter },
  };
}
