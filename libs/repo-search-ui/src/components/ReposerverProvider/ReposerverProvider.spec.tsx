import { render } from '@testing-library/react';

import ReposerverProvider from './ReposerverProvider';

describe('ReposerverProvider', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<ReposerverProvider />);
    expect(baseElement).toBeTruthy();
  });
});
