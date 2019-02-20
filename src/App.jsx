import React from 'react';
import { HashRouter, Switch, Route } from 'react-router-dom';

import Landing from './views/Landing';
import Register from './views/Register';
import Login from './views/Login';
import Home from './views/Home';
import Note from './views/Note';
import EditNote from './views/EditNote';
import NotFound from './views/NotFound';

// get token from localstorage, set auth routes based on it

const App = () => {
  // const [authenticated, setAuth] = useState(false);

  return (
    // TODO: ADD BASENAME FOR DEPLOY
    <HashRouter>
      <Switch>
        <Route exact path="/" component={Landing} />
        <Route path="/register" component={Register} />
        <Route path="/login" component={Login} />
        <Route path="/home" component={Home} />
        <Route path="/edit-note/:id" component={EditNote} />
        <Route path="/add-note" component={Note} />
        <Route component={NotFound} />
      </Switch>
    </HashRouter>
  );
};

export default App;
