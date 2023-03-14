import { useMutation } from 'react-query';
import axios, { AxiosError, AxiosResponse } from 'axios';
import { AUTH_TOKEN_STORAGE_KEY } from '@hooks/useApiHttpService';
import { useCookies } from 'react-cookie';
import useDebug from '@hooks/useDebug';

export interface UserCredentials {
  username: string;
  password: string;
}

interface EndpointResponse {
  authToken: string;
}

export const useLoginMutation = () => {
  const [, setCookie] = useCookies([AUTH_TOKEN_STORAGE_KEY]);
  const debug = useDebug('login:useLoginMutation');

  return useMutation<AxiosResponse<EndpointResponse>, AxiosError, UserCredentials>(
    async ({ username, password }) => {
      debug(`Logging in ${username}`);
      return axios.post('/api/proxy/auth/login', {
        username,
        password,
      });
    },
    {
      onSuccess: response => {
        setCookie(AUTH_TOKEN_STORAGE_KEY, response.data.authToken, { path: '/', sameSite: 'strict', secure: true });
        debug(`Logged in successfully`);
      },
    },
  );
};
