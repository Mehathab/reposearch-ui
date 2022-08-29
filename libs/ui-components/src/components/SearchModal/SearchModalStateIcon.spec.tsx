import { render } from '@testing-library/react';

import SearchModalStateIcon from './SearchModalStateIcon';

describe('SearchModalStateIcon', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<SearchModalStateIcon />);
    expect(baseElement).toBeTruthy();
  });
});
