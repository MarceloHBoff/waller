import types from './types';

export function signInRequest(email, password) {
  return {
    type: types.SIGN_IN_REQUEST,
    payload: { email, password },
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

export function signUpRequest(name, email, password) {
  return {
    type: types.SIGN_UP_REQUEST,
    payload: { name, email, password },
  };
}

export function signUpSuccess(token) {
  return {
    type: types.SIGN_UP_SUCCESS,
    payload: { token },
  };
}
