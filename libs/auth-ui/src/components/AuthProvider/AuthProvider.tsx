import { createContext, ReactNode } from 'react';
import useAuth, { UseAuth } from '../../hooks/useAuth/useAuth';
import { DEFAULT_LOGIN_PATH } from '../Login/constants';

export const AuthContext = createContext({} as UseAuth);
export function AuthProvider({
  children,
  loginPath = DEFAULT_LOGIN_PATH,
}: {
  children: ReactNode;
  loginPath?: string;
}) {
  const auth = useAuth(loginPath);
  const contextValue = { ...auth, loginPath };
  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
}

export default AuthProvider;
