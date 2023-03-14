import jwtDecode, { JwtPayload } from 'jwt-decode';
import { useQuery } from 'react-query';
import { useAuthToken } from './useAuthToken';

interface AuthTokenDecoded {
  id: string;
  email: string;
  name: string;
  roles: string[];
}

export const useUser = () => {
  const authToken = useAuthToken();

  return useQuery(['current-user'], () => jwtDecode<AuthTokenDecoded & JwtPayload>(authToken), {
    enabled: authToken !== undefined,
  });
};
