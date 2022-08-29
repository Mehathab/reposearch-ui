import axios, { AxiosInstance } from 'axios';
import { TOKEN_STORAGE_KEY } from '../components/Login/constants';

enum UrlMap {
  session = '/session',
}

export interface Session {
  session: string;
}
export interface LoginParams {
  username: string;
  password: string;
}
export class AuthService {
  private _http: AxiosInstance;
  constructor(private _baseUrl = 'http://localhost:8080') {
    this._http = axios.create({
      baseURL: _baseUrl,
    });
  }

  login({ username, password }: LoginParams) {
    return this._http.post(UrlMap.session, {
      username,
      password,
    });
  }
}
export default new AuthService();
