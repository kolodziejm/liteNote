import React, { useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import { ApolloConsumer } from 'react-apollo';
import { Switch, Route, withRouter } from 'react-router-dom';
import jwtDecode from 'jwt-decode';

import authContext from './authContext';

import Landing from './views/Landing';
import Register from './views/Register';
import Login from './views/Login';
import Home from './views/Home';
import AddNote from './views/AddNote';
import EditNote from './views/EditNote';
import NotFound from './views/NotFound';

import UIContext from './uiContext';

// get token from localstorage + decode to get Date and user data, set auth routes based on it

const App = ({ history }) => {
  const [noteCreated, setNoteCreated] = useState(false);
  const [noteDeleted, setNoteDeleted] = useState(false);

  const authCtx = useContext(authContext);

  // check exp of the token
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const decoded = jwtDecode(token);
      if (Date.now() / 1000 > decoded.exp) {
        localStorage.removeItem('token');
        authCtx.setAuthenticated(false);
        authCtx.setTokenExpired(true);
        history.push('/login');
      }
    }
  });

  const unauthRoutes = (
    <Switch>
      <Route exact path="/" component={Landing} />
      <Route path="/register" component={Register} />
      <Route path="/login" component={Login} />
      <Route component={NotFound} />
    </Switch>
  );

  const authRoutes = (
    <Switch>
      <Route
        path="/home"
        render={props => (
          <ApolloConsumer>
            {client => <Home client={client} {...props} />}
          </ApolloConsumer>
        )}
      />
      <Route
        path="/edit-note/:id"
        render={props => (
          <ApolloConsumer>
            {client => <EditNote client={client} {...props} />}
          </ApolloConsumer>
        )}
      />
      <Route path="/add-note" component={AddNote} />
      <Route component={NotFound} />
    </Switch>
  );

  return (
    <UIContext.Provider
      value={{ noteCreated, setNoteCreated, noteDeleted, setNoteDeleted }}
    >
      {authCtx.authenticated ? authRoutes : unauthRoutes}
    </UIContext.Provider>
  );
};

App.propTypes = {
  history: PropTypes.shape({}).isRequired,
};

export default withRouter(App);
