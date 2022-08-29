import { render } from '@testing-library/react';

import ProtectedRouter from './ProtectedRouter';

describe('ProtectedRouter', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<ProtectedRouter />);
    expect(baseElement).toBeTruthy();
  });
});
