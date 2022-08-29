import {
  useApiReducer,
  useDebounce,
  useSimpleInput,
} from '@reposearch/common-utils-ui';

import { SearchModal } from '@reposearch/ui-components';
import { useEffect } from 'react';
import repo, { GetReposParams } from '../../services/repo';
import RepoSearchItem from '../RepoSearchItem/RepoSearchItem';
import { getAutoCompleteOptions } from './utils';

export interface RepoSearchProps {
  delay?: number;
  maxAutoCompleteOptions?: number;
  defaultValue?: string;
}

const getRepos = (param: GetReposParams) => repo.getRepos(param);
const DEFAULT_DELAY = 1_000;

export function RepoSearch({
  defaultValue = '',
  delay = DEFAULT_DELAY,
  maxAutoCompleteOptions,
}: RepoSearchProps) {
  const [repoState, dispatchGetRepos, resetRepoState] = useApiReducer(getRepos);
  const {
    bind: searchInputBind,
    value: searchInput,
    clear,
  } = useSimpleInput('');
  const debouncedSearchInput = useDebounce(searchInput, 1000);
  useEffect(() => {
    if (debouncedSearchInput)
      dispatchGetRepos({
        q: debouncedSearchInput,
        sort: '',
        order: 'desc',
      });
    else resetRepoState();
  }, [debouncedSearchInput, dispatchGetRepos, resetRepoState]);

  const { isPending, isSuccess, isError, data } = repoState;

  const autoSelectOptions =
    getAutoCompleteOptions(data?.items, maxAutoCompleteOptions) || [];
  return (
    <SearchModal
      {...searchInputBind}
      placeholder="Search github repositories"
      onClose={clear}
      isPending={isPending}
      isSuccess={isSuccess}
      isError={isError}
    >
      {!!autoSelectOptions.length &&
        autoSelectOptions?.map?.((eachOption) => (
          <RepoSearchItem key={eachOption.id} row={eachOption} />
        ))}
    </SearchModal>
  );
}

export default RepoSearch;
