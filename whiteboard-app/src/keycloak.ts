import Keycloak, { KeycloakConfig } from 'keycloak-js';

const keycloakConfig: KeycloakConfig = {
  url: 'http://localhost:8080/auth',
  realm: 'whiteboard', 
  clientId: 'whiteboard-client' 
};

const keycloak = new Keycloak(keycloakConfig);

export default keycloak;
