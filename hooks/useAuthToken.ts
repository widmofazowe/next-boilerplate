import { useCookies } from 'react-cookie';
import { AUTH_TOKEN_STORAGE_KEY } from '@hooks/useApiHttpService';

export const useAuthToken = () => {
  const [cookies] = useCookies([AUTH_TOKEN_STORAGE_KEY]);
  if (typeof window === 'undefined') {
    return undefined;
  }

  const authToken = cookies[AUTH_TOKEN_STORAGE_KEY];

  return authToken ?? null;
};
