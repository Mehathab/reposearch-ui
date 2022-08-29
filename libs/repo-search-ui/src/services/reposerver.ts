import { TOKEN_STORAGE_KEY } from '@reposearch/auth-ui';
import axios, { AxiosInstance } from 'axios';

enum UrlMap {
  repo = '/repo',
  health = '/health',
}

export interface ReposerverRepo {
  id: string;
  fullName: string;
  createdAt: string;
  stargazersCount: number;
  language: string;
  url: string;
}

class RepoServerService {
  private _http: AxiosInstance;
  constructor(private _baseUrl = 'http://localhost:8080') {
    this._http = axios.create({
      baseURL: _baseUrl,
    });
  }

  async postRepo(repo: ReposerverRepo) {
    const response = await this._http.post(
      UrlMap.repo,
      {
        ...repo,
      },
      {
        headers: {
          Authorization: `Bearer ${window.sessionStorage.getItem(
            TOKEN_STORAGE_KEY
          )}`,
        },
      }
    );
    return response.data;
  }
  async getRepos() {
    const response = await this._http.get(UrlMap.repo, {
      headers: {
        Authorization: `Bearer ${window.sessionStorage.getItem(
          TOKEN_STORAGE_KEY
        )}`,
      },
    });
    return response.data;
  }
  async deleteRepo(id: string) {
    const response = await this._http.delete(`${UrlMap.repo}/${id}`, {
      headers: {
        Authorization: `Bearer ${window.sessionStorage.getItem(
          TOKEN_STORAGE_KEY
        )}`,
      },
    });
    return response.data;
  }
  async helthCheck() {
    // `https://api.github.com/search/repositories?q=${repoSearchKey}&sort=stars&order=desc:`
    const response = await this._http.get(UrlMap.health);
    return response.data;
  }
}
export default new RepoServerService();
