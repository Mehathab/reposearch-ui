import {
  useApiReducer,
  UseSimpleInput,
  useSimpleInput,
  ApiReducerState,
  Yup,
} from '@reposearch/common-utils-ui';
import useAuthContext from 'libs/auth-ui/src/hooks/useAuthContext/useAuthContext';
import auth from '../../../services/auth';
import { TOKEN_STORAGE_KEY } from '../constants';

export interface UseLogin {
  usernameBind: UseSimpleInput['bind'];
  passwordBind: UseSimpleInput['bind'];
  username: UseSimpleInput['value'];
  password: UseSimpleInput['value'];
  handleLogin: () => void;
  onLogin: () => void;
  loginState: ApiReducerState;
}
const defaultSchema = Yup.object().shape({
  username: Yup.string().required('Username is required'),
  password: Yup.string().required('Password is required'),
});

export function useLogin(validationSchema = defaultSchema): UseLogin {
  const { bind: usernameBind, value: username } = useSimpleInput('');
  const { bind: passwordBind, value: password } = useSimpleInput('');
  const { postLogin } = useAuthContext();

  const onLogin = () =>
    new Promise((resolve, reject) => {
      validationSchema
        .validate({ username, password })
        .then((validParams) => auth.login(validParams))
        .then((response) => {
          const { data } = response || {};
          const sessionToken = data?.token;
          postLogin(sessionToken);
          return resolve(sessionToken);
        })
        .catch((error) => reject(error));
    });

  const [loginState, handleLogin] = useApiReducer(() => onLogin());

  return {
    usernameBind,
    passwordBind,
    handleLogin,
    username,
    password,
    onLogin,
    loginState,
  };
}

export default useLogin;
