import axios from 'axios';

const $axios = axios.create({
  baseURL: 'http://localhost:8888',
  timeout: 5000, //5 seconds
});

// Add a request interceptor
$axios.interceptors.request.use(function (config) {
  // get token from local storage
  const token = window.localStorage.getItem('token');

  // if token, add token to headers
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
    //config=request
  }

  return config;
});

export default $axios;
