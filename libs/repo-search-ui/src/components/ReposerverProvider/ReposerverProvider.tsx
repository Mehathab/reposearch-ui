import { useApiReducer } from '@reposearch/common-utils-ui';
import { createContext, ReactNode } from 'react';
import reposerver, { ReposerverRepo } from '../../services/reposerver';
import { RepoServerRepo } from '../RepoList/utils';

/* eslint-disable-next-line */
export interface ReposerverProviderProps {
  children: ReactNode;
  maxRepoAdd?: number;
}
export interface ReposerverProviderValues {
  repos: ReposerverRepo[];
  getRepos: () => void;
  repoMap?: { [k: string]: RepoServerRepo };
  maxRepoAdd: number;
  currentRepoLength: number;
}

export const ReposerverContext = createContext<null | ReposerverProviderValues>(
  null
);
export function ReposerverProvider({
  children,
  maxRepoAdd = 10,
}: ReposerverProviderProps) {
  const [{ data }, getRepos] = useApiReducer(() => reposerver.getRepos());

  const repos = data?.repos || [];
  const repoMap = repos.reduce(
    (
      reducedRepoMap: { [k: string]: RepoServerRepo },
      aRepo: ReposerverRepo
    ) => {
      console.log({ ...reducedRepoMap, [aRepo.id]: aRepo });

      return { ...reducedRepoMap, [aRepo.id]: aRepo };
    },
    {}
  );

  const values: ReposerverProviderValues = {
    repos,
    getRepos,
    repoMap,
    maxRepoAdd,
    currentRepoLength: repos?.length || 0,
  };

  return (
    <ReposerverContext.Provider value={values}>
      {children}
    </ReposerverContext.Provider>
  );
}

export default ReposerverProvider;
