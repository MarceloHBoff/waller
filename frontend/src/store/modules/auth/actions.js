import types from './types';

export function signInRequest(data) {
  return {
    type: types.SIGN_IN_REQUEST,
    payload: { data },
  };
}

export function signInSuccess(token) {
  return {
    type: types.SIGN_IN_SUCCESS,
    payload: { token },
  };
}

export function signOut() {
  return {
    type: types.SIGN_OUT,
  };
}

export function signUpRequest(data) {
  return {
    type: types.SIGN_UP_REQUEST,
    payload: { data },
  };
}

export function signUpSuccess(token) {
  return {
    type: types.SIGN_UP_SUCCESS,
    payload: { token },
  };
}
