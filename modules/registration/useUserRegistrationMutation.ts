import { useMutation } from 'react-query';
import axios, { AxiosError, AxiosResponse } from 'axios';
import useDebug from '@hooks/useDebug';
import { User } from '@models/user';

interface EndpointResponse {}

export const useUserRegistrationMutation = () => {
  const debug = useDebug('login:useUserRegistrationMutation');

  return useMutation<AxiosResponse<EndpointResponse>, AxiosError, User>(
    async payload => {
      debug(`Registering new user ${payload.email}`);
      return axios.post('/api/proxy/registration', payload);
    },
    {
      onSuccess: () => {
        debug('User created');
      },
    },
  );
};
