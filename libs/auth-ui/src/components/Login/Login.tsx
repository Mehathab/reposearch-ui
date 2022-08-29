import {
  Box,
  Button,
  Container,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  HStack,
  Input,
  Stack,
  useBreakpointValue,
  useColorModeValue,
  useBoolean,
  Text,
  Center,
} from '@reposearch/ui-components';
import { ReactNode, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { PasswordField } from './PasswordField';
import useLogin from './useLogin/useLogin';

export { TOKEN_STORAGE_KEY } from './constants';
export interface LoginProps {
  logo: ReactNode;
}

export function Login({ logo }: LoginProps) {
  const { state: redirectUrl } = useLocation();
  const navigate = useNavigate();
  const { passwordBind, usernameBind, handleLogin, loginState } = useLogin();
  const [showPasswordHint, { toggle: togglePasswordHint }] = useBoolean(false);
  useEffect(() => {
    if (loginState.isSuccess) navigate((redirectUrl as string) || '/protected');
  }, [loginState.isSuccess, navigate, redirectUrl]);

  return (
    <Container
      maxW="lg"
      py={{ base: '12', md: '24' }}
      px={{ base: '0', sm: '8' }}
    >
      <Stack spacing="10">
        <Stack spacing="6">
          {/* <Center>{logo}</Center> */}
          <Stack spacing={{ base: '2', md: '3' }} textAlign="center">
            <Heading size={useBreakpointValue({ base: 'xs', md: 'sm' })}>
              Log in to your account
            </Heading>
            <HStack spacing="1" justify="center"></HStack>
          </Stack>
        </Stack>
        <Box
          py={{ base: '0', sm: '8' }}
          px={{ base: '4', sm: '10' }}
          bg={useBreakpointValue({ base: 'transparent', sm: 'bg-surface' })}
          boxShadow={{ base: 'none', sm: useColorModeValue('md', 'md-dark') }}
          borderRadius={{ base: 'none', sm: 'xl' }}
        >
          <Stack spacing="6">
            <Stack spacing="5">
              <FormControl isInvalid={loginState.isError}>
                <FormErrorMessage>{loginState.error?.message}</FormErrorMessage>
                <FormLabel htmlFor="username">Username</FormLabel>
                <Input
                  id="username"
                  {...usernameBind}
                  isInvalid={loginState.error?.path === 'username'}
                />
                <PasswordField
                  isInvalid={loginState.error?.path === 'password'}
                  id="password"
                  {...passwordBind}
                />
              </FormControl>
            </Stack>
            <HStack justify="flex-end">
              {/* <Checkbox defaultChecked>Remember me</Checkbox> */}
              <Button
                variant="link"
                colorScheme="blue"
                size="sm"
                onClick={togglePasswordHint}
              >
                Forgot password?
              </Button>
            </HStack>
            {showPasswordHint && (
              <Text fontSize="x-small">{`Hint: pLnfgDsc2WD8`}</Text>
            )}
            <Stack spacing="6">
              <Button variant="primary" onClick={handleLogin}>
                Sign in
              </Button>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Container>
  );
}

export default Login;
