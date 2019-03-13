import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import jwtDecode from 'jwt-decode';
import * as serviceWorker from './serviceWorker';

import ApolloClient from 'apollo-boost';
import { HashRouter, withRouter } from 'react-router-dom';
import { ApolloProvider } from 'react-apollo';
import { ThemeProvider } from 'styled-components';

import theme from './theme';
import GlobalStyles from './globalStyles';
import AuthContext from './authContext';

// jwtDecode token for every request and check if it is still valid.
const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql',
  request: operation => {
    const token = localStorage.getItem('token');
    operation.setContext({
      headers: {
        authorization: token,
      },
    });
  },
  fetchOptions: {
    credentials: 'include',
  },
  onError: ({ graphQLErrors, networkError }) => {
    const isAuthError = graphQLErrors.some(
      err => err.extensions.code === 'UNAUTHENTICATED'
    );
    if (isAuthError) {
      localStorage.removeItem('token');
    }
  },
});

const Index = withRouter(({ theme, history, client }) => {
  const [authenticated, setAuthenticated] = useState(false);
  const [tokenExpired, setTokenExpired] = useState(false);

  if (!authenticated && localStorage.getItem('token')) {
    setAuthenticated(true);
    const path = history.location.pathname;
    if (path === '/' || path === '/login' || path === '/register')
      history.push('/home');
  }

  return (
    <HashRouter>
      <AuthContext.Provider
        value={{
          authenticated,
          setAuthenticated,
          tokenExpired,
          setTokenExpired,
        }}
      >
        <ApolloProvider client={client}>
          <ThemeProvider theme={theme}>
            <>
              <GlobalStyles />
              <App />
            </>
          </ThemeProvider>
        </ApolloProvider>
      </AuthContext.Provider>
    </HashRouter>
  );
});

const IndexWithRouter = () => (
  <HashRouter>
    <Index theme={theme} client={client} />
  </HashRouter>
);

ReactDOM.render(<IndexWithRouter />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
