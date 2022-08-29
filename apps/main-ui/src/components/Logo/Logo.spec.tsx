import { render } from '@testing-library/react';
import logo from '../../content/logo';

import Logo from './Logo';

describe('Logo', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Logo />);
    expect(baseElement).toBeTruthy();
  });
  describe('should reder its subcomponents', () => {
    it('should render logoName', () => {
      const { getByTestId } = render(<Logo />);
      const logoNameComp = getByTestId('logoName');
      expect(logoNameComp).toBeTruthy();
      expect(logoNameComp.textContent).toBe(logo.name);
    });
    it('should render logoImage', () => {
      const { getByTestId } = render(<Logo />);
      expect(getByTestId('logoImage')).toBeTruthy();
    });
  });
});
