import { render } from '@testing-library/react';

import RepoSearch from './RepoSearch';

describe('RepoSearch', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<RepoSearch />);
    expect(baseElement).toBeTruthy();
  });
});
