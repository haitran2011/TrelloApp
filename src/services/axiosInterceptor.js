import axios from 'axios';

export const axiosInterceptor = axios.create({
  baseUrl: 'https://tony-auth-express-vdee-6j0s-fhovok9bu.vercel.app',
  timeout: 5000
});

axiosInterceptor.interceptors.request.use(
  (config) => {
    console.log('request: ', config)
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
)

axiosInterceptor.interceptors.response.use(
  (res) => {
    console.log('response: ', res)
    return res;
  },
  async (error) => {
    // TODO: handle 501, 502

    // handler request timeout
    if(error.code === 'ECONNABORTED') {
      // show popup
    }

    // access token
    // user -> call api get product -> token expire -> system auto call api refresh token -> system auto call api get product
    if(error?.response?.status === 401) {
      try {
        const response =  await axiosInterceptor.post('https://tony-auth-express-vdee-6j0s-fhovok9bu.vercel.app/api/user/refresh-token', {
          data: {
            refresh_token: window.localStorage.getItem('refresh_token')
          }
        })
        const access_token = response.data.data.access_token;
        window.localStorage.setItem('access_token', access_token);
        axiosInterceptor.defaults.headers.common('x-auth-token', access_token);
        return axiosInterceptor(error.config);
      } catch(error) {
        return Promise.reject(error)
      }
    }

    // TODO: other error
    if(error?.response?.status) {
      switch (error?.response?.status) {
        case 400: {
          // ...
          break;
        }
        case 500: {
          // ...
          break;
        }
        default:
          break
      }
    }
  }
)
