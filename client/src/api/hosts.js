import axios from 'axios';

const API_URL = 'http://localhost:5000/';

const $host = axios.create({
  baseURL: API_URL,
});

const $authHost = axios.create({
  baseURL: API_URL,
});

const authInterceptor = (config) => {
  const accessToken = localStorage.getItem('accessToken');
  if (accessToken) {
    config.headers['x-access-token'] = accessToken;
  }
  return config;
};

$authHost.interceptors.request.use(authInterceptor);

export { $host, $authHost };
