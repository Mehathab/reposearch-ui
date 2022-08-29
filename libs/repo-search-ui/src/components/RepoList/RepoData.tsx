import {
  DEFAULT_DATE_FORMAT,
  DEFAULT_DATE_TIME_FORMAT,
  DEFAULT_TIME_FORMAT,
  formatIsoDate,
  useApiReducer,
} from '@reposearch/common-utils-ui';
import {
  Link,
  Icons,
  Text,
  Button,
  SearchModalStateIcon,
} from '@reposearch/ui-components';
import { ReactNode } from 'react';
import reposerver, { ReposerverRepo } from '../../services/reposerver';
import { Accessors } from './utils';

/* eslint-disable-next-line */
export interface RepoDataProps {
  accessor: Accessors;
  data: ReposerverRepo;
  callback: () => void;
}
export function RepoData({ data, accessor, callback }: RepoDataProps) {
  const [state, dispatchDeleteRepo] = useApiReducer(() =>
    reposerver.deleteRepo(data?.id)
  );
  if (accessor === 'actions') {
    return (
      <Button onClick={dispatchDeleteRepo} disabled={state.isSuccess}>
        <SearchModalStateIcon {...state}>
          <Icons.DeleteIcon color="red.400" />
        </SearchModalStateIcon>
      </Button>
    );
  }
  const accessorValue = data[accessor];
  switch (accessor) {
    case 'id':
      return (
        <Link isExternal href={`${data['url']}`}>
          {accessorValue} <Icons.ExternalLinkIcon />
        </Link>
      );
    case 'fullName':
      return (
        <Text width="2xs" overflow="clip">
          {accessorValue}
        </Text>
      );
    case 'createdAt':
      return (
        <>
          <Text>{formatIsoDate(`${accessorValue}`, DEFAULT_DATE_FORMAT)}</Text>
          <Text>{formatIsoDate(`${accessorValue}`, DEFAULT_TIME_FORMAT)}</Text>
        </>
      );

    default:
      return <Text>{accessorValue}</Text>;
  }
}

export default RepoData;
