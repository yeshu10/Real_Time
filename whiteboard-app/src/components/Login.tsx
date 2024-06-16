// src/components/Login.tsx
import React, { useEffect } from 'react';
import keycloak from '../keycloak';

const Login: React.FC = () => {
  useEffect(() => {
    keycloak.login();
  }, []);

  return <div>Redirecting to login...</div>;
};

export default Login;
