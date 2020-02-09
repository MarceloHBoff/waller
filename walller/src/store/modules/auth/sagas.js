import { Alert } from 'react-native';

import { takeLatest, call, put, all } from 'redux-saga/effects';

import api from '~/services/api';

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
  } catch (err) {
    Alert.alert('Login error', err.response);
  }
}

export function* signUp({ payload }) {
  try {
    const { name, email, password } = payload;

    const response = yield call(api.post, 'users', {
      name,
      email,
      password,
    });

    const { token } = response.data;

    yield put(signInSuccess(token));
  } catch (err) {
    Alert.alert('Login error', err.response);
  }
}

export function setToken({ payload }) {
  if (!payload) return;

  const { token } = payload.auth;

  if (token) {
    api.defaults.headers.Authorization = `Bearer ${token}`;
  }
}

export default all([
  takeLatest(types.REHYDRATE, setToken),
  takeLatest(types.SIGN_IN_REQUEST, signIn),
  takeLatest(types.SIGN_UP_REQUEST, signUp),
]);
