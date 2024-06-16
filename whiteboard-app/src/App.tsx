// App.tsx

import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import Keycloak from 'keycloak-js';
import Home from './components/Home';
import Login from './components/Login';
import Whiteboard from './components/Whiteboard';
import keycloak from './keycloak';

const App: React.FC = () => {
  const [keycloakInstance, setKeycloakInstance] = useState<Keycloak.KeycloakInstance | null>(null);
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    keycloak
      .init({ onLoad: 'login-required' })
      .then(authenticated => {
        setKeycloakInstance(keycloak);
        setAuthenticated(authenticated);
      })
      .catch(() => {
        setKeycloakInstance(null);
        setAuthenticated(false);
      });
  }, []);

  if (keycloakInstance) {
    if (authenticated) {
      return (
        <Router>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/whiteboard/:roomId" component={Whiteboard} />
            <Redirect to="/" />
          </Switch>
        </Router>
      );
    } else {
      return <div>Unable to authenticate!</div>;
    }
  }

  return <div>Loading...</div>;
};

export default App;
