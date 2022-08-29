import { render } from '@testing-library/react';

import AuthProvider from './AuthProvider';

describe('AuthProvider', () => {
  it('should render successfully', () => {
    const { baseElement } = render(
      <AuthProvider>
        <div>Test</div>
      </AuthProvider>
    );
    expect(baseElement).toBeTruthy();
  });
});
