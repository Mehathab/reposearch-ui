import { ChevronDownIcon } from '@chakra-ui/icons';
import { useApiReducer } from '@reposearch/common-utils-ui';
import {
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  Text,
  Menu,
  Button,
  MenuButton,
  MenuItem,
  MenuList,
} from '@reposearch/ui-components';
import { useEffect, useState } from 'react';
import reposerver from '../../services/reposerver';
import RepoData from './RepoData';
import {
  headers,
  headersMap,
  RepoServerRepo,
  sortByFunctionsMap,
} from './utils';

/* eslint-disable-next-line */
export interface RepoListProps {}

export function RepoList(props: RepoListProps) {
  const [state, dispatchGetRepos] = useApiReducer(() => reposerver.getRepos());
  useEffect(() => {
    dispatchGetRepos();
  }, []);

  const { repos = [] } = state.data || {};
  const [menuType, setMenuType] = useState<
    keyof typeof sortByFunctionsMap | ''
  >('');
  const sortedRepos = menuType
    ? repos?.sort(sortByFunctionsMap[menuType])
    : repos;
  const handleMenuItemSelect =
    (key: keyof typeof sortByFunctionsMap | '') => () =>
      setMenuType(key);
  return (
    <>
      <Menu>
        <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
          Sort by
        </MenuButton>
        <MenuList>
          <MenuItem onClick={handleMenuItemSelect('stargazersCountAscending')}>
            Star gazers ascending{' '}
          </MenuItem>
          <MenuItem onClick={handleMenuItemSelect('stargazersCountDescending')}>
            Star gazers descending{' '}
          </MenuItem>
          <MenuItem onClick={handleMenuItemSelect('createdAtAscending')}>
            Created ascending{' '}
          </MenuItem>
          <MenuItem onClick={handleMenuItemSelect('createdAtDescending')}>
            Created descending{' '}
          </MenuItem>
          <MenuItem onClick={handleMenuItemSelect('')}>None </MenuItem>
        </MenuList>
      </Menu>
      <TableContainer>
        <Table>
          <Thead>
            <Tr>
              {headers?.map((eachHeader) => (
                <Th key={eachHeader}>{headersMap[eachHeader]}</Th>
              ))}
            </Tr>
          </Thead>
          <Tbody>
            {sortedRepos?.map((eachRepo: RepoServerRepo) => (
              <Tr>
                {headers.map((accessor) => (
                  <Td fontWeight="normal" key={accessor}>
                    <RepoData
                      data={eachRepo}
                      accessor={accessor}
                      callback={dispatchGetRepos}
                    />
                  </Td>
                ))}
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
      {!sortedRepos.length && !state.isError && (
        <Text fontWeight={'normal'} m="5">
          Your saved reepositories list is empty{' '}
        </Text>
      )}
    </>
  );
}

export default RepoList;
