import React from 'react'
import { Navigate } from 'react-router-dom';

function GuestRoute({ children }) {
  const access_token = window.localStorage.getItem('access_token');

  if(access_token) {
    return <Navigate to="/" />
  }

  return (
    <>{children}</>
  )
}

export default GuestRoute