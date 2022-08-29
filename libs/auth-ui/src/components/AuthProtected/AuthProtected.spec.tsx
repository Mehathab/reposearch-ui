import { render } from '@testing-library/react';

import AuthProtected from './AuthProtected';

describe('AuthProtected', () => {
  it('should render successfully', () => {
    const { baseElement } = render(
      <AuthProtected logo="">
        <div>Test</div>
      </AuthProtected>
    );
    expect(baseElement).toBeTruthy();
  });
});
