import axios, { AxiosInstance } from 'axios';

enum UrlMap {
  getRepos = '/search/repositories',
}

export interface GetReposParams {
  q: string;
  sort: string;
  order: 'desc' | 'asc';
}

class RepoService {
  private _http: AxiosInstance;
  constructor(private _baseUrl = 'https://api.github.com') {
    this._http = axios.create({
      baseURL: _baseUrl,
    });
  }

  async getRepos(params: GetReposParams) {
    // `https://api.github.com/search/repositories?q=${repoSearchKey}&sort=stars&order=desc:`
    const response = await this._http.get(UrlMap.getRepos, {
      params,
    });
    return response.data;
  }
}
export default new RepoService();
