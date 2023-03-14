import Axios from 'axios';
import Cookies from 'universal-cookie';

import config from '@config';

export const AUTH_TOKEN_STORAGE_KEY = '__auth_token';

const cookies = new Cookies();
const axiosInstance = Axios.create();

axiosInstance.interceptors.request.use(config => {
  const token = cookies.get(AUTH_TOKEN_STORAGE_KEY);

  if (token) {
    config.headers!.Authorization = `Bearer ${token}`;
  }

  return config;
});

axiosInstance.interceptors.response.use(
  res => res,
  async error => {
    const originalErrorToThrow = error.response ?? error;

    if (error.response.status !== 401 || !error.config.bearerAuthorization) {
      throw originalErrorToThrow;
    }

    try {
      // get old token
      const authToken = cookies.get(AUTH_TOKEN_STORAGE_KEY);

      // logout if auth token is empty
      if (!authToken) {
        throw originalErrorToThrow;
      }

      // get new
      const response = await Axios.post('/api/proxy/auth/refresh', {}, { headers: error.config.headers });

      cookies.set(AUTH_TOKEN_STORAGE_KEY, response.data.authToken, { path: '/', sameSite: 'strict', secure: true });

      const retriedResponse = await Axios({
        ...error.config,
        headers: {
          Authorization: `Bearer ${response.data.authToken}`,
        },
      });

      return retriedResponse;
    } catch (error) {
      throw originalErrorToThrow;
    }
  },
);

const buildProxyUrl = url => `/api/proxy/${url}`;

export const useApiHttpService = () => {
  return {
    get(url) {
      return axiosInstance.get(buildProxyUrl(url));
    },

    post(url, body) {
      return axiosInstance.post(buildProxyUrl(url), body);
    },

    put(url, body) {
      return axiosInstance.post(buildProxyUrl(url), body);
    },

    patch(url, body) {
      return axiosInstance.patch(buildProxyUrl(url), body);
    },

    delete(url) {
      return axiosInstance.delete(buildProxyUrl(url));
    },
  };
};
