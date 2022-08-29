import {
  useApiReducer,
  useDebounce,
  useSimpleInput,
} from '@reposearch/common-utils-ui';

import { SearchModal, useBoolean } from '@reposearch/ui-components';
import { useContext, useEffect } from 'react';
import repo, { GetReposParams } from '../../services/repo';
import RepoSearchItem from '../RepoSearchItem/RepoSearchItem';
import { ReposerverContext } from '../ReposerverProvider/ReposerverProvider';
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
  const { getRepos: getReposerverRepos } = useContext(ReposerverContext) || {};
  const [repoState, dispatchGetRepos, resetRepoState] = useApiReducer(getRepos);
  const [showModal, setShowModal] = useBoolean(false);
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

  const handleOnClose = () => {
    clear();
    setShowModal.off();
    if (getReposerverRepos) getReposerverRepos();
  };

  const autoSelectOptions =
    getAutoCompleteOptions(data?.items, maxAutoCompleteOptions) || [];
  return (
    <SearchModal
      {...searchInputBind}
      placeholder="Search github repositories"
      onClose={handleOnClose}
      isPending={isPending}
      isSuccess={isSuccess}
      isError={isError}
      isShow={showModal}
      setShowModal={setShowModal}
    >
      {!!autoSelectOptions.length &&
        autoSelectOptions?.map?.((eachOption) => (
          <RepoSearchItem
            key={eachOption.id}
            row={eachOption}
            onSelect={handleOnClose}
          />
        ))}
    </SearchModal>
  );
}

export default RepoSearch;
