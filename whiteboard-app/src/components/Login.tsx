import React from 'react';
import { useKeycloak } from '@react-keycloak/web';

const Login: React.FC = () => {
  const { keycloak } = useKeycloak();

  const login = () => {
    keycloak.login();
  };

  return (
    <div>
      <h1>Login</h1>
      <button onClick={login}>Login with Keycloak</button>
    </div>
  );
};

export default Login;
