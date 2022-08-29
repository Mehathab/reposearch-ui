import { AuthProtected } from '@reposearch/auth-ui';
import { Route, Routes } from 'react-router-dom';
import Layout from '../../components/Layout/Layout';

/* eslint-disable-next-line */
export interface ProtectedRouterProps {}

export function ProtectedRouter(props: ProtectedRouterProps) {
  return (
    <AuthProtected>
      <Routes>
        <Route path="/" element={<Layout />} />
      </Routes>
    </AuthProtected>
  );
}

export default ProtectedRouter;
