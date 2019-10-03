import React from 'react';
import ReactDOM from 'react-dom';
import { ThemeProvider } from 'styled-components';

import App from './App';
import './index.css';
import * as serviceWorker from './serviceWorker';

import { Provider } from 'react-redux';
import { store } from './helpers';
import colorPalette from './utils/colors';

const theme = {
  secondaryColor: 'white',
  primaryColor: '#1fa2ff',
  borderColor: '#ccc',
  fontPrimaryColor: 'black',
  fontSecondaryColor: 'white',
  white: 'white',
  color: colorPalette,
};

ReactDOM.render(
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
