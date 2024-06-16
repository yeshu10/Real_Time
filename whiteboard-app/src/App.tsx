// src/App.tsx
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './components/Home';
import Login from './components/Login';
import PrivateRoute from './components/PrivateRoute';
import keycloak from './keycloak';
import Logout from './components/Logout';

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

  if (!keycloakInstance) {
    return <div>Loading...</div>;
  }

  if (!authenticated) {
    return <div>Unable to authenticate!</div>;
  }

  return (
    <Router>
      <Switch>
        <Route path="/login" component={Login} />
        <Route path="/logout" component={Logout} />
        <PrivateRoute exact path="/" component={Home} />
      </Switch>
    </Router>
  );
};

export default App;
