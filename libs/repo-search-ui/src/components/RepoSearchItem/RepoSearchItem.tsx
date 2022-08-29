import { useApiReducer } from '@reposearch/common-utils-ui';
import {
  Badge,
  Box,
  Flex,
  HStack,
  Icons,
  Text,
  useToast,
  Wrap,
  WrapItem,
} from '@reposearch/ui-components';
import { useContext, useEffect } from 'react';
import reposerverService from '../../services/reposerver';
import { RepoItem } from '../RepoSearch/utils';
import { ReposerverContext } from '../ReposerverProvider/ReposerverProvider';
import { tranformRepoObj } from './utils';

export interface RepoSearchItemProps {
  row: RepoItem;
  onSelect: () => void;
}
const NO_DESCRIPTION_TEXT = 'No description available';

export function RepoSearchItem({ row, onSelect }: RepoSearchItemProps) {
  const {
    repoMap,
    maxRepoAdd = 0,
    currentRepoLength = 0,
  } = useContext(ReposerverContext) || {};
  const toast = useToast();

  const { full_name, language, stargazers_count, description } = row;

  const [{ isSuccess, isError, data }, dispatchPostRepo] = useApiReducer(() => {
    const maxRepoErrorMsg = `Max reposistories (${maxRepoAdd}) added. Please remove a few before adding new ones.`;
    if (currentRepoLength >= maxRepoAdd) {
      toast({
        title: row.full_name,
        description: maxRepoErrorMsg,
        status: 'warning',
        duration: 5_000,
        isClosable: true,
      });
      return new (Promise as any).reject(maxRepoErrorMsg);
    }
    return reposerverService.postRepo(tranformRepoObj(row));
  });
  useEffect(() => {
    if (isError || isSuccess) {
      console.log(data);

      toast({
        title: `Repo ${row.full_name}`,
        description: isSuccess
          ? `Succesufully added ${data?.fullName} `
          : 'Error occured! Please try again.',
        status: isSuccess ? 'success' : 'error',
        duration: 9000,
        isClosable: true,
      });
    }
  }, [data, data?.fullName, isError, isSuccess, row.full_name, toast]);

  const isAdded = !!repoMap?.[row.id] || isSuccess;
  const handleSelect = () => {
    if (!isSuccess) dispatchPostRepo();
    if (onSelect) onSelect();
  };

  return (
    <Box
      p={2}
      w="full"
      onClick={handleSelect}
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
          {isSuccess && <Badge colorScheme="purple">New</Badge>}
          {isAdded && <Badge colorScheme="green">Added</Badge>}
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
