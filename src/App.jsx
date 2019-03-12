import React, { useState } from 'react';
import { ApolloConsumer } from 'react-apollo';
import { HashRouter, Switch, Route } from 'react-router-dom';

import Landing from './views/Landing';
import Register from './views/Register';
import Login from './views/Login';
import Home from './views/Home';
import AddNote from './views/AddNote';
import EditNote from './views/EditNote';
import NotFound from './views/NotFound';

import UIContext from './uiContext';

// get token from localstorage + decode to get Date and user data, set auth routes based on it

const App = () => {
  // const [isAuthenticated, setAuth] = useState(false);
  // const [user, setUser] = useState({})
  const [noteCreated, setNoteCreated] = useState(false);
  const [noteDeleted, setNoteDeleted] = useState(false);

  return (
    // TODO: ADD BASENAME FOR DEPLOY
    <HashRouter>
      <UIContext.Provider
        value={{ noteCreated, setNoteCreated, noteDeleted, setNoteDeleted }}
      >
        <Switch>
          <Route exact path="/" component={Landing} />
          <Route path="/register" component={Register} />
          <Route path="/login" component={Login} />
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
      </UIContext.Provider>
    </HashRouter>
  );
};

export default App;
