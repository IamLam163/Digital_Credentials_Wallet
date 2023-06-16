import React, { useContext } from 'react';
import { Route, Navigate } from 'react-router-dom';
import { UserContext } from './context/userContext';

export function PrivateRoute({ element: Element, ...rest }) {
  const { user } = useContext(UserContext);

  return (
    <Route
      {...rest}
      element={user ? <Element /> : <Navigate to="/login" />}
    />
  );
}

