import { toast } from 'react-toastify';

import { takeLatest, call, put, all } from 'redux-saga/effects';

import api from '~/services/api';
import history from '~/services/history';

import { signInSuccess } from './actions';
import types from './types';

export function* signIn({ payload }) {
  try {
    const { email, password } = payload;

    const response = yield call(api.post, 'sessions', {
      email,
      password,
    });

    const { token } = response.data;

    yield put(signInSuccess(token));
    history.push('/dashboard');
  } catch (err) {
    toast.error('Authentication error');
  }
}

export function* signUp({ payload }) {
  try {
    const { name, email, password } = payload;

    yield call(api.post, 'users', {
      name,
      email,
      password,
    });

    history.push('/');
  } catch (err) {
    toast.error('Register error');
  }
}

export function setToken({ payload }) {
  if (!payload) return;

  let token = '';

  if (payload.token) {
    token = payload.token;
  } else {
    token = payload.auth.token;
  }

  if (token) {
    api.defaults.headers.Authorization = `Bearer ${token}`;
  }
}

export function signOut() {
  history.push('/');
}

export default all([
  takeLatest(types.REHYDRATE, setToken),
  takeLatest(types.SIGN_IN_REQUEST, signIn),
  takeLatest(types.SIGN_IN_SUCCESS, setToken),
  takeLatest(types.SIGN_OUT, signOut),
  takeLatest(types.SIGN_UP_REQUEST, signUp),
]);
