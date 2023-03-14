import { useMutation } from 'react-query';
import axios, { AxiosError, AxiosResponse } from 'axios';
import useDebug from '@hooks/useDebug';
import { useRouter } from 'next/router';

export interface NewPasswordPayload {
  password: string;
}

export const useNewPasswordMutation = () => {
  const debug = useDebug('login:useNewPasswordMutation');
  const router = useRouter();
  const { userId, token } = router.query;

  return useMutation<AxiosResponse<{}>, AxiosError, NewPasswordPayload>(async ({ password }) => {
    debug(`Setting new password for ${userId}`);
    return axios.put('/api/proxy/user/reset-password', {
      userId,
      token,
      password,
    });
  });
};
