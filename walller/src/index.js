import React from 'react';
import { PersistGate } from 'redux-persist/integration/react';
import { Provider } from 'react-redux';
import { StatusBar } from 'react-native';

import './config/ReactotronConfig';

import { ThemeProvider } from 'styled-components/native';
import dark from './styles/dark';
import App from './App';
import { store, persistor } from './store';
import Background from './components/Background';

export default function src() {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <ThemeProvider theme={dark}>
          <Background>
            <StatusBar
              barStyle="light-content"
              backgroundColor={dark.secundary}
            />
            <App />
          </Background>
        </ThemeProvider>
      </PersistGate>
    </Provider>
  );
}
