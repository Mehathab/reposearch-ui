import { ReactNode, useEffect } from 'react';

import useAuthContext from '../../hooks/useAuthContext/useAuthContext';

/* eslint-disable-next-line */
export interface AuthProtectedProps {
  children: ReactNode;
}

export function AuthProtected({ children }: AuthProtectedProps) {
  const { isAuthenticated, login } = useAuthContext();

  useEffect(() => {
    if (!isAuthenticated) login();
  }, [isAuthenticated, login]);

  // eslint-disable-next-line react/jsx-no-useless-fragment
  return <>{children}</>;
}

export default AuthProtected;
