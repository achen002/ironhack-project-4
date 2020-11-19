import React from 'react';

import { Route, Redirect } from 'react-router-dom';

const LoginRoute = ({ authorized, redirect, ...props }) => {
  if (!authorized) {
    return <Route {...props} />;
  } else {
    return <Redirect to={redirect} />;
  }
};

export default LoginRoute;
