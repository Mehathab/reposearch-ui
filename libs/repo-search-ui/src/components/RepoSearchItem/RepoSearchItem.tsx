import { useApiReducer } from '@reposearch/common-utils-ui';
import {
  Badge,
  Box,
  Flex,
  HStack,
  Icons,
  Text,
  Wrap,
  WrapItem,
} from '@reposearch/ui-components';
import { useContext } from 'react';
import reposerverService from '../../services/reposerver';
import { RepoItem } from '../RepoSearch/utils';
import { tranformRepoObj } from './utils';

export interface RepoSearchItemProps {
  row: RepoItem;
}
const NO_DESCRIPTION_TEXT = 'No description available';

export function RepoSearchItem({ row }: RepoSearchItemProps) {
  const { full_name, language, stargazers_count, description } = row;
  const [_, dispatchPostRepo] = useApiReducer(() =>
    reposerverService.postRepo(tranformRepoObj(row))
  );
  return (
    <Box
      p={2}
      w="full"
      // border="1px dotted #ccc"
      onClick={dispatchPostRepo}
      mb="4"
      borderRadius={'lg'}
      cursor="pointer"
      backgroundColor="gray.100"
      _hover={{ backgroundColor: 'teal.400', color: 'white' }}
    >
      <Wrap>
        <WrapItem>
          <Text as="h4" mb={1} fontSize="small">
            {full_name}
          </Text>
        </WrapItem>
        <WrapItem>
          {/* {isAlreadyAdded && <Badge colorScheme="green">Added</Badge>} */}
        </WrapItem>
      </Wrap>
      <Flex mb="1">
        {!!language && (
          <Badge
            variant="solid"
            colorScheme="teal"
            display="flex"
            mr="2"
            fontSize="x-small"
            fontWeight="bold"
          >
            {language}
          </Badge>
        )}
        <Badge
          variant="solid"
          colorScheme="yellow"
          display="flex"
          alignItems="baseline"
          fontSize="x-small"
        >
          <Icons.StarIcon mr="0.1rem" boxSize=".5rem" />
          {stargazers_count}
        </Badge>
      </Flex>

      <Text fontSize="small" fontWeight="light">
        {description || NO_DESCRIPTION_TEXT}
      </Text>
    </Box>
  );
}

export default RepoSearchItem;
