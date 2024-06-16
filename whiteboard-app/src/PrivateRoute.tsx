
import React, { useContext } from 'react';
import { Route, Redirect, RouteProps } from 'react-router-dom';
import { KeycloakContext } from './KeycloakProvider';

interface PrivateRouteProps extends RouteProps {
  component: React.ComponentType<any>;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ component: Component, ...rest }) => {
  const context = useContext(KeycloakContext);

  if (!context) {
    return <div>Loading...</div>;
  }

  const { authenticated } = context;

  return (
    <Route
      {...rest}
      render={props =>
        authenticated ? (
          <Component {...props} />
        ) : (
          <Redirect to="/" />
        )
      }
    />
  );
};

export default PrivateRoute;
