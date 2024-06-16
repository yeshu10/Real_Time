import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Keycloak from 'keycloak-js';
import Home from './components/Home';
import WhiteboardCanvas from './components/WhiteboardCanvas';

const keycloak = Keycloak(); // Initialize Keycloak instance

const Whiteboard: React.FC = () => {
  const [authenticated, setAuthenticated] = React.useState(false);

  React.useEffect(() => {
    keycloak
      .init({ onLoad: 'login-required' })
      .then((authenticated) => {
        setAuthenticated(authenticated);
      })
      .catch(() => {
        setAuthenticated(false);
      });
  }, []);

  return (
    <Router>
      <Switch>
        <Route exact path="/">
          {authenticated ? <Home /> : <div>Unable to authenticate!</div>}
        </Route>
        <Route path="/whiteboard">
          {authenticated ? <WhiteboardCanvas /> : <div>Unable to authenticate!</div>}
        </Route>
      </Switch>
    </Router>
  );
};

export default Whiteboard;
