import {
  AspectRatio,
  Stack,
  Image,
  Text,
  Center,
} from '@reposearch/ui-components';
import RepoLogo from '../../assets/images/reposearch.png';
import logoContent from '../../../../../apps/main-ui/src/content/logo';

export function Logo() {
  return (
    <Stack spacing={1} my="3" w="32" h="16">
      <AspectRatio w="32" p="0" ratio={4 / 1}>
        <Image
          p="0"
          src={RepoLogo}
          alt="reposearch_logo"
          data-testid="logoImage"
        />
      </AspectRatio>
      <Center>
        <Text
          data-testid="logoName"
          fontSize="2xl"
          lineHeight={1}
          fontWeight="thin"
        >
          {logoContent.name}
        </Text>
      </Center>
    </Stack>
  );
}

export default Logo;
