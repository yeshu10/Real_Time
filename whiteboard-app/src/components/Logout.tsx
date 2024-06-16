// src/components/Logout.tsx
import React, { useEffect } from 'react';
import keycloak from '../keycloak';

const Logout: React.FC = () => {
  useEffect(() => {
    keycloak.logout();
  }, []);

  return <div>Logging out...</div>;
};

export default Logout;
