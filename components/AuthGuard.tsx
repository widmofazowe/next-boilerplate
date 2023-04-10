import { useEffect, useState } from 'react';
import { NextPage } from 'next';
import { useRouter } from 'next/router';

import { useUser } from '@hooks/useUser';
import useDebug from '@hooks/useDebug';
import LoadingScreen from './Loading/LoadingScreen';
import LoadingElement from './Loading/LoadingElement';

interface Props {
  children: JSX.Element;
  roles?: string[];
}

const checkPrivileges = (roles: string[], userRoles?: string[]) => {
  return roles.some(r => userRoles?.includes(r)) || userRoles?.includes('dev');
};

const AuthGuard: NextPage<Props> = ({ children, roles = [] }) => {
  const { data: user, isLoading, isIdle } = useUser();
  const router = useRouter();
  const [allowed, setAllowed] = useState(false);
  const debug = useDebug('component:AuthGuard');

  const redirect = () => {
    setTimeout(() => {
      router.push('/');
    }, 1000);
  };

  useEffect(() => {
    console.log(user, isLoading, isIdle);
    if (!isLoading && !isIdle) {
      debug('Checking privileges');
      if (user && (roles.length === 0 || checkPrivileges(roles, user?.roles))) {
        debug('Priveleges ok');
        setAllowed(true);
      } else {
        debug('Unsufficient priveleges, redirecting...');
        redirect();
      }
    }
  }, [user, isLoading, isIdle]);

  return user && allowed ? <>{children}</> : <LoadingScreen />;
};

export default AuthGuard;

export const GuardElement = ({
  children,
  failed = <></>,
  roles = [],
}: {
  children: JSX.Element;
  failed?: JSX.Element;
  roles: string[];
}) => {
  const { data: user, isLoading, isIdle } = useUser();
  const [allowed, setAllowed] = useState(false);

  useEffect(() => {
    if (user && roles.length === 0) {
      setAllowed(true);
    }

    if (user && roles.length > 0) {
      if (checkPrivileges(roles, user?.roles)) {
        setAllowed(true);
      }
    }
  }, [user, isLoading, isIdle]);

  if (isLoading || isIdle) {
    return <LoadingElement />;
  }

  return user && allowed ? { ...children } : failed;
};
