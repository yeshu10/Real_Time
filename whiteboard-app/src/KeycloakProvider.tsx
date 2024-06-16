import React, { useState, useEffect, createContext, ReactNode } from 'react';
import keycloak from './keycloak';

interface KeycloakContextProps {
  keycloak: typeof keycloak;
  authenticated: boolean;
}

export const KeycloakContext = createContext<KeycloakContextProps | undefined>(undefined);

interface KeycloakProviderProps {
  children: ReactNode;
}

const KeycloakProvider: React.FC<KeycloakProviderProps> = ({ children }) => {
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    keycloak.init({ onLoad: 'login-required' }).then(authenticated => {
      setAuthenticated(authenticated);
    }).catch(error => {
      console.error('Failed to initialize Keycloak', error);
    });
  }, []);

  if (!keycloak.authenticated) {
    return <div>Loading...</div>;
  }

  return (
    <KeycloakContext.Provider value={{ keycloak, authenticated }}>
      {children}
    </KeycloakContext.Provider>
  );
};

export default KeycloakProvider;
