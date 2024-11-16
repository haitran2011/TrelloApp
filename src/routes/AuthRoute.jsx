import axios from 'axios';
import React from 'react'
import { Navigate } from 'react-router-dom';

import { useMeContext } from '../contexts/MeContext';
import { axiosInterceptor } from '../services/axiosInterceptor';

function AuthRoute({ children }) {
  const access_token = window.localStorage.getItem('access_token');
  const { fetchMe } = useMeContext();

  React.useEffect(() => {
    if(!access_token) return;
    async function getMe() {
      try {
        const response = await axiosInterceptor.post('https://tony-auth-express-vdee-6j0s-fhovok9bu.vercel.app/api/auth', 
          {},
          {
          headers: {
            'x-auth-token': access_token
          }
        });
        const user = response.data.user.user;
        if(!user) {
          window.location.href = '/login';
          return;
        }
        fetchMe(user);
      } catch (error) {
        window.location.href = '/login';
      }
    }
    getMe();
  }, [access_token])

  if(!access_token) {
    return <Navigate to="/login" />
  }

  return (
    <>{children}</>
  )
}

export default AuthRoute