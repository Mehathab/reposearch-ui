import { DateTime } from 'luxon';
export interface RepoServerRepo {
  id: string;
  fullName: string;
  createdAt: string;
  stargazersCount: number;
  language: string;
  url: string;
  actions: string;
}
export type Accessors = keyof RepoServerRepo;
export const headersMap = {
  id: 'Id',
  fullName: 'Project name',
  createdAt: 'Created',
  stargazersCount: 'Stargazers #',
  language: 'Language',
  url: 'Link',
  actions: '',
};
export const headers: Accessors[] = [
  'id',
  'fullName',
  'createdAt',
  'stargazersCount',
  'language',
  'actions',
];

export const sortReposByDateTime =
  (order: 'ascending' | 'descending') =>
  (a: RepoServerRepo, b: RepoServerRepo) => {
    const dtA = DateTime.fromISO(a.createdAt);
    const dtB = DateTime.fromISO(b.createdAt);

    if (order === 'ascending') return dtA.toMillis() - dtB.toMillis();
    if (order === 'descending') return dtB.toMillis() - dtA.toMillis();
    return 0;
  };

export const sortReposByViews =
  (order: 'ascending' | 'descending') =>
  (a: RepoServerRepo, b: RepoServerRepo) => {
    if (order === 'ascending')
      return Number(a.stargazersCount || 0) - Number(b.stargazersCount || 0);
    if (order === 'descending')
      return Number(b.stargazersCount || 0) - Number(a.stargazersCount || 0);
    return 0;
  };

export const sortByFunctionsMap = {
  createdAtAscending: sortReposByDateTime('ascending'),
  stargazersCountAscending: sortReposByViews('ascending'),
  createdAtDescending: sortReposByDateTime('descending'),
  stargazersCountDescending: sortReposByViews('descending'),
};
