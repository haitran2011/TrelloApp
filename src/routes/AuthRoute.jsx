import React from 'react'
import { Navigate } from 'react-router-dom';

function AuthRoute({ children }) {
  const access_token = window.localStorage.getItem('access_token');

  if(!access_token) {
    return <Navigate to="/login" />
  }

  return (
    <>{children}</>
  )
}

export default AuthRoute