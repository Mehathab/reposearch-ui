import { RepoList, RepoSearch } from '@reposearch/repo-search-ui';
import { Grid, GridItem } from '@reposearch/ui-components';
/* eslint-disable-next-line */
export interface LayoutProps {}

export function Layout(props: LayoutProps) {
  return (
    <Grid
      templateAreas={`". search ."
      "table table table"`}
      gridTemplateRows={'2fr 5fr'}
      gridTemplateColumns={'150px 1fr 150px'}
      h="200px"
      gap="2"
      color="blackAlpha.700"
      fontWeight="bold"
      mt="1"
    >
      <GridItem pl="2" area={'table'}>
        <RepoList />
      </GridItem>
      <GridItem p="2" area={'search'}>
        <RepoSearch />
      </GridItem>
    </Grid>
  );
}

export default Layout;
