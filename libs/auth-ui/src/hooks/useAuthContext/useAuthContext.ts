import { useContext } from 'react';
import { AuthContext } from '../../components/AuthProvider/AuthProvider';

export function useAuthContext() {
  return useContext(AuthContext);
}

export default useAuthContext;
