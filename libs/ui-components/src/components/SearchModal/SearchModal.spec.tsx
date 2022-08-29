import { render } from '@testing-library/react';

import SearchModal from './SearchModal';

describe('SearchModal', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<SearchModal />);
    expect(baseElement).toBeTruthy();
  });
});
