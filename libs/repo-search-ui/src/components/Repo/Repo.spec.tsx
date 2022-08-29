import { render } from '@testing-library/react';

import Repo from './Repo';

describe('Repo', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Repo />);
    expect(baseElement).toBeTruthy();
  });
});
