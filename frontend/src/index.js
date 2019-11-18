import React from 'react';
import ReactDOM from 'react-dom';
import { ThemeProvider } from 'styled-components';
import { ApolloProvider } from '@apollo/react-hooks';
import { ApolloClient } from 'apollo-client';
import { setContext } from 'apollo-link-context';
import { createHttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';

import App from './App';
import './index.css';
import { Provider } from 'react-redux';
import { store } from './helpers';
import colorPalette from './utils/colors';
import { backendURL } from './_services/helpers';

const httpLink = createHttpLink({
  uri: backendURL + '/graphql',
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('token');
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

export const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

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
  <ApolloProvider client={client}>
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <App store={store} />
      </ThemeProvider>
    </Provider>
  </ApolloProvider>,
  document.getElementById('root')
);
