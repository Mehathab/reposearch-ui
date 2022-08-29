import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  DEFAULT_LOGIN_PATH,
  TOKEN_STORAGE_KEY,
} from '../../components/Login/constants';
export interface UseAuth {
  isAuthenticated: boolean;
  postLogin: (session: string) => void;
  logout: () => void;
  createPostAuthRedirectUrl: () => string;
  login: () => void;
  loginPath: string;
}
export function useAuth(loginPath = DEFAULT_LOGIN_PATH): UseAuth {
  const [isAuthenticated, setIsAuthenticated] = useState(
    !!window.sessionStorage.getItem(TOKEN_STORAGE_KEY)
  );

  useEffect(() => {
    setIsAuthenticated(!!window.sessionStorage.getItem(TOKEN_STORAGE_KEY));
  }, []);
  const { pathname, search, hash } = useLocation();
  const navigate = useNavigate();
  const createPostAuthRedirectUrl = () => `${pathname || '/'}${search}${hash}`;

  const login = () => {
    navigate(loginPath, { state: createPostAuthRedirectUrl() });
  };
  const logout = () => {
    window.sessionStorage.removeItem(TOKEN_STORAGE_KEY);
    setIsAuthenticated(false);
  };

  const postLogin = (session: string) => {
    window.sessionStorage.setItem(TOKEN_STORAGE_KEY, session);
    setIsAuthenticated(true);
  };

  return {
    isAuthenticated,
    postLogin,
    logout,
    createPostAuthRedirectUrl,
    login,
    loginPath,
  };
}

export default useAuth;
