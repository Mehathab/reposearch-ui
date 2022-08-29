import { useAuthContext } from '@reposearch/auth-ui';
import { Button, Flex, HStack } from '@reposearch/ui-components';
import { useLocation, useNavigate } from 'react-router-dom';
import Logo from '../Logo/Logo';

/* eslint-disable-next-line */
export interface HeaderProps {}

export function Header(props: HeaderProps) {
  const {
    isAuthenticated,
    logout,
    login,
    loginPath,
    createPostAuthRedirectUrl,
  } = useAuthContext();
  const showButtons = loginPath !== createPostAuthRedirectUrl();
  return (
    <Flex justifyContent="space-between" mt="8">
      <Logo />
      <HStack>
        {showButtons && (
          <Button
            size="sm"
            variant={isAuthenticated ? 'outline' : 'primary'}
            onClick={isAuthenticated ? logout : login}
          >
            {isAuthenticated ? 'Logout' : 'Login'}
          </Button>
        )}
      </HStack>
    </Flex>
  );
}

export default Header;
