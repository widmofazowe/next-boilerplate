import { useMutation } from 'react-query';
import axios, { AxiosError, AxiosResponse } from 'axios';
import useDebug from '@hooks/useDebug';

export interface ForgotPasswordPayload {
  email: string;
}

export const useForgotPasswordMutation = () => {
  const debug = useDebug('login:useForgotPasswordMutation');

  return useMutation<AxiosResponse<{}>, AxiosError, ForgotPasswordPayload>(async ({ email }) => {
    debug(`Resetting password for ${email}`);
    return axios.post('/api/proxy/user/reset-password', {
      email,
    });
  });
};
