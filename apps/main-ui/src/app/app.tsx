import { Container } from '@chakra-ui/react';
import { AuthProtected, AuthProvider, Login } from '@reposearch/auth-ui';
import { ReposerverProvider } from '@reposearch/repo-search-ui';
import { Route, Routes } from 'react-router-dom';
import Header from '../components/Header/Header';
import Layout from '../components/Layout/Layout';
import Logo from '../components/Logo/Logo';
import ProtectedRouter from '../routers/ProtectedRouter/ProtectedRouter';

export function App() {
  return (
    <AuthProvider loginPath="/">
      <ReposerverProvider>
        <Container maxW="container.lg">
          <Header />
          <Routes>
            <Route path="/" element={<Login logo={<Logo />} />} />
            <Route path="login" element={<Login logo={<Logo />} />} />
            <Route path="protected/*" element={<ProtectedRouter />} />
          </Routes>
        </Container>
      </ReposerverProvider>
    </AuthProvider>
  );
}

export default App;
