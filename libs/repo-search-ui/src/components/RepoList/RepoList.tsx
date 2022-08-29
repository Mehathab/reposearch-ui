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
  TableCaption,
} from '@reposearch/ui-components';
import { useContext, useEffect, useState } from 'react';
import reposerver from '../../services/reposerver';
import ReposerverProvider, {
  ReposerverContext,
} from '../ReposerverProvider/ReposerverProvider';
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
  const { getRepos, repos } = useContext(ReposerverContext) || {};
  useEffect(() => {
    if (getRepos) getRepos();
  }, []);

  const [menuType, setMenuType] = useState<
    keyof typeof sortByFunctionsMap | ''
  >('');

  const sortedRepos = menuType
    ? repos?.sort?.(sortByFunctionsMap[menuType])
    : repos;
  const handleMenuItemSelect =
    (key: keyof typeof sortByFunctionsMap | '') => () =>
      setMenuType(key);
  return (
    <>
      <Menu variant="">
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
          <TableCaption>
            {`Repositories added: ${sortedRepos?.length}`}
          </TableCaption>

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
                      callback={getRepos}
                    />
                  </Td>
                ))}
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
      {!sortedRepos?.length && (
        <Text fontWeight={'normal'} m="5">
          Your saved reepositories list is empty{' '}
        </Text>
      )}
    </>
  );
}

export default RepoList;
