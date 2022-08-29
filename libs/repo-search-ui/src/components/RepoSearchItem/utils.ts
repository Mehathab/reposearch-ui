import { ReposerverRepo } from '../../services/reposerver';
import { RepoItem } from '../RepoSearch/utils';

export const tranformRepoObj = ({
  full_name,
  id,
  stargazers_count,
  created_at,
  url,
  language,
}: RepoItem): ReposerverRepo => ({
  fullName: full_name,
  id: `${id}`,
  stargazersCount: Number(stargazers_count),
  createdAt: created_at,
  url,
  language,
});
