import { render } from '@testing-library/react';

import RepoList from './RepoList';

describe('RepoList', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<RepoList />);
    expect(baseElement).toBeTruthy();
  });
});
