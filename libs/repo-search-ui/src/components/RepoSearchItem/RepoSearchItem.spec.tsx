import { render } from '@testing-library/react';

import RepoSearchItem from './RepoSearchItem';

describe('RepoSearchItem', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<RepoSearchItem row={{}} />);
    expect(baseElement).toBeTruthy();
  });
});
